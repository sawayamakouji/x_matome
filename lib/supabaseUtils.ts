import { supabase } from "./supabase";

export async function getTweets(tag?: string, searchQuery?: string) {
  let query = supabase
    .from("tweets")
    .select("*")
    .order("created_at", { ascending: false });

  if (tag) {
    query = query.ilike("tag", `%${tag}%`);
  }

  let { data: tweets, error } = await query;

  if (error) {
    console.error(error);
    return [];
  }

  // null チェックを追加
  if (!tweets) {
      return [];
  }

  if (searchQuery) {
    tweets = tweets.filter(
      (tweet) =>
        tweet.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tweet.tag &&
          tweet.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  return tweets;
}

export async function addTweet(url: string, tags: string[]) {
  const uniqueTags = [...new Set(tags)].join(",");
  const { data, error } = await supabase
    .from("tweets")
    .insert([{ url: url, tag: uniqueTags }]);

  if (error) {
    console.error(error);
    throw new Error("Failed to add tweet");
  }

  return data;
}

export async function deleteTweet(id: string) {
  const { error } = await supabase.from("tweets").delete().match({ id: id });

  if (error) {
    console.error(error);
    throw new Error("Failed to delete tweet");
  }
}

export async function updateTweetTag(id: string, tag: string) {
    const { data, error } = await supabase
      .from("tweets")
      .update({ tag: tag })
      .match({ id: id });
  
    if (error) {
      console.error(error);
      throw new Error("Failed to update tweet tag");
    }
  
    return data;
  }

export async function getTags() {
  const { data: tweets, error } = await supabase.from("tweets").select("tag");

  if (error) {
    console.error(error);
    return [];
  }

  const tags = new Set<string>();
  tweets?.forEach((tweet) => { // Optional chaining を使用
    if (tweet.tag) {
      tweet.tag.split(",").forEach((t: string) => tags.add(t.trim()));
    }
  });

  return Array.from(tags);
}
"use client";

import { useState, useEffect, useCallback } from "react";
import { getTweets } from "../../lib/supabaseUtils";
import Tweet from "./Tweet";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";

export default function TweetList({ initialTags }: { initialTags: string[] }) {
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadTweets = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedTweets = await getTweets(selectedTag, searchQuery);
      setTweets(fetchedTweets);
    } finally {
      setLoading(false);
    }
  }, [selectedTag, searchQuery]);

  useEffect(() => {
    loadTweets();
  }, [loadTweets]);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">ツイート検索・フィルタリング</h3>
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">すべてのタグ</option>
        {initialTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="検索 (URL・タグ)"
        className="w-full p-2 mb-4 border rounded"
      />
      <h3 className="text-xl font-bold mb-4">ツイート一覧</h3>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {tweets.map((tweet: any) => (
            <Tweet key={tweet.id} tweet={tweet} onDelete={loadTweets} tags={initialTags} />
          ))}
        </div>
      )}
    </div>
  );
}
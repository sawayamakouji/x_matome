import TweetForm from "./components/TweetForm"
import TweetList from "./components/TweetList"
import { getTags } from "../lib/supabaseUtils"

export default async function Home() {
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const tags = await getTags()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ツイート埋め込み＆管理</h1>
      <TweetForm tags={tags} />
      <TweetList initialTags={tags} />
    </div>
  )
}


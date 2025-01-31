"use client"

import { useState, useEffect } from "react"
import { getTweets } from "../../lib/supabaseUtils"
import Tweet from "./Tweet"

export default function TweetList({ initialTags }: { initialTags: string[] }) {
  const [tweets, setTweets] = useState([])
  const [selectedTag, setSelectedTag] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const loadTweets = async () => {
    const fetchedTweets = await getTweets(selectedTag, searchQuery)
    setTweets(fetchedTweets)
  }

  useEffect(() => {
    loadTweets()
  }, [selectedTag, searchQuery, loadTweets]) // Added loadTweets to dependencies

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
      <div>
        {tweets.map((tweet: any) => (
          <Tweet key={tweet.id} tweet={tweet} onDelete={loadTweets} />
        ))}
      </div>
    </div>
  )
}


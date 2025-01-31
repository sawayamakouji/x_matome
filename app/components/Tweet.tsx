"use client"

import { useEffect } from "react"
import { deleteTweet } from "../../lib/supabaseUtils"

declare global {
  interface Window {
    twttr: any
  }
}

export default function Tweet({ tweet, onDelete }: { tweet: any; onDelete: () => void }) {
  useEffect(() => {
    // Ensure Twitter widgets are loaded
    if (window.twttr) {
      setTimeout(() => {
        window.twttr.widgets.load()
      }, 0)
    }
  }, [])

  const handleDelete = async () => {
    try {
      await deleteTweet(tweet.id)
      alert("ツイートを削除しました！")
      onDelete()
    } catch (error) {
      alert("削除に失敗しました")
    }
  }

  // Convert x.com URLs to twitter.com for widget compatibility
  const embedUrl = tweet.url.replace("x.com", "twitter.com")

  return (
    <div className="mb-8 border-b pb-4">
      <blockquote className="twitter-tweet">
        <a href={embedUrl}></a>
      </blockquote>
      <p className="mt-2">タグ: {tweet.tag || "なし"}</p>
      <button onClick={handleDelete} className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600">
        削除
      </button>
    </div>
  )
}


"use client"

import { useState } from "react"
import { addTweet } from "../../lib/supabaseUtils"

function isValidTweetUrl(url: string): boolean {
  const tweetUrlPattern = /^https?:\/\/((?:twitter|x)\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/i
  return tweetUrlPattern.test(url)
}

export default function TweetForm({ tags }: { tags: string[] }) {
  const [url, setUrl] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // URLのバリデーション
    if (!isValidTweetUrl(url)) {
      alert("正しいツイートURLを入力してください。\nTwitter/X の投稿URLを入力してください。")
      return
    }

    try {
      // タグの処理を改善
      const tagsToAdd = new Set(selectedTags) // 重複を防ぐためにSetを使用

      // 新規タグがある場合のみ追加
      const trimmedNewTag = newTag.trim()
      if (trimmedNewTag) {
        tagsToAdd.add(trimmedNewTag)
      }

      // SetをArrayに変換して保存
      const uniqueTags = Array.from(tagsToAdd)

      // タグが追加されたことをコンソールで確認
      console.log("保存されるタグ:", uniqueTags)

      await addTweet(url, uniqueTags)
      alert("ツイートを追加しました！")

      // フォームをリセット
      setUrl("")
      setSelectedTags([])
      setNewTag("")

      // ページをリロードしてタグ一覧を更新
      window.location.reload()
    } catch (error) {
      console.error("エラー:", error)
      alert("追加に失敗しました")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="ツイートのURL (twitter.com または x.com)"
        className="w-full p-2 mb-4 border rounded"
      />
      <h3 className="text-xl font-bold mb-2">タグを選択 or 新規作成</h3>
      <select
        multiple
        value={selectedTags}
        onChange={(e) => setSelectedTags(Array.from(e.target.selectedOptions, (option) => option.value))}
        className="w-full p-2 mb-4 border rounded"
      >
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        placeholder="新規タグを入力"
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        追加
      </button>
    </form>
  )
}


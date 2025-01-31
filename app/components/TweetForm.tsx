"use client";

import { useState, useCallback } from "react";
import { addTweet } from "../../lib/supabaseUtils";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Button } from "@/components/ui/button";

function isValidTweetUrl(url: string): boolean {
  const tweetUrlPattern =
    /^https?:\/\/((?:twitter|x)\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/i;
  return tweetUrlPattern.test(url);
}

export default function TweetForm({}: {}) {
  const [url, setUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false); // ローディング状態を追加

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();

      if (!isValidTweetUrl(url)) {
          alert("正しいツイートURLを入力してください。\nTwitter/X の投稿URLを入力してください。");
          return;
      }
      setLoading(true);
      try {
          const tagsToAdd = new Set(selectedTags);
          const trimmedNewTag = newTag.trim();
          if (trimmedNewTag) {
              tagsToAdd.add(trimmedNewTag);
          }
          const uniqueTags = Array.from(tagsToAdd);
          console.log("保存されるタグ:", uniqueTags);
          await addTweet(url, uniqueTags);
          alert("ツイートを追加しました！");

          setUrl("");
          setSelectedTags([]);
          setNewTag("");
            window.location.reload();
      } catch (error) {
          console.error("エラー:", error);
          alert("追加に失敗しました");
      }finally{
          setLoading(false)
      }
    }, [url, selectedTags, newTag]);


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
        onChange={(e) =>
          setSelectedTags(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
        className="w-full p-2 mb-4 border rounded"
      >
       
      </select>
      <Input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        placeholder="新規タグを入力"
        className="w-full p-2 mb-4 border rounded"
      />
        <Button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
            {loading ? <LoadingSpinner size="sm"/> : "追加"}
        </Button>
    </form>
  );
}
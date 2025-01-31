"use client";

import { useEffect, useState } from "react";
import { deleteTweet, updateTweetTag } from "../../lib/supabaseUtils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

declare global {
  interface Window {
    twttr: any;
  }
}

export default function Tweet({ tweet, onDelete, tags }: { tweet: any; onDelete: () => void; tags: string[] }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTag, setEditedTag] = useState(tweet.tag || "");

  useEffect(() => {
    // Ensure Twitter widgets are loaded
    if (window.twttr) {
      setTimeout(() => {
        window.twttr.widgets.load();
      }, 0);
    }
  }, []);

  const handleDelete = async () => {
    try {
      await deleteTweet(tweet.id);
      alert("ツイートを削除しました！");
      onDelete();
    } catch (error) {
      alert("削除に失敗しました");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateTweetTag(tweet.id, editedTag);
      alert("タグを更新しました！");
      setIsEditing(false);
      onDelete(); // データ再取得のためにonDeleteをコール
    } catch (error) {
      alert("タグの更新に失敗しました");
      console.error("タグ更新エラー:", error);
    }
  };

    const handleCancelEdit = () => {
        setIsEditing(false);
         setEditedTag(tweet.tag || "");
      };

    const handleTagChange = (value: string) => {
        setEditedTag(value);
      };

  // Convert x.com URLs to twitter.com for widget compatibility
  const embedUrl = tweet.url.replace("x.com", "twitter.com");

  return (
    <div className="mb-8 border-b pb-4">
      <blockquote className="twitter-tweet">
        <a href={embedUrl}></a>
      </blockquote>
        <div className="mt-2 flex flex-col gap-2">
      {isEditing ? (
            <div className="flex flex-col gap-2">
                <Select
                    value={editedTag}
                    onValueChange={handleTagChange}
                >
                  <SelectTrigger className="w-full">
                    {editedTag || "タグを選択"}
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                           {tag}
                        </SelectItem>
                     ))}
                  </SelectContent>
                  </Select>
               <div className="flex gap-2">
                    <button onClick={handleSave} className="flex-1 p-2 bg-green-500 text-white rounded hover:bg-green-600">保存</button>
                <button onClick={handleCancelEdit} className="flex-1 p-2 bg-gray-500 text-white rounded hover:bg-gray-600">キャンセル</button>
              </div>
          </div>
        ) : (
              <p>タグ: {tweet.tag || "なし"}</p>
          
        )}

         {!isEditing && (
                <button onClick={handleEdit} className="self-start p-2 bg-blue-500 text-white rounded hover:bg-blue-600">♻  編集</button>
          )
          
          }
            <button onClick={handleDelete} className="self-start p-2 bg-red-500 text-white rounded hover:bg-red-600">
            🗑️ 削除
            </button>
      </div>
    </div>
  );
}
// app/components/TweetForm.tsx
import { useState, useCallback, useEffect } from "react";
import { addTweet, getTags } from "../../lib/supabaseUtils";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { Button } from "@/components/ui/button";

function isValidTweetUrl(url: string): boolean {
    const tweetUrlPattern =
        /^https?:\/\/((?:twitter|x)\.com)\/[a-zA-Z0-9_]+\/status\/[0-9]+/i;
    return tweetUrlPattern.test(url);
}

interface TweetFormProps {
    onTweetAdded: () => void;
    compact?: boolean; // compact プロパティをオプションとして追加
}
export default function TweetForm({ onTweetAdded, compact }: TweetFormProps) {
  const [url, setUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // ローディング状態を追加

   useEffect(() => {
    const fetchTags = async () => {
      const tags = await getTags();
      setAllTags(tags);
    };
    fetchTags();
  }, []);

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
         onTweetAdded(); // 再読み込みではなく、親コンポーネントに通知
    } catch (error) {
        console.error("エラー:", error);
        alert("追加に失敗しました");
    }finally{
        setLoading(false)
    }
  }, [url, selectedTags, newTag, onTweetAdded]);

  // ここでコンパクトな表示にするかどうかを制御します。
    const formClassName = compact ? "mb-0" : "mb-8";
    const selectClassName = compact ? "w-full p-1 mb-1 border rounded" : "w-full p-2 mb-4 border rounded";
    const inputClassName = compact ? "w-full p-1 mb-1 border rounded" : "w-full p-2 mb-4 border rounded";
  return (
    <form onSubmit={handleSubmit} className={formClassName}>
        <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="ツイートのURL (twitter.com または x.com)"
        className={inputClassName}
      />
      {!compact && (
        <>
            <h3 className="text-xl font-bold mb-2">タグを選択 or 新規作成</h3>
        </>
      )}
      <select
      multiple
      value={selectedTags}
      onChange={(e) =>
        setSelectedTags(
          Array.from(e.target.selectedOptions, (option) => option.value)
        )
      }
      className={selectClassName}
      >
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
      </select>
      <Input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        placeholder="新規タグを入力"
        className={inputClassName}
    />
        <Button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
         {loading ? <LoadingSpinner size="sm"/> : "追加"}
        </Button>
     </form>
    );
}
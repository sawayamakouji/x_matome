// app/page.tsx
"use client";
import "./globals.css"
import TweetForm from "./components/TweetForm";
import TweetList from "./components/TweetList";
import { getTags } from "../lib/supabaseUtils";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";

export default function Home() {
  const [shouldRefresh, setShouldRefresh] = useState(0);
  const [showForm, setShowForm] = useState(false); // フォーム表示状態
  const [showList, setShowList] = useState(true); // リスト表示状態

  const handleTweetAdded = useCallback(() => {
    setShouldRefresh((prev) => prev + 1);
    setShowList(true); // ツイート追加後にリストを表示
    setShowForm(false); // フォームを非表示に
  }, []);

  const handleFormButtonClick = () => {
    setShowForm(!showForm); // フォーム表示/非表示を切り替え
    setShowList(false); // フォーム表示時はリストを非表示
  };

  const handleListButtonClick = () => {
    setShowList(!showList); // リスト表示/非表示を切り替え
    setShowForm(false); // リスト表示時はフォームを非表示
  };


  return (
    <div> {/* SidebarProvider と flex container を削除 */}
      <h1 className="text-3xl font-bold mb-8 text-center">ツイート埋め込み＆管理</h1>

      <div className="mb-4 flex justify-center gap-4">
        <Button onClick={handleFormButtonClick}>
          {showForm ? "フォームを隠す" : "ツイート投稿"} {/* ボタンテキストを状態に応じて変更 */}
        </Button>
        <Button onClick={handleListButtonClick}>
          {showList ? "リストを隠す" : "ツイート一覧"} {/* ボタンテキストを状態に応じて変更 */}
        </Button>
      </div>

      {showForm && ( // showForm が true の場合のみ表示
        <TweetForm onTweetAdded={handleTweetAdded} />
      )}

      {showList && ( // showList が true の場合のみ表示
        <TweetList initialTags={[]} key={shouldRefresh} />
      )}


      <footer className="fixed bottom-0 left-0 w-full bg-gray-100 p-4 text-center">
        <p className="text-sm text-gray-500">フッター (ボタンを配置)</p>
      </footer>
    </div>
  );
}
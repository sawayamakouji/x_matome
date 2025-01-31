import "./globals.css"
import { Inter } from "next/font/google"
import Script from "next/script"
import type React from "react"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Supabaseでツイート管理",
  description: "ツイートの埋め込みと管理を行うアプリケーション",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {/* SidebarProvider を削除 */}
        {children} 
        {/* SidebarProvider を削除 */}
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
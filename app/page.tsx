import TweetForm from "./components/TweetForm";
import TweetList from "./components/TweetList";
import { getTags } from "../lib/supabaseUtils";
import { Sidebar, SidebarContent, SidebarTrigger, SidebarInset, SidebarHeader } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default async function Home() {
  console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const tags = await getTags();

  return (
      <div className="flex">
          <Sidebar>
              <SidebarContent>
                 <SidebarHeader>
                    <h3 className="text-lg font-semibold mb-2">ツイート投稿</h3>
                  </SidebarHeader>
                   <TweetForm />
              </SidebarContent>
          </Sidebar>
        <SidebarInset>
           <div className="container mx-auto px-4 py-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">ツイート埋め込み＆管理</h1>
             <TweetList initialTags={tags} />
           </div>
        </SidebarInset>
     </div>
  );
}
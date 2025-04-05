import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import dynamic from "next/dynamic";

// 👇 dynamic import に変更
const Provider = dynamic(() => import("./providers/ClientProvider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Council_of_100",
  description: "Council_of_100",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Provider>
            {/* ヘッダー */}
            <header className="sticky top-0 border-b bg-white z-0" />

            {/* トースト */}
            <Toaster />

            <main className="container mx-auto max-w-screen-md flex-1 px-5">
              {children}
            </main>

            {/* フッター */}
            <footer className="py-5 fixed bottom-0 inset-x-0 bg-white">
              <div className="flex items-center justify-center lg:items-center">
                <span>Built by AI-Agents</span>
                <Image
                  className="rounded-xl"
                  src="/ai-agents.png"
                  alt="AI-Agent Logo"
                  width={30}
                  height={30}
                  priority
                />
              </div>
            </footer>
          </Provider>
        </div>
      </body>
    </html>
  );
}




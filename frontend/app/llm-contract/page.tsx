"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChatCompletionRequestMessage } from "openai";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import ChatMessages from "@/components/chat/ChatMessages";
import ChatForm from "@/components/chat/ChatForm";
import ChatScroll from "@/components/chat/ChatScroll";
import { triggerActions } from "@/components/chat/triggerActions";
import Navbar from "@/components/header/navbar";

import * as z from "zod";
import axios from "axios";

const useAudio = process.env.NEXT_PUBLIC_USE_AUDIO === "true";

const FormSchema = z.object({
  prompt: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
});
export type FormValues = z.infer<typeof FormSchema>;

export type Message = ChatCompletionRequestMessage & {
  event?: {
    embedPage?: {
      type: "iframe" | "component";
      url?: string;
      componentId?: string;
    };
  };
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const { toast } = useToast();
  
  // ✅ 初期メッセージ（1回だけ表示）
  useEffect(() => {
    const bootMessage: Message = {
      role: "system",
      content: `👋 Hello! I'm your Web3 assistant.

You can:
- 🗳️ Type **"vote"** to vote on a project idea
- ✉️ Type **"send token"** to transfer ETH  
- 🖼️ Type **"mint NFT"** to mint a new NFT

What would you like to do today?`,
    };
    setMessages([bootMessage]);
  }, []);

  const form = useForm<FormValues>({
    defaultValues: { prompt: "" },
    resolver: zodResolver(FormSchema),
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (data: FormValues) => {
    try {
      const userMessage: Message = { role: "user", content: data.prompt };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);

      for (const trigger of triggerActions) {
        if (trigger.check(data.prompt)) {
          const result = await trigger.action(data.prompt);
          if (result) {
            setMessages([...newMessages, result]);
          }
          form.reset();
          return;
        }
      }

      const response = await axios.post("/api/chat", {
        messages: newMessages,
        character: "chacha",// ここでキャラクター指定！
      });

      if (response.status === 200) {
        const updatedMessages = [...newMessages, response.data];
        setMessages(updatedMessages);
       
      } else {
        toast({
          variant: "destructive",
          title: "Failed to get message",
          description: "Please check the content.",
        });
      }

      form.reset();
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        variant: "destructive",
        title: "Failed to get message",
        description: "Please check the content.",
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Navbar />

      <div className="mt-[0rem]">
        <ChatMessages messages={messages} loading={loading} />
      </div>

      <ChatScroll messages={messages} />

      <div className="pb-4 inset-x-0 max-w-screen-md px-5 mx-auto bg-white">
        <ChatForm form={form} onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
}

import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
import { promises as fs } from "fs";
import { sendToken, getBalance } from "@/app/utils/contract";

// OpenAI API設定
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY!,
});
const openai = new OpenAIApi(configuration);

// メイン処理
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    // body から "character" を取得し、指定がなければ "trump" をデフォルトに
    const { messages, character = "trump" } = body;

    // キャラクターファイルのパスを動的に決定
    const characterFilePath = `./data/characters/${character}.json`;

    // JSONファイルの読み込み
    const characterData = JSON.parse(
      await fs.readFile(characterFilePath, "utf-8")
    );

    // キャラクター設定用のプロンプト
    const characterPrompt = `\n      You are ${characterData.name}.\n      You focus on the following topics: ${characterData.topics.join(", ")}.\n      Your knowledge includes: ${characterData.knowledge.join(", ")}.\n      Your communication style involves: ${characterData.style.all.join(", ")}.\n      Your speech often includes adjectives such as: ${characterData.adjectives.join(", ")}.\n    `;

    // ChatGPT APIへのリクエスト
    const response = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: characterPrompt },
        ...messages,
      ],
      functions: [
        {
          name: "sendToken",
          description: "Send tokens to a specified wallet address.",
          parameters: {
            type: "object",
            properties: {
              to: { type: "string", description: "Recipient wallet address" },
              amount: { type: "string", description: "Amount of tokens to send" },
            },
            required: ["to", "amount"],
          },
        },
        {
          name: "getBalance",
          description: "Get the balance of the smart contract.",
          parameters: {},
        },
      ],
      function_call: "auto",
    });

    const responseMessage = response.data.choices[0]?.message;
    if (!responseMessage) throw new Error("Empty response message");

    if (responseMessage.function_call) {
      const { name, arguments: args } = responseMessage.function_call;
      let parsedArgs;

      try {
        parsedArgs = typeof args === "string" ? JSON.parse(args) : args;
      } catch (parseError) {
        throw new Error("Failed to parse function call arguments");
      }

      let content = "";
      if (name === "sendToken") {
        content = await sendToken(parsedArgs.to, parsedArgs.amount);
      } else if (name === "getBalance") {
        content = await getBalance();
      } else {
        throw new Error(`Unknown function call: ${name}`);
      }

      return NextResponse.json({ role: "assistant", content });
    }

    return NextResponse.json(responseMessage);
  } catch (error: any) {
    console.error("Error:", error.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


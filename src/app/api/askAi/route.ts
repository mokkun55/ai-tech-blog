import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: process.env.OPENAI_API_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

const model = "gemma-3-4b-it-qat";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const article = body.article;

  const response = await client.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: `
Always response in 日本語
あなたは、技術系の記事をわかりやすく噛み砕いて伝えるアシスタントです。
相手は、個人開発をしている駆け出しエンジニアで、技術に関心はありますが、あまり深く考えたくありません。

以下の本文を読んで、以下の3点を箇条書きでまとめてください：

1. この内容でいちばん大事なこと（初心者向けに）
2. 「個人開発者的に使えそう」と思えるポイント
3. 読んだあとに思わずつぶやきたくなるような一言（カジュアルな雰囲気）

+++ 出力例 +++
🧠 この記事のポイント
- Cloudflare Workers を使えば、Node.js不要でサーバレスAPIが作れるよ！
- 個人開発なら、APIを無料でホストできるからコスパ最強。
- あとでVercelとの比較もあるから読む価値あり。

💡 個人開発者的にはここ注目！
- 無料枠でも1日10万リクエストOK
- GitHubでサクッとデプロイできる

😎 一言まとめ：
「無料でAPI公開？Cloudflare Workersでよくね？」
+++

=== ここから本文 ===
${article}
        `,
      },
      {
        role: "user",
        content: `${article}`,
      },
    ],
  });

  return NextResponse.json({
    response: response.choices[0].message.content,
    status: 200,
  });
}

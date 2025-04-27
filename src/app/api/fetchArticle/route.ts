import { NextResponse } from "next/server";
import { type ArticleData, extract } from "@extractus/article-extractor";
import striptags from "striptags";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URLが必要です" }, { status: 400 });
  }

  try {
    const article: ArticleData | null = await extract(url);

    if (!article) {
      return NextResponse.json(
        { error: "記事の取得に失敗しました" },
        { status: 404 }
      );
    }

    const cleanedContent = striptags(article?.content || "");

    return NextResponse.json(
      {
        title: article.title,
        source: article.source,
        favicon: article.favicon,
        content: article.content,
        cleanedContent,
        url: article.url,
        publishedAt: article.published,
        ttr: article.ttr,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "エラーが発生しました", details: err },
      { status: 500 }
    );
  }
}

"use client";

import { Header } from "./components/layout/header/Header";
import {
  FaBolt,
  FaCheckCircle,
  FaLayerGroup,
  FaSearch,
  FaGithub,
} from "react-icons/fa";
import { useState, FormEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { type ArticleType } from "@/types/articleType";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<ArticleType | undefined>();
  const [summary, setSummary] = useState<string | undefined>();

  const [baseURL, setBaseURL] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [model, setModel] = useState<string>("");

  // ローカルストレージから設定を読み込む
  useEffect(() => {
    const loadedBaseURL = localStorage.getItem("baseURL");
    const loadedApiKey = localStorage.getItem("apiKey");
    const loadedPrompt = localStorage.getItem("prompt");
    const loadedModel = localStorage.getItem("model");

    if (loadedBaseURL) setBaseURL(loadedBaseURL);
    if (loadedApiKey) setApiKey(loadedApiKey);
    if (loadedPrompt) setPrompt(loadedPrompt);
    if (loadedModel) setModel(loadedModel);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;

    // 新しい要約開始時にリセット
    setArticle(undefined);
    setSummary(undefined);
    setLoading(true);

    // 与えられたurlから記事の内容を取得する
    const articleRes = await fetch(`/api/fetchArticle?url=${url}`, {
      method: "POST",
    });
    if (!articleRes.ok) {
      toast.error("記事の取得に失敗しました");
      setLoading(false);
      return;
    }
    const article = await articleRes.json();
    setArticle(article);
    toast.success("記事情報の取得に成功しました");

    // 記事の内容をLLMで要約する
    const summaryRes = await fetch("/api/askAi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baseURL,
        apiKey,
        article: article.cleanedContent,
        model,
        prompt: prompt || "",
      }),
    });
    if (!summaryRes.ok) {
      toast.error("要約の取得に失敗しました");
      setLoading(false);
      return;
    }
    const summaryJson = await summaryRes.json();
    console.log("Summarized content:", summaryJson);
    setSummary(summaryJson.response);
    toast.success("要約の取得に成功しました");
    setLoading(false);
  };

  const handleCopy = async () => {
    if (!summary) {
      toast.error("データがありません");
      return;
    }
    await global.navigator.clipboard.writeText(summary || "");
    toast.success("コピーしました！");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-6 w-full">
        {/* サービス紹介 */}
        <div className="flex flex-col mt-12 rounded-2xl p-8 bg-gradient-to-br from-bg-light to-bg-light-secondary border border-border shadow-lg">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            技術記事をAIで要約
          </h1>
          <h2 className="text-center text-xl md:text-2xl font-medium text-text-light-secondary mb-6">
            Qiita や Zenn の技術記事をAIが簡潔にまとめます
          </h2>
          <p className="text-center text-lg max-w-2xl mx-auto mb-8">
            URLを入力するだけで、長い技術記事の要点を数分で把握できます
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-md">
              <div className="bg-primary-light rounded-full p-2 text-white">
                <FaBolt className="h-6 w-6" />
              </div>
              <span className="font-medium">要点をまとめてわかりやすく</span>
            </div>

            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-md">
              <div className="bg-primary-light rounded-full p-2 text-white">
                <FaCheckCircle className="h-6 w-6" />
              </div>
              <span className="font-medium">記事の確信を素早く把握</span>
            </div>

            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-md">
              <div className="bg-primary-light rounded-full p-2 text-white">
                <FaLayerGroup className="h-6 w-6" />
              </div>
              <span className="font-medium">
                複雑な技術トピックを分かりやすく
              </span>
            </div>
          </div>
        </div>

        {/* URL入力フォーム */}
        <div className="max-w-3xl mx-auto mt-12 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-border">
            <h3 className="text-xl font-semibold mb-4 text-center">
              記事URLを入力
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="技術記事のURLを入力"
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-medium text-white transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-primary-dark"
                  }`}
                >
                  {loading ? "要約中..." : "要約する"}
                </button>
              </div>
            </form>
          </div>

          {loading && (
            <div className="mt-6 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-text-light-secondary">
                AIが記事を解析中です...
              </p>
            </div>
          )}

          {/* 要約結果 */}
          {summary && article ? (
            <div className="container mx-auto flex flex-col my-16 bg-bg-secondary rounded-2xl p-4 border border-border shadow-lg">
              <p className="text-end">{article?.source}</p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-bold text-center"
              >
                {article?.title}
              </a>

              <p className="text-xl p-4 whitespace-pre-wrap">{summary}</p>

              <div className="mt-2 border-t-1 border-border pt-2 text-end">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={article.url}
                  className="mr-4"
                >
                  元記事を読む
                </a>
                <button onClick={handleCopy} className="cursor-copy">
                  要約をコピーする
                </button>
                {/* TODO 共有機能は時間があれば実装 */}
                {/* <p>共有</p> */}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-bg-light-secondary py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="font-bold text-xl mb-2">TechSum AI</p>
              <p className="text-text-light-secondary text-sm">
                技術記事のAI要約サービス &copy;{new Date().getFullYear()}
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a
                  href="https://github.com/mokkun55/ai-tech-blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-light-secondary hover:text-primary transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </div>
              <p>
                Create by{" "}
                <a
                  href="https://mokkun55.com"
                  className="underline text-accent"
                >
                  mokkun
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

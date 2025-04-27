"use client";

import { useState, useEffect } from "react";
import { Header } from "../components/layout/header/page";

export default function Page() {
  const [baseURL, setBaseURL] = useState<string>("http://localhost:1234/v1");
  const [apiKey, setApiKey] = useState<string>("lm-studio");
  const [prompt, setPrompt] = useState<string>("");
  const [model, setModel] = useState<string>("gemma-3-4b-it-qat");
  const [saved, setSaved] = useState<boolean>(false);

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

  // 設定を保存する
  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("baseURL", baseURL);
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("prompt", prompt);
    localStorage.setItem("model", model);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // プロンプトをリセットする
  const resetPrompt = (e: React.MouseEvent) => {
    e.preventDefault();
    setPrompt("");
    localStorage.removeItem("prompt");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col items-center justify-start flex-1 p-4">
        <h1 className="text-4xl font-bold">設定</h1>
        <div className="flex flex-col mt-4 w-[1000px] max-w-2xl p-6 bg-white rounded-lg shadow-md border border-gray-200 justify-center">
          <h2 className="text-md ">APIの設定を行います</h2>
          <form className="flex flex-col gap-4 mt-4" onSubmit={saveSettings}>
            <div className="flex flex-col gap-1">
              <label htmlFor="baseURL" className="font-medium text-gray-700">
                API URL
              </label>
              <input
                id="baseURL"
                type="text"
                placeholder="APIのURL"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={baseURL}
                onChange={(e) => setBaseURL(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="apiKey" className="font-medium text-gray-700">
                APIキー
              </label>
              <input
                id="apiKey"
                type="text"
                placeholder="APIキー"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="model" className="font-medium text-gray-700">
                使用モデル
              </label>
              <input
                id="model"
                type="text"
                placeholder="使用モデル"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="prompt" className="font-medium text-gray-700">
                システムプロンプト (Advanced)
              </label>
              <textarea
                id="prompt"
                placeholder="プロンプト (未入力でデフォルトプロンプトが使用されます)"
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="px-4 py-2 text-white bg-red-500 rounded cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={resetPrompt}
            >
              プロンプトをリセット
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              保存
            </button>

            {saved && (
              <div className="mt-2 text-green-600 font-medium text-center">
                設定が保存されました
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

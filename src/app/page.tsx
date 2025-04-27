"use client";

import { Header } from "./components/layout/header/page";
import {
  FaBolt,
  FaCheckCircle,
  FaLayerGroup,
  FaSearch,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { useState, FormEvent } from "react";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    // ここに実際のAPI呼び出しロジックを追加
    console.log("Summarizing URL:", url);

    // モックのためのタイマー（実際の実装では削除）
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleCopy = async () => {
    // TODO 今は仮置き
    await global.navigator.clipboard.writeText("要約された内容");
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
                    placeholder="https://qiita.com/... または https://zenn.dev/..."
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

          {/* 出力結果 */}
          {/* TODO あとで三項演算する */}

          <div className="container mx-auto flex flex-col my-16 bg-bg-secondary rounded-2xl p-4 border border-border shadow-lg">
            <p className="text-end">source</p>

            <Link href="" className="text-3xl font-bold text-center">
              タイトル
            </Link>

            {/* TODO ロード中はプログレス */}
            <p className="text-xl mt-4 p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              commodi accusamus, aliquid magnam beatae odit quibusdam dolores,
              aspernatur animi veniam nobis nemo aperiam eos enim porro
              similique nesciunt libero temporibus at non placeat! Adipisci
              maxime dolorem cum, eos quod corporis voluptatem ea repellat qui
              placeat inventore voluptatum optio repellendus nobis distinctio
              officiis enim ab quam, eligendi molestiae? Animi dolores labore
              doloremque voluptate ut cumque rem optio et corporis distinctio
              neque corrupti in dolorem ab reiciendis, sequi quia alias aperiam
              accusantium aut molestiae! Tempore, officia eligendi doloremque ab
              harum dolor reprehenderit dolorum provident sapiente dicta iste
              ducimus molestias neque minus nemo nisi cumque, facere
              voluptatibus odit. Doloribus ipsum nulla ipsa voluptate. Ipsam
              repudiandae eveniet reiciendis odio cupiditate facilis porro
              quibusdam minus id, assumenda, laborum expedita! Nihil autem
              tempora accusantium aliquam deleniti reprehenderit fugit iusto
              ipsam nam quisquam quas sequi, quos ullam! Consectetur explicabo
              vero iure nostrum autem sunt veritatis adipisci hic nisi
              voluptatem a sit sed corrupti, natus optio earum fugit. Doloremque
              facilis illum, assumenda excepturi optio ut praesentium deleniti
              at corrupti quia voluptatem dicta vel vitae distinctio sit velit
              labore veritatis nemo culpa dolorum numquam ea tempora qui
              laborum! Eligendi eum reprehenderit a ab nobis tempora itaque
              suscipit mollitia temporibus!
            </p>

            <div className="mt-2 border-t-1 border-border pt-2 text-end">
              <Link href={""} className="mr-4">
                元記事を読む
              </Link>
              <button onClick={handleCopy} className="cursor-copy">
                要約をコピーする
              </button>
              {/* TODO 共有機能は時間があれば実装 */}
              {/* <p>共有</p> */}
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-bg-light-secondary py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-bold text-xl mb-2">TechSum AI</div>
              <p className="text-text-light-secondary text-sm">
                技術記事のAI要約サービス &copy;{new Date().getFullYear()}
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-4 mb-4">
                <a
                  href="#"
                  className="text-text-light-secondary hover:text-primary transition"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-text-light-secondary hover:text-primary transition"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

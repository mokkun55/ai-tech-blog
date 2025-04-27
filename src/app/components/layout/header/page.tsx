import Link from "next/link";
import { AiOutlineSetting } from "react-icons/ai";

export const Header = () => {
  return (
    <div className="flex sticky items-center justify-between p-4 bg-primary text-white">
      <div className="flex items-center gap-2">
        <Link href="/" className="text-4xl font-bold">
          TechSum AI
        </Link>
        <h2 className="text-md">技術記事をAIが要約します</h2>
      </div>

      <Link href="/settings">
        <AiOutlineSetting className="text-[40px]" />
      </Link>
    </div>
  );
};

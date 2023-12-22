import UrlShortner from "@/components/UrlShortner";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-800 h-screen">
      <header className="mx-auto max-w-screen-xl p-5">
        <h1 className="inline-flex gap-2">
          <div className="font-bold text-lg text-white">
            <span className="text-sky-300">URL</span> Shortner
          </div>
          <Link />
        </h1>
      </header>
      <main>
        <UrlShortner />
      </main>
    </div>
  );
}

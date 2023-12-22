"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UrlData from "./Urldata";

export type urlType = {
  _id: string;
  urlCode: string;
  longUrl: string;
  shortUrl: string;
  date: string;
  __v: number;
};
const UrlShortner = () => {
  const router = useRouter();

  const [longUrl, setLongUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState(false);
  const [data, setData] = useState<urlType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!longUrl.trim()) {
      return;
    }
    try {
      const urlInfo = await axios.post("/api/shorten", { longUrl });
      setData((prev) => [...prev, urlInfo.data]);
    } catch (error) {
      console.error("Error during API request:", error);
    } finally {
      setLoading(false);
    }
    router.refresh();
    setDisplayUrl(true);
    setLongUrl("");
  };
  return (
    <section className="bg-red mx-auto max-w-screen-xl p-5">
      <div className="-mt-16  rounded-xl bg-[var(--primary-2)] py-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-2 md:flex-row"
        >
          <input
            className="w-full rounded-xl p-5  placeholder:text-black text-black border-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-sky-900 focus:border-transparent"
            type="text"
            placeholder="Enter long link here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button
            className="w-full rounded-xl bg-sky-800 px-10 py-5 text-white hover:bg-sky-300 md:w-fit shadow-lg font-bold whitespace-nowrap h-full disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            Shorten It!
          </button>
        </form>
      </div>
      {displayUrl && <UrlData data={data} />}
    </section>
  );
};

export default UrlShortner;

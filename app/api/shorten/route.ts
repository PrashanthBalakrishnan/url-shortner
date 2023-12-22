import { NextResponse } from "next/server";
import ShortUniqueId from "short-unique-id";
import validUrl from "valid-url";
import { connectDB } from "@/util/db";
import Url from "@/models/Url";

const uid = new ShortUniqueId({ length: 4 });

type urlType = {
  longUrl: string;
  urlCode: string;
  shortUrl: string;
  date: Date;
  _id: string;
};

export async function POST(req: Request) {
  const body = await req.json();
  const { longUrl } = body;
  const baseUrl = process.env.BASE_URL;
  if (!validUrl.isUri(baseUrl!)) {
    return new NextResponse("Invalid base url", { status: 401 });
  }

  //  check long url
  if (validUrl.isUri(longUrl)) {
    try {
      await connectDB();
      const urlCode = uid.rnd();
      let url = await Url.findOne({ longUrl });
      if (url) {
        return NextResponse.json(url);
      } else {
        const shortUrl = baseUrl + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();

        return NextResponse.json(url);
      }
    } catch (error) {
      console.log(error);
      return new NextResponse("Server error", { status: 500 });
    }
  } else {
    return new NextResponse("Invalid long url", { status: 401 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const urls: urlType[] = await Url.find({}).sort({ date: -1 });

    return NextResponse.json(urls);
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}

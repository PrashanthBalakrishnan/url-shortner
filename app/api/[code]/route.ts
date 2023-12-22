import Url from "@/models/Url";
import { connectDB } from "@/util/db";

export async function GET(
  _req: Request,
  { params }: { params: { code: string } }
) {
  try {
    await connectDB();
    console.log("this is from the route");
    let url = await Url.findOne({ urlCode: params.code });

    if (url) {
      return Response.redirect(url.longUrl);
    } else {
      return new Response("No url found", { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 500 });
  }
}

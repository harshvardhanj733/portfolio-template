import { connectToMongo } from "@/app/db/connectToMongo";
import { SavedModel } from "@/app/models/SavedDetails";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOption);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    await connectToMongo();
    const savedData = await SavedModel.findOne({ email: session.user?.email });
    console.log("User email:", session.user?.email);
    console.log("Retrieved saved data:", savedData);
    if (!savedData) {
      return new Response("No saved data found", { status: 404 });
    }
    return new Response(JSON.stringify(savedData), { status: 200 });
  } catch (error) {
    console.error("Error fetching saved data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOption);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const updatedData = await request.json();
    await connectToMongo();
    const savedData = await SavedModel.findOneAndUpdate(
      { email: session.user?.email },
      updatedData,
      { new: true }
    );
    if (!savedData) {
      return new Response("No saved data found to update", { status: 404 });
    }
    return new Response(JSON.stringify(savedData), { status: 200 });
  } catch (error) {
    console.error("Error updating saved data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

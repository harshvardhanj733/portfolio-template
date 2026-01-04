import { connectToMongo } from "@/app/db/connectToMongo";
import { PublishedModel } from "@/app/models/PublishedDetails";
import { getServerSession } from "next-auth";

export async function POST(request: Request){
    const session = await getServerSession();
    if(!session){
        return new Response("Unauthorized", {status: 401});
    }
    try{
        console.log("Publishing data for user:", session.user?.email);
        await connectToMongo();
        const data = await request.json();
        const updatedPublishedData = await PublishedModel.findOneAndUpdate(
            {email: session.user?.email},
            data,
            {new: true}
        );
        if(!updatedPublishedData){
            const newPublishedData = new PublishedModel(data);
            await newPublishedData.save();
            return new Response("Published data created successfully", {status: 201});
        }
        return new Response("Published data updated successfully", {status: 200});
    }
    catch(error){
        console.error("Error updating published data:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}

export async function GET(){
    try{
        await connectToMongo();
        const publishedData = await PublishedModel.find({}).select('id name role');
        if(!publishedData){
            return new Response("No published data found", {status: 404});
        }
        return new Response(JSON.stringify(publishedData), {status: 200});
    }
    catch(error){
        console.error("Error fetching published data:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}
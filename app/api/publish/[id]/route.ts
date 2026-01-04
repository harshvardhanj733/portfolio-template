import { connectToMongo } from "@/app/db/connectToMongo";
import { PublishedModel } from "@/app/models/PublishedDetails";

export async function GET(request: Request, { params }: { params: { id: string } }){
    const {id} = await params;
    try{
        await connectToMongo();
        const publishedData = await PublishedModel.findOne({id: id});
        console.log("Fetched published data for id:", id, publishedData);
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
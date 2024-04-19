import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request:Request,{params}:{params:{id:string}}){

    const {id} = params
    
    const post = await prisma.post.findUnique({
        where:{
            id
        },
        include:{
            user:true
        }
    })
    if(!post){
        throw new Error("there is no such post ")
    }
    return NextResponse.json(post,{status:201})
}
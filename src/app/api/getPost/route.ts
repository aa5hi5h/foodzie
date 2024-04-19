import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request:Request){
    const Posts = await prisma.post.findMany({})
    return NextResponse.json(Posts,{status:201})
}
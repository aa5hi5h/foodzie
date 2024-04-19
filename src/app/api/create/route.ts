import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { Session } from "inspector";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient()

export  async function POST( request: Request){
    const session = await getServerSession(authOption)
    const body = await request.json()
    const {title,description,ingredient,instruction,image,cookingTime} = body
    if(!title || !description || !image){
        return NextResponse.json({post:null,message:"Please add neccesary fields"},{status:401})
    }
    if(!session?.user?.email){
    return NextResponse.json({message:"not authenticated"},{status: 401})}
    const Existeduser = await prisma.user.findUnique({
   where:{
   email:session.user.email}})
   if(!Existeduser){
    return null
   }


    const post = await prisma.post.create({
        data:{
            title,
            description,
            ingredient,
            instruction,
            image,
            cookingTime,
            userId: Existeduser.id
        }
    })
    return NextResponse.json({createdPost : post,message:"post created"},{status:201})
}
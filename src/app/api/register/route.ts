import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request:Request){
    const body = await request.json()
    const {email,name,password} = body

    if(!email || !password){
        throw new Error("Please fill in the credentials")
    }
    
    const existedUser = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(existedUser){
        throw new Error("User with this email registerd")
    }
    const hashedPass = await bcrypt.hash(password,10)
    const newUser = await prisma.user.create({
        data:{
            email,
            name,
            password: hashedPass
        }
    })

    return NextResponse.json({user: newUser,message:"User Registered"},{status:201})
}
"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

interface PostProp {
  id: string,
  title: string,
  description: string,
  ingredient: string,
  instruction: string,
  cookingTime: string,
  image: string,
  user: User 
}

export default function Home() {

    const session = useSession()

    const searchParams = useSearchParams()
    const POSTID = searchParams.get("id")

  const [post, setPost] = useState<PostProp | undefined>(undefined)
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`/api/post/${POSTID}`)
      const data = await response.json()
      setPost(data)
      console.log(data)
    };
    getPost()
  },[POSTID])
  
  return (
    <div className=" max-w-5xl mt-8  mx-auto">
      {post  ?  (
          <div className="flex flex-col  p-4   transition rounded-md shadow-lg">
            <img className="w-80 h-40 rounded-md mr-4" src={post.image} alt="image" />
            <div>
              <h1 className="text-4xl mt-4 font-semibold mb-1">{post.title}</h1>
              <h2 className="opacity-80 text-xl font.medium mb-8">created by: {post.user.name}</h2>
              <h2 className="text-xl">
                <div className="text-2xl font-medium ">Description</div>
              <div font-normal >{post.description}</div></h2>
              <h2 className="text-lg font-normal"><p className="text-2xl font-medium mt-4">Ingredients -</p>{post.ingredient}</h2>
              <h2 className="text-lg font-normal"><p className="text-2xl font-medium mt-4">Instructions</p>{post.instruction}</h2>
              <h2 className="flex gap-4 items-center  text-xl"><p className="text-2xl font-medium mt-4">Cooking time - </p><p className="mt-3">{post.cookingTime}</p></h2>
              <h2></h2>
            </div>
          </div>
      ): (<p className="text-3xl font-extrabold tracking-tight text-zinc-950 ">Loading.....</p>)}
    </div>
  );
}

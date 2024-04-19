"use client"
import Image from "next/image";
import Navbar from "./component/Navbar";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: string,
  title: string,
  description: string,
  ingredient: string,
  instruction: string,
  cookingtime: string,
  image: string,
  user: string | undefined
}

export default function Home() {

  const [post, setPost] = useState<Post[]>([])
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch("/api/getPost")
      const data = await response.json()
      setPost(data)
    };
    getPost()
  },[])
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3 mb-8 gap-4 max-w-5xl ">
      {post && post.map((data: Post) => (
        <Link className="" href={`/post?id=${data.id}`} key={data.id}>
          <div className="flex flex-col  p-4 hover:bg-zinc-950 hover:text-white transition rounded-md shadow-lg bg-white border-2 border-zinc-950">
            <img className="w-80 h-40 rounded-md mr-4" src={data.image} alt="image" />
            <div>
              <h1 className="text-2xl mt-4 font-medium mb-2">{data.title}</h1>
              <h2 className="text-xl  opacity-80">{data.description.slice(0, 30)}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

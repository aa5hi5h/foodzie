"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"

interface InputProp{
    title : string,
    description: string,
    ingredient : string,
    instruction: string,
    image: string,
    cookingTime: string
}

const Create = () => {
    const router = useRouter()
    const [input,setInput] =useState<InputProp>({
        title:"",
        description:"",
        ingredient: "",
        instruction:"",
        image:"",
        cookingTime: ""
    }) 

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
     if(!input.title || !input.description || !input.image){
           alert("please fill in Title, Description and Image")
    }

    const response = await fetch("/api/create",{
        method:"POST",
        headers: {
            "Content-type":"Application/json"
        },
        body: JSON.stringify(input)

    })
    if(response.ok){

        alert("post created")
        router.push('/')
    }

    }
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col w-[380px] gap-2 mb-4 text-2xl shadow-md font-semibold mx-auto rounded-md h-auto p-8 outline-none border-2 border-zinc-950">
                <label>Title</label>
                <input value={input.title} onChange={(e) => setInput({...input,title:e.target.value})}
                className="rounded-md text-xl font-normal mb-3 opacity-70 focus:opacity-100 px-2 py-1 outline-none border-2 border-zinc-950 " />
                <label>Description</label>
                <ReactTextareaAutosize value={input.description} onChange={(e) => setInput({...input,description:e.target.value})}
                className="rounded-md focus:opacity-100 text-xl mb-3 opacity-70 font-normal  px-2 py-1 outline-none border-2 border-zinc-950" minRows={4} />
                <label>Ingredient</label>
                <input value={input.ingredient} onChange={(e) => setInput({...input,ingredient:e.target.value})}
                className="rounded-md text-xl font-normal mb-3 focus:opacity-100 opacity-70 outline-none border-2 border-zinc-950 px-2 py-1"/>
                <label>Instruction</label>
                <input value={input.instruction} onChange={(e) => setInput({...input,instruction:e.target.value})}
                className="rounded-md text-xl font-normal mb-3 focus:opacity-100 opacity-70  outline-none border-2 border-zinc-950 px-2 py-1"/>
                <label>Image</label>
                <input  value={input.image}  onChange={(e) => setInput({...input,image:e.target.value})}
                className="rounded-md text-xl mb-3 font-normal focus:opacity-100 opacity-70  outline-none border-2 border-zinc-950 px-2 py-1"/>
                <label>Cooking Time</label>
                <input value={input.cookingTime}  onChange={(e) => setInput({...input,cookingTime:e.target.value})}
                className="rounded-md text-xl font-normal focus:opacity-100 opacity-70  outline-none border-2 border-zinc-950 px-2 py-1"/>
                <button className="text-xl font-bold bg-slate-800 hover:bg-zinc-950 px-4 py-2 rounded-md text-white max-w-max mt-4">Submit</button>
            </form>
        </div>
    )
}
export default Create
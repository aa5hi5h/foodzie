"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface InputProp{
    email : string,
    name: string,
    password: string
}

const register = () => {
    const router = useRouter()
    const[input,setInput] = useState<InputProp>({
        email: '',
        name: '',
        password: ""
    })


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
       e.preventDefault()
       if(!input.email || !input.password){
        alert("Please fill in email and Password")
       }
       const response =  await fetch('/api/register',{
        method:"POST",
        headers:{
            "content-type":"Application/json"
        },
        body:JSON.stringify(input), 
       })
       if(response.ok){
        alert("User registered")
        router.push("/login")
       }
          
    }
    return (
        <div>
             <form onSubmit={handleSubmit} className="flex flex-col mt-8 w-80 gap-2 mb-4 text-2xl shadow-md font-semibold mx-auto rounded-md h-auto p-8 outline-none border-2 border-zinc-950">
                <label>Email</label>
                <input value={input.email} onChange={(e) => setInput({...input,email:e.target.value})}
                className="rounded-md text-xl font-normal mb-3 opacity-70 focus:opacity-100 px-2 py-1 outline-none border-2 border-zinc-950 " />      
                <label>name</label>
                <input value={input.name}  onChange={(e) => setInput({...input,name:e.target.value})}
                className="rounded-md text-xl font-normal focus:opacity-100 opacity-70  outline-none border-2 border-zinc-950 px-2 py-1"/>
                <label>Password</label>
                <input type="password" value={input.password} onChange={(e) => setInput({...input,password:e.target.value})}
                className="rounded-md text-xl font-normal mb-3 opacity-70 focus:opacity-100 px-2 py-1 outline-none border-2 border-zinc-950 " />
                <button className="text-xl font-bold bg-slate-800 hover:bg-zinc-950 px-4 py-2 rounded-md text-white max-w-max mt-4">Submit</button>
                <p className="text-lg mt-2 font-medium whitespace-nowrap">Already have an Account <Link className="underline text-xl text-purple-800 hover:text-purple-900" href={'/login'}>Login</Link></p>
            </form>

        </div>
    )
}

export default register
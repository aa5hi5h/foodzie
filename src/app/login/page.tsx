"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"

interface InputProp{
    email : string,
    password: string
}

const login = () => {
    const router = useRouter()
    const[input,setInput] = useState<InputProp>({
        email: '',
        password: ""
    })

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=> {
       e.preventDefault()
       if(!input.email || !input.password){
        alert("Please fill in email and Password")
       }
       const signInData = await signIn("credentials",{
        email:input.email,
        password:input.password,
        redirect: false
       })

       if(signInData?.error){
        console.log(signInData.error)
       }else(
        router.push('/')
       )
          
    }
    return (
        <div>
             <form onSubmit={handleSubmit} className="flex mt-16 flex-col w-80 gap-2 mb-4 text-2xl shadow-md font-semibold mx-auto rounded-md h-auto p-8 outline-none border-2 border-zinc-950">
                <label>Email</label>
                <input value={input.email} onChange={(e) => setInput({...input,email:e.target.value})}
                className="rounded-md text-xl font-normal mb-3 opacity-70 focus:opacity-100 px-2 py-1 outline-none border-2 border-zinc-950 " />      
                <label>Password</label>
                <input type="password" value={input.password} onChange={(e) => setInput({...input,password:e.target.value})}
                className="rounded-md text-xl font-normal mb-3 opacity-70 focus:opacity-100 px-2 py-1 outline-none border-2 border-zinc-950 " />
                <button className="text-xl font-bold bg-slate-800 hover:bg-zinc-950 px-4 py-2 rounded-md text-white max-w-max mt-4">Submit</button>
                <p className=" text-lg mt-2 font-medium whitespace-nowrap">Don't have an Account <Link className="underline text-purple-800 hover:text-purple-900" href={'/register'}>Register</Link></p>
            </form>

        </div>
    )
}

export default login
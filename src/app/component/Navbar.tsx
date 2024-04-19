"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"


const Navbar = ()=> {
    const session = useSession()
    return(
      <div>
        <ul className="flex justify-between mt-2 p-2 border-b-[1px] rounded-lg mb-8">
            <div className=" text-3xl font-extrabold "><Link href={'/'}>Swiggy</Link></div>
            <div className="flex p-2 text-xl gap-2  font-semibold">
                <Link className="  p-2 hover:bg-neutral-200 rounded-md " href={'/create'}>Create</Link>
                <Link className=" p-2 hover:bg-neutral-200 rounded-md " href={'/saved'}>Saved</Link>
                {session.data?.user?.email ? (
                    <h1 className=" p-2 text-white hover:bg-red-500 bg-rose-500  rounded-md" onClick={() => signOut()}>signOut</h1>
                ) : (
                    <Link className=" p-2 hover:bg-neutral-200 rounded-md " href={'/login'}>signIn</Link>
                )}
            </div>
        </ul>
      </div>
      )
}

export default Navbar
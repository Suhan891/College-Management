"use client"

import VerifyCollege from "@/pages/Auth/VerifyCollege"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function VerifyCollegePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if(!token || !email) {
      toast.error("You do not have required fields to enter here")
      router.push("/auth")
    }
      const isToken = token?.split(".").length === 3 && token.length>20

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(email)
      if(isToken && isEmail) {
        setTimeout(() => setIsChecking(false), 0) // direct call was bad
      } else{
        toast.error("Query not Valid. Please validate college creation again")
        router.push("/auth/register-college")
      }
    
  },[ token, email, router])
  return (
    <>
      {isChecking ? (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Validating verification link...
        </p>
      </div>
    ) : ( <VerifyCollege email={email} token={token} />)}
    </>
  )  
}

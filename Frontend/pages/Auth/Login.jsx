"use client"
import { ArrowRight, GraduationCap, Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateLogin } from "@/validations/auth";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/AuthStore";

const Login = () => {
  const setUser = useAuthStore(state => state.setUser)
  const login = useLogin()
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: errors,
  } = useForm({
    resolver: zodResolver(validateLogin),
  });

  // const {user, isLogin} = useAuthStore()
  const onSubmit = (data) => {

    login.mutateAsync(data, {
      onError: (error) => {
        console.error(error);
        toast.error(error?.message ?? "Login Unsuccessfull")
      },
      onSuccess: (result) => {
        console.log(result);
        setUser(result.data)
        toast.success(result?.message ?? "Login Successfull")
        if(result.data.role === "college")
          router.push("/dashboard/college")
        // const seIsLogin = useAuthStore((state) => state.seIsLogin)
        if(result.data.role === "student")
          router.push("/dashboard/student")
        if(result.data.role === "teacher")
          router.push("/dashboard/teacher")
      }
    })
  }
  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/20 mb-4">
          <GraduationCap className="h-8 w-8 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Welcome Back
        </h2>
        <p className="text-slate-400 text-sm mt-2">
          Sign in to your EduTrack account
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email address"
            {...register("email")}
            className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-500"
          />
          {errors?.email && (
            <span className="text-xs mt-1 text-red-700">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-500"
          />
          {errors?.password && (
            <span className="text-xs mt-1 text-red-700">
              {errors.password.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={login.isPending}
          className="w-full mt-8 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {login.isPending ? <Loader2 className="animate-spin" /> : "Sign In"}
          {!login.isPending && <ArrowRight className="h-5 w-5" />}
        </button>
      </form>
    </div>
  );
};

export default Login;
"use client"
import { Building, User, Calendar, Upload, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { validateCreateCollege } from '@/validations/auth';
import { useCreateCollege } from '@/hooks/useAuth';

export default function RegisterCollege() {

const createCollege = useCreateCollege()

  const {
    register,
    handleSubmit,
    isSubmitting,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateCreateCollege),
    defaultValues: {
      user: { name: "", email: "", password: "", confirmPassword: "" },
      college: { collegeName: "", establishedYear: 2024 }
    }
  });

  if(errors)
    console.log("Validation Errors:", errors);


const onSubmit = (data) => {
    console.log(data)
    createCollege.mutateAsync(data, {
        onSuccess: (result) => {
            console.log(result)
            toast.success(result?.message ?? "Please verify your email in inbox")
            reset()
        },
        onError: (error) => {
            console.error(error)
            toast.error(error?.message ?? "Unable to register. Please try again")
        }
    })
}

  return (
    <>
    {/* <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center selection:bg-cyan-500/30"> */}

      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <Building className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">Register Your Institution</h1>
          <p className="text-slate-400 text-lg">Create your admin account and set up your college workspace.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            
            {/* Card 1: Admin Details */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center border-b border-slate-800 pb-4">
                <User className="h-5 w-5 text-cyan-500 mr-3" /> Admin Account
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                  <input {...register("user.name")} placeholder="John Doe" className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" />
                  {errors.user?.name && <p className="text-red-500 text-xs mt-1">{errors.user.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Work Email</label>
                  <input {...register("user.email")} type="email" placeholder="admin@college.edu" className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" />
                  {errors.user?.email && <p className="text-red-500 text-xs mt-1">{errors.user.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                    <input {...register("user.password")} type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" />
                    {errors.user?.password && <p className="text-red-500 text-xs mt-1">{errors.user.password.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Confirm</label>
                    <input {...register("user.confirmPassword")} type="password" placeholder="••••••••" className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" />
                    {errors.user?.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.user.confirmPassword.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: College Details */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center border-b border-slate-800 pb-4">
                <Building className="h-5 w-5 text-blue-400 mr-3" /> Institution Details
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">College Name</label>
                  <input {...register("college.collegeName")} placeholder="e.g. Oxford University" className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" />
                  {errors.college?.collegeName && <p className="text-red-500 text-xs mt-1">{errors.college.collegeName.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Established Year</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input {...register("college.establishedYear")} type="number" className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" />
                  </div>
                  {errors.college?.establishedYear && <p className="text-red-500 text-xs mt-1">{errors.college.establishedYear.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">College Logo</label>
                  <label className="mt-1 flex justify-center px-6 py-6 border-2 border-slate-800 border-dashed rounded-xl hover:border-cyan-500/50 hover:bg-slate-800/30 transition-all cursor-pointer group">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-8 w-8 text-slate-500 group-hover:text-cyan-400" />
                      <div className="flex text-sm text-slate-400">
                        <span className="text-cyan-500 font-medium">Upload a file</span>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <input
                       type="file"
                        className="sr-only"
                        // {...register("college.ocollegeLogo")} -> Shall be implemented later
                         accept="image/*" />
                    </div>
                  </label>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-center">
            <button 
            type="submit"
            disabled={createCollege.isPending}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:scale-105 transform w-full sm:w-auto cursor-pointer">
              {createCollege.isPending ? <Loader2 className="animate-spin" /> : "Complete Registration"}
              {!createCollege.isPending && <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </form>
      </div>
    {/* </div> */}
    </>
  );
}

import { UserPlus, Calendar as CalendarIcon, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { validateRoleVerification } from '@/validations/auth';
import { useVerifyRole } from '@/hooks/useAuth';
 


  export default function VerifyRoles({email, token}){
    const router = useRouter();
    const verifyRole = useVerifyRole()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateRoleVerification),
    defaultValues: {
      token: token,
      user: { password: "", confirmPassword: "", dob: "" }
    }
  });

  const onSubmit = async (data) => {
    verifyRole.mutateAsync(data, {
      onSuccess: (result) => {
        console.log(result)
        reset()
        toast.success(result?.message ?? "Email verification Successfull")
        toast.success("Please login to open your Dashboard")
        router.push("/auth/login")
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message ?? "Email verification Unsuccessfull")
        
      }
    })
    
  };
  return (
    <>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <UserPlus className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">User Registration</h1>
          <p className="text-slate-400 text-sm">Secure your account and verify your age.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
            <div className="space-y-5">
               
            {/* Email Field (Disabled) */}
            <div className="mb-5">
                <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                <div className="relative">
                    <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 opacity-70" />
                    <input 
                    type="email" 
                    disabled 
                    value={email || ""} 
                    className="w-full bg-slate-950/50 border border-slate-800 text-slate-500 pl-12 pr-5 py-3.5 rounded-xl cursor-not-allowed italic font-medium transition-colors" 
                    />
                </div>
                <p className="text-[10px] text-slate-500/60 mt-1.5 ml-1 italic">
                    This email is linked to your verification account
                </p>
            </div>


              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
                <input 
                  type="password" 
                  {...register("user.password")}
                  placeholder="••••••••" 
                  className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none transition-colors" 
                />
                {errors.user?.password && <p className="text-red-500 text-xs mt-1">{errors.user.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  {...register("user.confirmPassword")}
                  placeholder="••••••••" 
                  className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none transition-colors" 
                />
                {errors.user?.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.user.confirmPassword.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Date of Birth</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input 
                    type="date" 
                    {...register("user.dob")}
                    className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none transition-colors [color-scheme:dark]" 
                  />
                </div>
                {errors.user?.dob && <p className="text-red-500 text-xs mt-1">{errors.user.dob.message}</p>}
              </div>

            </div>

            <button 
              type="submit" 
              disabled={verifyRole.isPending}
              className="w-full mt-8 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-5 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              {verifyRole.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>Complete Registration <ArrowRight className="h-5 w-5" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
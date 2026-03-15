"use client"
import { useState } from 'react';
import { User, MapPin, Calendar as CalendarIcon, Navigation, ArrowRight, Loader2, Mail, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { validateCollegeEmailVerify } from '@/validations/auth';
import { useVerifyCollege } from '@/hooks/useAuth';
// import { profileSchema } from '@/schemas/auth/verify-college';
// import { useVerifyCollege } from '@/hooks/useAuth';

export default function VerifyCollege({token, email}) {
  const router = useRouter()
  const [isLocating, setIsLocating] = useState(false);
  const verifyCollege = useVerifyCollege()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateCollegeEmailVerify),
    defaultValues: {
      token: token, 
      user: { dob: "" },
      location: { latitude: "", longitude: "", city: "", state: "", country: "", pincode: "" }
    }
  });
  if(errors)
    console.log(errors)

  const onSubmit = (data) => {
    verifyCollege.mutateAsync(data, {
      onSuccess: (result) => {
        console.log(result)
        toast.success(result?.message ?? "Email verification Successfull")
        toast.success("Please login to open your Dashboard")
        router.push("/auth/login")
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message ?? "Email verification Unsuccessfull")
        
      }
    })
  }

  // Watch coordinates to display them in the disabled inputs
  const coords = watch(["location.latitude", "location.longitude"]);

  const getOneTimeLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("location.latitude", position.coords.latitude);
        setValue("location.longitude", position.coords.longitude);
        setIsLocating(false);
      },
      () => {
        toast.error("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <MapPin className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Complete Profile Setup</h1>
          <p className="text-slate-400 text-lg">Provide your details and location to secure your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            
            {/* User Details Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden h-fit">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center border-b border-slate-800 pb-4">
                <User className="h-5 w-5 text-cyan-500 mr-3" /> Admin Details
              </h2>

              {/* Email Field (Disabled/Read-only) */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-slate-400 mb-2">Registered Email</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input 
                    type="email" 
                    disabled 
                    value={email || ""} 
                    className="w-full bg-slate-950/50 border border-slate-800 text-slate-500 pl-12 pr-5 py-3.5 rounded-xl cursor-not-allowed italic" 
                    />
                </div>
                <p className="text-[10px] text-slate-600 mt-1.5 ml-1 flex items-center gap-1">
                    <Lock className="h-3 w-3" /> This email is verified and cannot be changed.
                </p>
            </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Date of Birth</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                  <input 
                    type="date" 
                    {...register("user.dob")}
                    className="w-full bg-slate-950 border border-slate-800 text-white pl-12 pr-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none [color-scheme:dark]" 
                  />
                </div>
                {errors.user?.dob && <p className="text-red-500 text-xs mt-1">{errors.user.dob.message}</p>}
              </div>
            </div>

          {/* Address Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center border-b border-slate-800 pb-4 justify-between">
              <div className="flex items-center"><MapPin className="h-5 w-5 text-blue-400 mr-3" /> Address</div>
              <button 
                type="button"
                onClick={getOneTimeLocation}
                disabled={isLocating}
                className="text-xs flex items-center gap-1 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/20 transition-all cursor-pointer"
              >
                <Navigation className={`h-3 w-3 ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? 'Locating...' : 'Detect Location'}
              </button>
            </h2>
            
            <div className="space-y-5">
              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-4">
                <input disabled value={coords[0]} placeholder="Lat" className="bg-slate-950/50 border border-slate-800/50 text-slate-500 px-4 py-2.5 rounded-lg font-mono text-sm" />
                <input disabled value={coords[1]} placeholder="Lng" className="bg-slate-950/50 border border-slate-800/50 text-slate-500 px-4 py-2.5 rounded-lg font-mono text-sm" />
              </div>

              {/* City & State */}
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <input {...register("location.city")} placeholder="City" className={`w-full bg-slate-950 border ${errors.location?.city ? 'border-red-500/50' : 'border-slate-800'} text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none`} />
                  {errors.location?.city && <p className="text-[10px] uppercase tracking-wider font-semibold text-red-400 ml-1">{errors.location.city.message}</p>}
                </div>
                <div className="space-y-1">
                  <input {...register("location.state")} placeholder="State" className={`w-full bg-slate-950 border ${errors.location?.state ? 'border-red-500/50' : 'border-slate-800'} text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none`} />
                  {errors.location?.state && <p className="text-[10px] uppercase tracking-wider font-semibold text-red-400 ml-1">{errors.location.state.message}</p>}
                </div>
              </div>

              {/* Country & Pincode */}
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <input {...register("location.country")} placeholder="Country" className={`w-full bg-slate-950 border ${errors.location?.country ? 'border-red-500/50' : 'border-slate-800'} text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none`} />
                  {errors.location?.country && <p className="text-[10px] uppercase tracking-wider font-semibold text-red-400 ml-1">{errors.location.country.message}</p>}
                </div>
                <div className="space-y-1">
                  <input {...register("location.pincode", { valueAsNumber: true })} type="number" placeholder="Pincode" className={`w-full bg-slate-950 border ${errors.location?.pincode ? 'border-red-500/50' : 'border-slate-800'} text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none`} />
                  {errors.location?.pincode && <p className="text-[10px] uppercase tracking-wider font-semibold text-red-400 ml-1">{errors.location.pincode.message}</p>}
                </div>
              </div>
            </div>
          </div>

          </div>

          <div className="flex justify-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2 min-w-[300px] justify-center"
            >
              {verifyCollege.isPending ? <Loader2 className="animate-spin" /> : "Save Profile Details"}
              {!verifyCollege.isPending && <ArrowRight className="h-5 w-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

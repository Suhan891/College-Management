"use client";

import React from 'react';
import { UserPlus, GraduationCap, BookOpen, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
// import { roleSchema } from '@/schemas/auth/register-role';
import { validateRoleRegistration } from '@/validations/auth';
import { useRegisterRole } from '@/hooks/useAuth';
// import { useRegisterRole } from '@/hooks/useAuth';

export default function RegisterRole() {
//   const router = useRouter();
//   const registerRole = useRegisterRole();
const registerRole = useRegisterRole()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    unregister,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validateRoleRegistration),
    defaultValues: {
      role: 'student',
    }
  });

  const activeRole = watch("role"); // a typescipt error

  // Toggle role and cleanup the other object's data
  const handleRoleChange = (role) => {
    if (role === 'student') {
      unregister('teacher');
      setValue('role', 'student');
    } else {
      unregister('student');
      setValue('role', 'teacher');
    }
  };
  if(errors)
    console.log(errors)
const onSubmit = (data) => {
  registerRole.mutateAsync(data, {
    onError: (error) => {
      console.error(error)
      toast.error(error?.message ?? "Role Registration unsuccessfull")
    },
    onSuccess: (result) => {
      console.log(result)
      toast.success(result?.message ?? "Please check your email")
      reset()
    }
  })
}

  return (
    <>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <UserPlus className="h-8 w-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">Join Your Campus</h1>
          <p className="text-slate-400 text-sm">Create your account to access your institution&apos;s portal.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none"></div>

          {/* Role Toggle */}
          <div className="flex p-1 bg-slate-950 rounded-xl mb-8 border border-slate-800 relative z-10">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeRole === 'student' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="h-4 w-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('teacher')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${
                activeRole === 'teacher' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="h-4 w-4" /> Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
            <div className="space-y-5">
              <div className="pt-2 border-t border-slate-800/50 mt-2 min-h-[100px]">
                {activeRole === 'teacher' ? (
                  <div key="teacher-fields" className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <label className="block text-sm font-medium text-slate-400 mb-2">Batch Number</label>
                    <input 
                      {...register("teacher.batchNumber", { valueAsNumber: true })}
                      type='number'
                      placeholder="e.g. BATCH-2024-CS" 
                      className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" 
                    />
                    {errors.teacher?.batchNumber && <p className="text-red-500 text-xs mt-1">{errors.teacher.batchNumber.message}</p>}
                  </div>
                ) : (
                  <div key="student-fields" className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Enrollment No.</label>
                      <input 
                        {...register("student.enrollmentNumber", { valueAsNumber: true })}
                        placeholder="e.g. 123" 
                        type="number"
                        className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" 
                      />
                      {errors.student?.enrollmentNumber && <p className="text-red-500 text-xs mt-1">{errors.student.enrollmentNumber.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Roll Number</label>
                      <input 
                        {...register("student.rollNumber", { valueAsNumber: true })}
                        type="number"
                        placeholder="e.g. 42" 
                        className="w-full bg-slate-950 border border-slate-800 text-white px-5 py-3.5 rounded-xl focus:border-cyan-500 outline-none" 
                      />
                      {errors.student?.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.student.rollNumber.message}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={registerRole.isPending}
              className="w-full mt-8 bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {registerRole.isPending ? <Loader2 className="animate-spin" /> : "Verify Account"}
              {!registerRole.isPending && <ArrowRight className="h-5 w-5" />}
            </button>
          </form>
        </div>
      </div>
    {/* </div> */}
    </>
  );
}

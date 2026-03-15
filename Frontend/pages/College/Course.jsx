"use client"
import { useCreateCourse } from "@/hooks/useCollege";
import { useCollege } from "@/store/useCollege";
import { validateCourse } from "@/validations/college";
import { zodResolver } from "@hookform/resolvers/zod";
import { Book, BookOpen, Building2, Clock, Layers, Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Course() {
    const course = useCreateCourse()
    const addCourse = useCollege(state => state.addCourse)
    const courses = useCollege(state => state.courses)
    // so all will be stored within courses
    const [showCourseForm, setShowCourseForm] = useState(false);

    const mockCourses = [
    { code: 'BTECH-CS', name: 'Computer Science', duration: 4, semesters: 8, dept: 'Engineering' },
    { code: 'BBA', name: 'Business Administration', duration: 3, semesters: 6, dept: 'Management' },
    { code: 'BCA', name: 'Computer Applications', duration: 3, semesters: 6, dept: 'IT' },
    { code: 'BSC-PHY', name: 'Applied Physics', duration: 3, semesters: 6, dept: 'Science' },
    ];

    const {register, handleSubmit, formState: {errors} } = useForm({
      resolver: zodResolver(validateCourse)
    })

    const onSubmit = (data) => {
      course.mutateAsync(data, {
        onError: (error) => {
          console.error(error)
          toast.error(error?.message ?? "Course creation unsuccessfull")
        },
        onSuccess: (result) => {
          console.log(result);
          toast.success(result?.message ?? "Course created")
          addCourse(result.data)
          setTimeout(() => console.log("After 5sec",courses), 5000) 
        }
      })
    }
    if(errors)
      console.log(errors)

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Header Row: Dept Count & Create Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Left Side: Number of Departments */}
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 flex items-center gap-5 min-w-[280px] shadow-sm">
                  <div className="bg-blue-500/10 p-3.5 rounded-xl border border-blue-500/20">
                    <Building2 className="h-7 w-7 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium mb-1">Total Departments</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">12</h3>
                  </div>
                </div>

                {/* Right Side: Create Button */}
                <button 
                  onClick={() => setShowCourseForm(!showCourseForm)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm ${
                    showCourseForm 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {showCourseForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {showCourseForm ? 'Cancel Creation' : 'Create Course'}
                </button>
              </div>

            {/* The Form (Conditionally Rendered) */}
            {showCourseForm && (
              <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 md:p-8 animate-in slide-in-from-top-4 shadow-sm">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-400" /> Course Configuration
                </h3>
                
                {/* Ensure handleSubmit is connected to your onSubmit function */}
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Course Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Course Name</label>
                    <input 
                      type="text" 
                      {...register("course_name", { required: "Course name is required" })} 
                      placeholder="e.g., MCA-24" 
                      className={`w-full bg-[#0a0f1c] border ${errors.course_name ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`} 
                    />
                    {errors.course_name && <p className="mt-1 text-xs text-red-500">{errors.course_name.message}</p>}
                  </div>

                  {/* Course Code */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Course Code</label>
                    <input 
                      type="text" 
                      {...register("course_code", { required: "Course code is required" })} 
                      placeholder="e.g., MCA-24" 
                      className={`w-full bg-[#0a0f1c] border ${errors.course_code ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`} 
                    />
                    {errors.course_code && <p className="mt-1 text-xs text-red-500">{errors.course_code.message}</p>}
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Duration (Years)</label>
                    <input 
                      type="number" 
                      placeholder="e.g., 3" 
                      {...register("duration_years", { valueAsNumber: true })}
                      className={`w-full bg-[#0a0f1c] border ${errors.duration_years ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`} 
                    />
                    {errors.duration_years && <p className="mt-1 text-xs text-red-500">{errors.duration_years.message}</p>}
                  </div>

                  {/* Total Semesters */}
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Total Semesters</label>
                    <input 
                      type="number" 
                      placeholder="e.g., 6" 
                      {...register("total_semesters", { valueAsNumber: true })}
                      className={`w-full bg-[#0a0f1c] border ${errors.total_semesters ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors`} 
                    />
                    {errors.total_semesters && <p className="mt-1 text-xs text-red-500">{errors.total_semesters.message}</p>}
                  </div>

                  <div className="md:col-span-3 flex justify-end mt-2">
                    {/* Changed to type="submit" so the form actually triggers validation */}
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm">
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            )}


              {/* Existing Departments/Courses Cards */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-slate-400" /> Existing Programs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockCourses.map((course, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 hover:border-blue-500/30 transition-all group shadow-sm flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-blue-500/10 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide text-blue-400 border border-blue-500/20">
                          {course.code}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800/60">
                          {course.dept}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-4 line-clamp-2">{course.name}</h4>
                      
                      <div className="mt-auto pt-4 border-t border-slate-800/60 flex items-center justify-between text-sm text-slate-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="h-4 w-4 text-slate-500" /> {course.duration} Years
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Book className="h-4 w-4 text-slate-500" /> {course.semesters} Sems
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
    )
}
import {z} from "zod"

export const validateCourse = z.object({
    course_name: z.string("Must be string").min(1,"It is required"),
    course_code: z.string("Must be string").min(1,"It is required"),
    duration_years: z.number().min(1).max(10,"So many not possible"),
    total_semesters: z.number().min(1).max(20,"So many not possible")
})

export const validateStream = z.object({
    streamName: z.string().min(1).max(200),
    streamCode: z.string().min(1).max(25),
    courseId: z.uuid("Invalid format")
})

export const validateDepartment = z.object({
    departmentName: z.string().min(1).max(200),
    departmentCode: z.string().min().max(25),
    streamId: z.uuid()
})

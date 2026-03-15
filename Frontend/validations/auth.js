import {z} from 'zod'

export const validateLogin = z.object({
    email: z.email("Privide a valid email"),
    password: z.string().min(5, "Password should exceed 5 charecters").max(255, "Password should not exceed 255 charecters")
})

export const validateCreateCollege = z.object({
    user: z.object({
        name: z.string().min(2,"Provide a full name"),
        email: z.email("Provide a valid Email"),
        password: z.string().min(5, "Password should exceed 5 charecters").max(255, "Password should not exceed 255 charecters"),
        confirmPassword: z.string().min(5, "Password should exceed 5 charecters").max(255, "Password should not exceed 255 charecters")
    }).refine(data => data.password === data.confirmPassword, {
        message: "Password is not matching",
        path: ["confirmPassword"]
    }),
    college: z.object({
        collegeName: z.string().min(2, "College name is required"),
        establishedYear: z.coerce.number().min(1800).max(new Date().getFullYear()),
        // collegeLogo : z.any().optional(), // Later image upload shall be implemented
    })
})

export const validateCollegeEmailVerify = z.object({
    token: z.string(),
    user: z.object({
        dob: z.string().min(1, "Date of birth is required"),
    }),
    location: z.object({
        latitude: z.number().min(1, "Required"),
        longitude: z.number().min(1, "Required"),
        city: z.string().min(2, "City is required"),
        state: z.string().min(2, "State is required"),
        country: z.string().min(2, "Country is required"),
        pincode: z.number("Pincode must be number").min(4, "Invalid pincode"),
    }),
})

const studentSchema = z.object({
  role: z.literal("student"),
  student: z.object({
    enrollmentNumber: z.number().min(3, "Enrollment number is required"),
    rollNumber: z.number().min(1, "Roll number is required"),
  }),
  teacher: z.undefined().optional(),
});
const teacherSchema = z.object({
  role: z.literal("teacher"),
  teacher: z.object({
    batchNumber: z.number().min(1, "Batch number is required"),
  }),
  student: z.undefined().optional(),
});
export const validateRoleRegistration = z.discriminatedUnion("role", [studentSchema, teacherSchema]);

export const validateCollegeVerification = z.object({
  token: z.string(),
  user: z.object({
    dob: z.string().min(1, "Date of birth is required"),
  }),
  location: z.object({
    latitude: z.string().min(1, "Required"),
    longitude: z.string().min(1, "Required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    country: z.string().min(2, "Country is required"),
    pincode: z.string().min(4, "Invalid pincode"),
  }),
});

export const validateRoleVerification = z.object({
  token: z.string(),
  user: z.object({
    password: z.string().min(5, "Password must be at least 5 characters").max(255, "Password cannot be more than 255 charecters"),
    confirmPassword: z.string(),
    dob: z.string().min(1, "Date of birth is required"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});
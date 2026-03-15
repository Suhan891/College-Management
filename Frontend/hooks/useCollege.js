import { CreateCourse } from "@/api/college";
import { useMutation } from "@tanstack/react-query";


export function useCreateCourse() {
    return useMutation({
        mutationFn: (payload) => CreateCourse()
    })
}
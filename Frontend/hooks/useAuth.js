import { CreateCollege, Login, RegisterRole, Verifycollege, VerifyRole } from "@/api/authentication";
import { useMutation } from "@tanstack/react-query";

export function useCreateCollege() {
    return useMutation({
        mutationFn: (payload) => CreateCollege(payload)
    })
}

export function useVerifyCollege() {
    return useMutation({
        mutationFn: (payload) => Verifycollege(payload)
    })
}

export function useRegisterRole(){
    return useMutation({
        mutationFn: (payload) => RegisterRole(payload)
    })
}

export function useVerifyRole() {
    return useMutation({
        mutationFn: (payload) => VerifyRole(payload)
    })
}

export function useLogin() {
    return useMutation({
        mutationFn: (payload) => Login(payload)
    })
}
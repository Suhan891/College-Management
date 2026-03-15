"use client"
import { GraduationCap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateLogin } from "@/validations/auth";

import Login from "@/pages/Auth/Login";


export default function LoginPage() {

  return (
    <Login />
  )
}




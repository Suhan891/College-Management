"use server"
import Cookies from 'js-cookie'
import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

function getUrl(path) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
    return `${API_BASE}${path}`;

}

async function CreateCookie({accessToken, role}) {
  const cookieStore = await cookies()

  Cookies.set("AccessToken", accessToken, {
    expiresIn: '30m',
    path: '/',
    httpOnly: true, // Crucial: prevents client-side JS from stealing the token
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
  Cookies.set("Role", role, {
    expiresIn: '30m',
    path: '/',
    httpOnly: true, // Crucial: prevents client-side JS from stealing the token
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  console.log("access Token: ",cookieStore.get("AccessToken"))
  console.log("Role: ",cookieStore.get("Role"))
}

async function request(path, {method, body} = {}) {
    const url = getUrl(path)
    const headers = {"Content-Type": "application/json"}

    const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    })

    console.log("Response: ",response)

    const data = await response.json()
    console.log(data)

    if(!data.success) {
        throw new Error(data)
    }

    if(path === "/login") {
      await CreateCookie({
        accessToken: data.data.accessToken,
        role: data.data.role
      })
    }

    return data
}

async function postJson(path, payload) {
  return request(path, { method: "POST", body: payload });
}

export async function CreateCollege(data) {
const { user, college } = data;

  const sanitizedUser = { ...user };
  delete sanitizedUser.confirmPassword;

  const sanitizedCollege = { ...college };
  if (sanitizedCollege?.logo) {
    delete sanitizedCollege.logo;
  }

  return postJson("/college/register", {
    user: sanitizedUser,
    college: sanitizedCollege,
  });
}

export async function Verifycollege(data) {
  const {token, user, location} = data

  return postJson(`/college/verify-email?token=${token}`, {
    user,
    adress: location
  })
}

export async function RegisterRole(data) {
  if(data.role === "student") {
    return postJson("/student/register", data.student)
  }
  if(data.role === "teacher") {
    return postJson("/teacher/register", data.teacher)
  }
}

export async function VerifyRole(data) {
  const {user, token} = data

  const sanitizedUser = { ...user };
  delete sanitizedUser.confirmPassword;

  console.log(sanitizedUser)

  return postJson(`/verify-role?token=${token}`,{...sanitizedUser})
}

export async function Login(data) {
  return postJson("/login", data)  
}

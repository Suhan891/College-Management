import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

function getUrl(path) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
    return `${API_BASE}${path}`;

}

async function CreateCookie({accessToken, role}) {
  // Use `sameSite: "none"` so the cookie is sent for cross-origin requests
  // (e.g. frontend on localhost:3000 -> API on localhost:8080).
  // Note: some browsers require `secure: true` when sameSite is none.
  const isProd = process.env.NODE_ENV === 'production';

  Cookies.set("AccessToken", accessToken, {
    expires: 30 / 1440, // 30 minutes in days
    path: '/',
    secure: isProd,
    sameSite: 'none'
  })
  Cookies.set("Role", role, {
    expires: 30 / 1440,
    path: '/',
    secure: isProd,
    sameSite: 'none'
  })

  console.log("access Token: ", Cookies.get("AccessToken"))
  console.log("Role: ", Cookies.get("Role"))
}

async function request(path, {method, body} = {}) {
    const url = getUrl(path)
    const headers = {"Content-Type": "application/json"}

    const accessToken = Cookies.get("AccessToken")
    console.log("Getting access token")
    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`
    }

    const fetchOptions = {
        method,
        headers,
        body: JSON.stringify(body),
        credentials: "include", // send cookies (refresh token, etc.) for cross-origin requests
    }

    let response = await fetch(url, fetchOptions)

    console.log("Response: ", response)

    // If token is invalid, attempt to refresh and retry once.
    if (response.status === 401) {
        try {
            const refreshResponse = await fetch(getUrl("/refresh-token"), {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            })

            if (refreshResponse.ok) {
                const refreshData = await refreshResponse.json()
                if (refreshData.success) {
                    const newToken = refreshData.data.accessToken
                    const newRole = refreshData.data.role

                    await CreateCookie({accessToken: newToken, role: newRole})

                    // Retry the original request with new token
                    headers["Authorization"] = `Bearer ${newToken}`
                    response = await fetch(url, fetchOptions)
                }
            }
        } catch (error) {
            console.error("Refresh token failed:", error)
        }
    }

    const data = await response.json()
    console.log(data)

    if (!data.success) {
        throw new Error(data.message || "Request failed")
    }

    if (path === "/login") {
        await CreateCookie({
            accessToken: data.data.accessToken,
            role: data.data.role
        })
    }

    return data
}

export default async function postJson(path, payload) {
  return request(path, { method: "POST", body: payload });
}
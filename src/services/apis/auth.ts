
  import { RegisterData, ApiError, LoginData, User, LoginResponse } from "@/types/types";
  const baseURL = "http://localhost:8000/api"
  
  export async function registerUserApi(data: RegisterData): Promise<User> {
    const res = await fetch(`${baseURL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message || "Failed to register");
    }
    return res.json();
  }
  
  export async function loginUserApi(data: LoginData): Promise<LoginResponse> {
    const res = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message || "Failed to login");
    }
  
    return res.json();
  }
  
  export async function fetchUserApi(userId: string): Promise<User> {
    const res = await fetch(`${baseURL}/auth/fetch-user/${userId}`);
  
    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message || "Failed to fetch user");
    }
    return res.json();
  }


  
  export async function fetchUsersApi(): Promise<User[]> {
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("No token found. Please log in.");
    }
  
    const res = await fetch(`${baseURL}/auth/fetch-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message || "Failed to fetch users");
    }
  
    return res.json();
  }
  
/**
 * DigiConnect Ghana - Frontend API Client (Hardened & Audited)
 * Connects the frontend to the backend REST API with secure credentials and error handling.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = sessionStorage.getItem("dcg_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
    ...(options?.headers || {}),
  };

  const res = await fetch(url, {
    credentials: "include", // Send HttpOnly session cookie
    headers,
    ...options,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `HTTP error! status: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// Authentication API
export async function loginAdmin(email: string, password: string) {
  const data = await request<{
    success: boolean;
    message: string;
    user: { email: string; role: string };
    token: string;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (typeof window !== "undefined" && data.token) {
    sessionStorage.setItem("dcg_token", data.token);
  }

  return data;
}

export async function verifyAdminSession() {
  return request<{
    success: boolean;
    authenticated: boolean;
    user?: { email: string; role: string };
  }>("/auth/verify");
}

export async function logoutAdmin() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("dcg_token");
    sessionStorage.removeItem("dcg_connecthub_auth");
  }
  return request<{ success: boolean; message: string }>("/auth/logout", {
    method: "POST",
  });
}

// Applications API
export async function getApplications(status?: string) {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return request<{ success: boolean; count: number; data: any[] }>(`/applications${query}`);
}

export async function submitApplication(data: any) {
  return request<{ success: boolean; data: any }>("/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateApplicationStatus(id: string, status: string, notes?: string) {
  return request<{ success: boolean; data: any }>(`/applications/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, notes }),
  });
}

// Contacts API
export async function submitContactMessage(data: any) {
  return request<{ success: boolean; data: any }>("/contacts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Involvements API
export async function submitInvolvement(data: any) {
  return request<{ success: boolean; data: any }>("/involvements", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Events API
export async function getEvents() {
  return request<{ success: boolean; count: number; data: any[] }>("/events");
}

export async function createEvent(data: any) {
  return request<{ success: boolean; data: any }>("/events", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// News API
export async function getNews() {
  return request<{ success: boolean; count: number; data: any[] }>("/news");
}

// Gallery API
export async function getGallery() {
  return request<{ success: boolean; count: number; data: any[] }>("/gallery");
}

// Stats & Dashboard
export async function getStats() {
  return request<{ success: boolean; impactStats: any[]; summary: any; contactInfo: any }>("/stats");
}

// File Upload
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const headers = getAuthHeader();

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    credentials: "include",
    headers,
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "File upload failed");
  }

  return res.json() as Promise<{
    success: boolean;
    message: string;
    url: string;
    filename: string;
    size: number;
    mimetype: string;
  }>;
}

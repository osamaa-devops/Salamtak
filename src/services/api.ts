const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "salamtak-token";
const USER_KEY = "salamtak-user";

export type UserRole = "patient" | "doctor" | "admin";

export interface ApiUser {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface AuthResult {
  user: ApiUser;
  token: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): ApiUser | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setAuthSession(result: AuthResult) {
  localStorage.setItem(TOKEN_KEY, result.token);
  localStorage.setItem(USER_KEY, JSON.stringify(result.user));
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as ApiResponse<T>) : null;

  if (!response.ok) {
    throw new Error(payload?.message || "Network request failed");
  }

  return payload?.data as T;
}

export const api = {
  login(data: { role: UserRole; email?: string; phone?: string; password: string }) {
    return request<AuthResult>("/auth/login", { method: "POST", body: JSON.stringify(data) });
  },
  register(data: Record<string, unknown>) {
    return request<AuthResult>("/auth/register", { method: "POST", body: JSON.stringify(data) });
  },
  me() {
    return request<{ user: ApiUser; profile: unknown }>("/auth/me");
  },
  doctors(params = "") {
    return request<any[]>(`/doctors${params}`);
  },
  videoDoctors() {
    return request<any[]>("/doctors/video");
  },
  patients(search = "") {
    return request<any[]>(`/patients${search ? `?search=${encodeURIComponent(search)}` : ""}`);
  },
  patientProfile() {
    return request<any>("/profile/patient");
  },
  updatePatientProfile(data: Record<string, unknown>) {
    return request<any>("/profile/patient", { method: "PATCH", body: JSON.stringify(data) });
  },
  appointments() {
    return request<any[]>("/appointments");
  },
  createAppointment(data: Record<string, unknown>) {
    return request<any>("/appointments", { method: "POST", body: JSON.stringify(data) });
  },
  updateAppointment(id: string, data: Record<string, unknown>) {
    return request<any>(`/appointments/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  },
  createPrescription(data: Record<string, unknown>) {
    return request<any>("/prescriptions", { method: "POST", body: JSON.stringify(data) });
  },
  medicationSchedules() {
    return request<any[]>("/medication-schedules");
  },
  createMedicationSchedule(data: Record<string, unknown>) {
    return request<any>("/medication-schedules", { method: "POST", body: JSON.stringify(data) });
  },
  updateMedicationSchedule(id: string, data: Record<string, unknown>) {
    return request<any>(`/medication-schedules/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  },
  deleteMedicationSchedule(id: string) {
    return request<void>(`/medication-schedules/${id}`, { method: "DELETE" });
  },
  reminders() {
    return request<any[]>("/reminders");
  },
  markReminderRead(id: string) {
    return request<any>(`/reminders/${id}/read`, { method: "PATCH" });
  },
  pharmacies(search = "") {
    return request<any[]>(`/pharmacies${search ? `?search=${encodeURIComponent(search)}` : ""}`);
  },
  createOrder(data: Record<string, unknown>) {
    return request<any>("/orders", { method: "POST", body: JSON.stringify(data) });
  },
  reviews(category = "doctor", rating?: number) {
    const params = new URLSearchParams({ category });
    if (rating) params.set("rating", String(rating));
    return request<{ items: any[]; stats: any }>(`/reviews?${params.toString()}`);
  },
  createReview(data: Record<string, unknown>) {
    return request<any>("/reviews", { method: "POST", body: JSON.stringify(data) });
  },
  markReviewHelpful(id: string) {
    return request<any>(`/reviews/${id}/helpful`, { method: "PATCH" });
  },
  startConsultation(data: Record<string, unknown>) {
    return request<any>("/consultations", { method: "POST", body: JSON.stringify(data) });
  },
  addConsultationMessage(id: string, message: string) {
    return request<any>(`/consultations/${id}/messages`, { method: "POST", body: JSON.stringify({ message }) });
  },
  endConsultation(id: string) {
    return request<any>(`/consultations/${id}/end`, { method: "PATCH" });
  },
};

import type { Participant, InsertParticipant, Submission, InsertSubmission, SubmissionWithParticipant } from "@shared/schema";

const API_BASE = "/api";

export const api = {
  async createParticipant(data: InsertParticipant): Promise<Participant> {
    const res = await fetch(`${API_BASE}/participants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to create participant");
    }
    return res.json();
  },

  async getParticipant(id: string): Promise<Participant> {
    const res = await fetch(`${API_BASE}/participants/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch participant");
    }
    return res.json();
  },

  async createSubmission(data: InsertSubmission): Promise<Submission> {
    const res = await fetch(`${API_BASE}/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Failed to submit answers");
    }
    return res.json();
  },

  async getAllSubmissions(): Promise<SubmissionWithParticipant[]> {
    const res = await fetch(`${API_BASE}/submissions`);
    if (!res.ok) {
      throw new Error("Failed to fetch submissions");
    }
    return res.json();
  },

  async adminLogin(username: string, password: string): Promise<{ success: boolean; message?: string }> {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Login failed");
    }
    return res.json();
  },
};

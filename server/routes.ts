import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertParticipantSchema, insertSubmissionSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Create participant (register for quiz)
  app.post("/api/participants", async (req, res) => {
    try {
      const validatedData = insertParticipantSchema.parse(req.body);
      const participant = await storage.createParticipant(validatedData);
      res.json(participant);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromError(error).toString() });
      }
      console.error("Error creating participant:", error);
      res.status(500).json({ error: "Failed to create participant" });
    }
  });

  // Get participant by ID
  app.get("/api/participants/:id", async (req, res) => {
    try {
      const participant = await storage.getParticipant(req.params.id);
      if (!participant) {
        return res.status(404).json({ error: "Participant not found" });
      }
      res.json(participant);
    } catch (error) {
      console.error("Error fetching participant:", error);
      res.status(500).json({ error: "Failed to fetch participant" });
    }
  });

  // Submit quiz answers
  app.post("/api/submissions", async (req, res) => {
    try {
      const validatedData = insertSubmissionSchema.parse(req.body);
      const submission = await storage.createSubmission(validatedData);
      res.json(submission);
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ error: fromError(error).toString() });
      }
      console.error("Error creating submission:", error);
      res.status(500).json({ error: "Failed to submit answers" });
    }
  });

  // Get all submissions (admin only)
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  // Admin login endpoint
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    
    // Admin credentials
    if (username === "megacv@gmail.com" && password === "megacv") {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  });

  return httpServer;
}

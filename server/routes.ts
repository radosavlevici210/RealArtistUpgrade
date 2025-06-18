import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (for demo purposes, always return user ID 1)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get user stats
  app.get("/api/user/stats", async (req, res) => {
    try {
      const stats = await storage.getUserStats(1);
      if (!stats) {
        return res.status(404).json({ message: "User stats not found" });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  // Get all projects for current user
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjectsByUserId(1);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get a specific project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Create a new project
  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse({
        ...req.body,
        userId: 1, // For demo purposes, always use user ID 1
      });

      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Update a project
  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const project = await storage.updateProject(id, updates);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  // Delete a project
  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Get all AI artists
  app.get("/api/ai-artists", async (req, res) => {
    try {
      const artists = await storage.getAiArtists();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI artists" });
    }
  });

  // Generate AI script from lyrics
  app.post("/api/ai/generate-script", async (req, res) => {
    try {
      const { lyrics, mood, genre } = req.body;

      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate AI-generated script
      const script = {
        structure: [
          { section: "Intro", duration: 15, lyrics: lyrics.split('\n').slice(0, 2).join('\n') },
          { section: "Verse 1", duration: 30, lyrics: lyrics.split('\n').slice(2, 6).join('\n') },
          { section: "Chorus", duration: 25, lyrics: lyrics.split('\n').slice(6, 10).join('\n') },
          { section: "Verse 2", duration: 30, lyrics: lyrics.split('\n').slice(10, 14).join('\n') },
          { section: "Chorus", duration: 25, lyrics: lyrics.split('\n').slice(6, 10).join('\n') },
          { section: "Bridge", duration: 20, lyrics: lyrics.split('\n').slice(14, 18).join('\n') },
          { section: "Outro", duration: 15, lyrics: lyrics.split('\n').slice(-2).join('\n') },
        ],
        totalDuration: 160,
        key: "C Major",
        timeSignature: "4/4",
        mood,
        genre,
      };

      res.json(script);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate AI script" });
    }
  });

  // Generate AI voice
  app.post("/api/ai/generate-voice", async (req, res) => {
    try {
      const { script, artistVoice } = req.body;

      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate AI-generated voice file
      const voiceResult = {
        audioUrl: "https://example.com/generated-voice.mp3",
        duration: script.totalDuration,
        format: "mp3",
        quality: "high",
        artist: artistVoice,
      };

      res.json(voiceResult);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate AI voice" });
    }
  });

  // Generate AI instrumental
  app.post("/api/ai/generate-instrumental", async (req, res) => {
    try {
      const { mood, genre, tempo, duration } = req.body;

      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Simulate AI-generated instrumental
      const instrumental = {
        audioUrl: "https://example.com/generated-instrumental.mp3",
        duration,
        tempo,
        key: "C Major",
        mood,
        genre,
        format: "mp3",
      };

      res.json(instrumental);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate AI instrumental" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
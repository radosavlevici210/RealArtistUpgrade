import { users, projects, aiArtists, userStats, royaltyTracking, securityLogs, contentProtection, type User, type Project, type AiArtist, type UserStats, type InsertProject } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByUserId(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // AI Artist operations
  getAiArtists(): Promise<AiArtist[]>;
  getAiArtist(id: number): Promise<AiArtist | undefined>;
  createAiArtist(artist: InsertAiArtist): Promise<AiArtist>;

  // User Stats operations
  getUserStats(userId: number): Promise<UserStats | undefined>;
  updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private aiArtists: Map<number, AiArtist>;
  private userStats: Map<number, UserStats>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentAiArtistId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.aiArtists = new Map();
    this.userStats = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentAiArtistId = 1;

    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      username: "ervin_radosavlevici",
      email: "admin@root-cloud.com",
      name: "Ervin Radosavlevici",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      accountType: "pro",
      createdAt: new Date(),
    };
    this.users.set(1, defaultUser);
    this.currentUserId = 2;

    // Create default AI artists
    const defaultArtists: AiArtist[] = [
      {
        id: 1,
        name: "AI Pop Vocalist",
        description: "Versatile, clear tone",
        voiceType: "pop",
        avatarUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
        isActive: true,
      },
      {
        id: 2,
        name: "AI Hip-Hop Vocalist",
        description: "Rhythmic, powerful delivery",
        voiceType: "hip-hop",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
        isActive: true,
      },
      {
        id: 3,
        name: "AI R&B Vocalist",
        description: "Soulful, emotional range",
        voiceType: "rnb",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616c6da2f02?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
        isActive: true,
      },
    ];
    defaultArtists.forEach(artist => this.aiArtists.set(artist.id, artist));
    this.currentAiArtistId = 4;

    // Create default user stats
    const defaultStats: UserStats = {
      id: 1,
      userId: 1,
      songsCreated: 47,
      totalStreams: 12400,
      royaltiesEarned: 284700, // $2,847.00 in cents
      aiCreditsRemaining: 156,
      subscriptionPlan: "professional",
      accountStatus: "active",
      lastLoginAt: new Date(),
      totalSpent: 990000, // $9,900.00 in cents
    };
    this.userStats.set(1, defaultStats);

    // Create sample projects
    const sampleProjects: Project[] = [
      {
        id: 1,
        userId: 1,
        title: "Midnight Dreams",
        lyrics: "Walking through the midnight dreams...",
        mood: "melancholic",
        genre: "pop",
        tempo: 120,
        artistVoice: "AI Pop Vocalist",
        status: "complete",
        currentStep: 6,
        metadata: {},
        audioUrl: "https://example.com/midnight-dreams.mp3",
        videoUrl: "https://example.com/midnight-dreams.mp4",
        certificateUrl: "https://example.com/midnight-dreams-cert.pdf",
        bundleUrl: "https://example.com/midnight-dreams-bundle.zip",
        watermarkId: "WM-2025-001-MIDNIGHT",
        royaltiesEarned: 45670,
        totalStreams: 3420,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
      {
        id: 2,
        userId: 1,
        title: "Summer Vibes",
        lyrics: "Feel the summer breeze tonight...",
        mood: "uplifting",
        genre: "pop",
        tempo: 128,
        artistVoice: "AI Pop Vocalist",
        status: "processing",
        currentStep: 3,
        metadata: {},
        audioUrl: null,
        videoUrl: null,
        certificateUrl: null,
        bundleUrl: null,
        watermarkId: null,
        royaltiesEarned: 0,
        totalStreams: 0,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
      {
        id: 3,
        userId: 1,
        title: "Heartbreak Anthem",
        lyrics: "When you left me standing there...",
        mood: "melancholic",
        genre: "rnb",
        tempo: 90,
        artistVoice: "AI R&B Vocalist",
        status: "complete",
        currentStep: 6,
        metadata: {},
        audioUrl: "https://example.com/heartbreak-anthem.mp3",
        videoUrl: "https://example.com/heartbreak-anthem.mp4",
        certificateUrl: "https://example.com/heartbreak-anthem-cert.pdf",
        bundleUrl: "https://example.com/heartbreak-anthem-bundle.zip",
        watermarkId: "WM-2025-003-HEARTBREAK",
        royaltiesEarned: 78940,
        totalStreams: 5890,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ];
    sampleProjects.forEach(project => this.projects.set(project.id, project));
    this.currentProjectId = 4;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      profileImage: insertUser.profileImage || null,
      accountType: insertUser.accountType || "pro",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const now = new Date();
    const project: Project = {
      id,
      userId: insertProject.userId,
      title: insertProject.title,
      lyrics: insertProject.lyrics || null,
      mood: insertProject.mood || null,
      genre: insertProject.genre || null,
      tempo: insertProject.tempo || null,
      artistVoice: insertProject.artistVoice || null,
      status: insertProject.status || "draft",
      currentStep: insertProject.currentStep || null,
      metadata: insertProject.metadata || {},
      audioUrl: null,
      videoUrl: null,
      certificateUrl: null,
      bundleUrl: null,
      watermarkId: null,
      royaltiesEarned: 0,
      totalStreams: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updatedProject: Project = {
      ...project,
      ...updates,
      updatedAt: new Date(),
    };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getAiArtists(): Promise<AiArtist[]> {
    return Array.from(this.aiArtists.values()).filter(artist => artist.isActive);
  }

  async getAiArtist(id: number): Promise<AiArtist | undefined> {
    return this.aiArtists.get(id);
  }

  async createAiArtist(insertAiArtist: InsertAiArtist): Promise<AiArtist> {
    const id = this.currentAiArtistId++;
    const artist: AiArtist = {
      ...insertAiArtist,
      id,
      description: insertAiArtist.description || null,
      avatarUrl: insertAiArtist.avatarUrl || null,
      isActive: insertAiArtist.isActive !== undefined ? insertAiArtist.isActive : true,
    };
    this.aiArtists.set(id, artist);
    return artist;
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    return Array.from(this.userStats.values()).find(stats => stats.userId === userId);
  }

  async updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats | undefined> {
    const stats = Array.from(this.userStats.values()).find(s => s.userId === userId);
    if (!stats) return undefined;

    const updatedStats: UserStats = {
      ...stats,
      ...updates,
    };
    this.userStats.set(stats.id, updatedStats);
    return updatedStats;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.userId, userId));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, updates: Partial<Project>): Promise<Project | null> {
    try {
      const [project] = await db
        .update(projects)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(projects.id, id))
        .returning();

      return project || null;
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw new Error("Failed to update project");
    }
  }

  async deleteProject(id: number): Promise<boolean> {
    try {
      const result = await db
        .delete(projects)
        .where(eq(projects.id, id));

      return result.rowCount > 0;
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      return false;
    }
  }

  async getAiArtists(): Promise<AiArtist[]> {
    try {
      return await db.select().from(aiArtists).where(eq(aiArtists.isActive, true));
    } catch (error) {
      console.error("Error fetching AI artists:", error);
      return [];
    }
  }

  async getAiArtist(id: number): Promise<AiArtist | undefined> {
    const [artist] = await db.select().from(aiArtists).where(eq(aiArtists.id, id));
    return artist || undefined;
  }

  async createAiArtist(insertAiArtist: InsertAiArtist): Promise<AiArtist> {
    const [artist] = await db
      .insert(aiArtists)
      .values(insertAiArtist)
      .returning();
    return artist;
  }

  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats || undefined;
  }

  async updateUserStats(userId: number, updates: Partial<UserStats>): Promise<UserStats | undefined> {
    const [stats] = await db
      .update(userStats)
      .set(updates)
      .where(eq(userStats.userId, userId))
      .returning();
    return stats || undefined;
  }

  // Production methods for analytics
  async getProjectAnalytics(userId: number): Promise<any> {
    try {
      const projects = await this.getProjectsByUserId(userId);
      const totalStreams = projects.reduce((sum, p) => sum + (p.totalStreams || 0), 0);
      const totalRevenue = projects.reduce((sum, p) => sum + (p.royaltiesEarned || 0), 0);

      return {
        totalProjects: projects.length,
        totalStreams,
        totalRevenue,
        avgRating: 4.7,
        topGenres: ["pop", "electronic", "ambient"],
        recentActivity: projects.slice(0, 5)
      };
    } catch (error) {
      console.error('Analytics error:', error);
      return {
        totalProjects: 0,
        totalStreams: 0,
        totalRevenue: 0,
        avgRating: 0,
        topGenres: [],
        recentActivity: []
      };
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Simple query to check database connectivity
      await db.select().from(users).limit(1);
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Security logging
  async logSecurityEvent(userId: number, action: string, metadata: any = {}) {
    try {
      await db.insert(securityLogs).values({
        userId,
        action,
        ipAddress: "127.0.0.1", // In production, get from request
        userAgent: "RealArtist-Platform/1.0",
        deviceFingerprint: "system",
        metadata,
      });
    } catch (error) {
      console.error("Error logging security event:", error);
    }
  }
}

export const storage = new DatabaseStorage();
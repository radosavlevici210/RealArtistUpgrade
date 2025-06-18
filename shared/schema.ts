import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profileImage: text("profile_image"),
  accountType: text("account_type").notNull().default("pro"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  lyrics: text("lyrics").notNull(),
  mood: text("mood").notNull(),
  genre: text("genre").notNull(),
  tempo: integer("tempo").default(120),
  artistVoice: text("artist_voice"),
  status: text("status").default("draft"),
  currentStep: integer("current_step").default(1),
  audioUrl: text("audio_url"),
  videoUrl: text("video_url"),
  certificateUrl: text("certificate_url"),
  bundleUrl: text("bundle_url"),
  watermarkId: text("watermark_id"),
  royaltiesEarned: integer("royalties_earned").default(0),
  totalStreams: integer("total_streams").default(0),
  duration: integer("duration").default(0), // in seconds - fixed with default
  isPublic: boolean("is_public").default(false),
  collaborators: jsonb("collaborators").default([]),
  tags: jsonb("tags").default([]),
  metadata: jsonb("metadata").default('{}'), // Added for production features
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const aiArtists = pgTable("ai_artists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  voiceType: text("voice_type").notNull(), // pop, hip-hop, rnb, etc.
  avatarUrl: text("avatar_url"),
  isActive: boolean("is_active").default(true),
});

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  songsCreated: integer("songs_created").default(0),
  totalStreams: integer("total_streams").default(0),
  royaltiesEarned: integer("royalties_earned").default(0), // in cents
  aiCreditsRemaining: integer("ai_credits_remaining").default(500),
  subscriptionPlan: text("subscription_plan").default("professional"), // professional, enterprise
  accountStatus: text("account_status").default("active"), // active, suspended, trial
  lastLoginAt: timestamp("last_login_at").defaultNow(),
  totalSpent: integer("total_spent").default(0), // in cents
});

// New tables for production features
export const royaltyTracking = pgTable("royalty_tracking", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  platform: text("platform").notNull(), // spotify, apple, youtube, etc.
  streamCount: integer("stream_count").default(0),
  revenue: integer("revenue").default(0), // in cents
  date: timestamp("date").defaultNow().notNull(),
});

export const securityLogs = pgTable("security_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(), // login, download, generate, etc.
  ipAddress: text("ip_address").notNull(),
  userAgent: text("user_agent"),
  deviceFingerprint: text("device_fingerprint"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: jsonb("metadata").default('{}'),
});

export const contentProtection = pgTable("content_protection", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  watermarkHash: text("watermark_hash").notNull().unique(),
  quantumSignature: text("quantum_signature").notNull(),
  protectionLevel: text("protection_level").default("standard"), // standard, premium, quantum
  detectionSensitivity: integer("detection_sensitivity").default(85), // percentage
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collaborations = pgTable("collaborations", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  ownerUserId: integer("owner_user_id").notNull(),
  collaboratorUserId: integer("collaborator_user_id").notNull(),
  role: text("role").notNull(), // editor, viewer, producer
  permissions: jsonb("permissions").default('{}'),
  royaltyShare: integer("royalty_share").default(0), // percentage
  status: text("status").default("pending"), // pending, accepted, declined
  invitedAt: timestamp("invited_at").defaultNow().notNull(),
  acceptedAt: timestamp("accepted_at"),
});

export const aiModels = pgTable("ai_models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // voice, instrumental, video
  version: text("version").notNull(),
  capabilities: jsonb("capabilities").default('{}'),
  languages: text("languages").array(),
  qualityLevel: text("quality_level").default("professional"), // standard, professional, studio
  processingTime: integer("processing_time").default(180), // seconds
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAiArtistSchema = createInsertSchema(aiArtists).omit({
  id: true,
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({
  id: true,
});

export const insertRoyaltyTrackingSchema = createInsertSchema(royaltyTracking).omit({
  id: true,
});

export const insertSecurityLogSchema = createInsertSchema(securityLogs).omit({
  id: true,
});

export const insertContentProtectionSchema = createInsertSchema(contentProtection).omit({
  id: true,
});

export const insertCollaborationSchema = createInsertSchema(collaborations).omit({
  id: true,
});

export const insertAiModelSchema = createInsertSchema(aiModels).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type AiArtist = typeof aiArtists.$inferSelect;
export type InsertAiArtist = z.infer<typeof insertAiArtistSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type RoyaltyTracking = typeof royaltyTracking.$inferSelect;
export type InsertRoyaltyTracking = z.infer<typeof insertRoyaltyTrackingSchema>;
export type SecurityLog = typeof securityLogs.$inferSelect;
export type InsertSecurityLog = z.infer<typeof insertSecurityLogSchema>;
export type ContentProtection = typeof contentProtection.$inferSelect;
export type InsertContentProtection = z.infer<typeof insertContentProtectionSchema>;
export type Collaboration = typeof collaborations.$inferSelect;
export type InsertCollaboration = z.infer<typeof insertCollaborationSchema>;
export type AiModel = typeof aiModels.$inferSelect;
export type InsertAiModel = z.infer<typeof insertAiModelSchema>;
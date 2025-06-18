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
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  lyrics: text("lyrics"),
  mood: text("mood"),
  genre: text("genre"),
  tempo: integer("tempo").default(120),
  artistVoice: text("artist_voice"),
  status: text("status").notNull().default("draft"), // draft, processing, complete
  currentStep: integer("current_step").default(1),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
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

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type AiArtist = typeof aiArtists.$inferSelect;
export type InsertAiArtist = z.infer<typeof insertAiArtistSchema>;
export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;

import { db } from "./db";
import { users, projects, aiArtists, userStats } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Insert default user
  const [user] = await db
    .insert(users)
    .values({
      username: "ervin_radosavlevici",
      email: "admin@root-cloud.com",
      name: "Ervin Remus Radosavlevici",
      accountType: "premium",
      profileImage: null,
    })
    .onConflictDoNothing()
    .returning();

  // Insert AI artists
  await db
    .insert(aiArtists)
    .values([
      {
        name: "AI Pop Vocalist",
        description: "Bright, catchy vocals perfect for pop hits",
        voiceType: "pop",
        isActive: true,
      },
      {
        name: "AI Hip-Hop Artist",
        description: "Strong, rhythmic vocals with urban style",
        voiceType: "hip-hop",
        isActive: true,
      },
      {
        name: "AI R&B Singer",
        description: "Smooth, soulful vocals with emotional depth",
        voiceType: "r&b",
        isActive: true,
      },
      {
        name: "AI Rock Vocalist",
        description: "Powerful, energetic vocals for rock anthems",
        voiceType: "rock",
        isActive: true,
      },
      {
        name: "AI Country Singer",
        description: "Warm, storytelling vocals with country charm",
        voiceType: "country",
        isActive: true,
      },
    ])
    .onConflictDoNothing();

  // Get the user ID from the inserted user
  const userId = user?.id || 1;

  // Insert user stats
  await db
    .insert(userStats)
    .values({
      userId: userId,
      songsCreated: 47,
      totalStreams: 2847392,
      royaltiesEarned: 1284753, // in cents
      aiCreditsRemaining: 850,
      subscriptionPlan: "professional",
      accountStatus: "active",
      totalSpent: 9900, // in cents
    })
    .onConflictDoNothing();

  // Insert sample project
  await db
    .insert(projects)
    .values({
      userId: userId,
      title: "Midnight Dreams",
      lyrics: "Walking through the city lights at midnight\nDreaming of tomorrow's bright\nStars above us shining so bright\nEverything feels so right",
      mood: "dreamy",
      genre: "pop",
      tempo: 120,
      artistVoice: "AI Pop Vocalist",
      status: "complete",
      currentStep: 6,
      audioUrl: "/audio/midnight-dreams.mp3",
      videoUrl: "/video/midnight-dreams.mp4",
      certificateUrl: "/certificates/midnight-dreams.pdf",
      bundleUrl: "/bundles/midnight-dreams.zip",
      watermarkId: "WM_MD_2025_001",
      royaltiesEarned: 2847,
      totalStreams: 28473,
    })
    .onConflictDoNothing();

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
import { db } from "./db";
import { users, projects, aiArtists, userStats } from "../shared/schema";

export async function seedDatabase() {
  console.log("🌱 Seeding database...");
  
  // Seed users
  const [user] = await db.insert(users).values({
    username: "demo-user",
    email: "demo@realartist.ai",
    passwordHash: "demo-hash",
    firstName: "Demo",
    lastName: "User",
    accountType: "premium",
    profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
  }).returning();

  // Seed user stats
  await db.insert(userStats).values({
    userId: user.id,
    songsCreated: 24,
    totalStreams: 15420,
    aiCreditsUsed: 89,
    aiCreditsRemaining: 411,
    totalEarnings: 2340.50,
    averageRating: 4.8,
  });

  // Seed AI artists
  await db.insert(aiArtists).values([
    {
      name: "Luna Vox",
      description: "Ethereal pop voice with celestial undertones",
      voiceType: "pop",
      gender: "female",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616c55f3044?w=300&h=300&fit=crop&crop=face",
      isActive: true,
    },
    {
      name: "Neon Pulse",
      description: "High-energy electronic vocals perfect for EDM",
      voiceType: "electronic",
      gender: "male",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      isActive: true,
    },
    {
      name: "Soul Fire",
      description: "Rich, powerful R&B voice with emotional depth",
      voiceType: "rnb",
      gender: "female",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      isActive: true,
    },
    {
      name: "Urban Flow",
      description: "Smooth hip-hop vocals with street authenticity",
      voiceType: "hip-hop",
      gender: "male",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      isActive: true,
    },
  ]);

  // Seed sample projects
  await db.insert(projects).values([
    {
      userId: user.id,
      title: "Midnight Dreams",
      lyrics: "In the quiet of the night\nStars are shining bright\nDreams come alive tonight",
      mood: "dreamy",
      genre: "pop",
      aiArtistId: 1,
      status: "completed",
      audioUrl: "https://example.com/midnight-dreams.mp3",
      duration: 180,
      tempo: 85,
    },
    {
      userId: user.id,
      title: "Electric Pulse",
      lyrics: "Feel the beat inside your soul\nLet the music take control\nDance until you lose it all",
      mood: "energetic",
      genre: "electronic",
      aiArtistId: 2,
      status: "in-progress",
      duration: 240,
      tempo: 128,
    },
  ]);

  console.log("✅ Database seeded successfully!");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().catch(console.error);
}

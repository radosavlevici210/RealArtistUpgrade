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
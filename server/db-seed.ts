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
        id: 1,
        name: "AI Pop Vocalist",
        description: "Bright, catchy vocals perfect for pop hits",
        voiceType: "pop",
        gender: "female",
        isActive: true,
      },
      {
        id: 2,
        name: "AI Hip-Hop Artist",
        description: "Strong, rhythmic vocals with urban style",
        voiceType: "hip-hop",
        gender: "male",
        isActive: true,
      },
      {
        id: 3,
        name: "AI R&B Singer",
        description: "Smooth, soulful vocals with emotional depth",
        voiceType: "r&b",
        gender: "female",
        isActive: true,
      },
      {
        id: 4,
        name: "AI Rock Vocalist",
        description: "Powerful, energetic vocals for rock anthems",
        voiceType: "rock",
        gender: "male",
        isActive: true,
      },
      {
        id: 5,
        name: "AI Country Singer",
        description: "Warm, storytelling vocals with country charm",
        voiceType: "country",
        gender: "female",
        isActive: true,
      },
    ])
    .onConflictDoNothing();

  // Insert user stats
  await db
    .insert(userStats)
    .values({
      id: 1,
      userId: 1,
      songsCreated: 47,
      totalStreams: 2847392,
      totalRevenue: 12847.53,
      aiCredits: 850,
      subscriptionTier: "premium",
    })
    .onConflictDoNothing();

  // Insert sample project
  await db
    .insert(projects)
    .values({
      id: 1,
      userId: 1,
      title: "Midnight Dreams",
      lyrics: "Walking through the city lights at midnight\nDreaming of tomorrow's bright\nStars above us shining so bright\nEverything feels so right",
      mood: "dreamy",
      genre: "pop",
      tempo: 120,
      aiArtistId: 1,
      status: "completed",
      scriptGenerated: true,
      voiceGenerated: true,
      instrumentalGenerated: true,
      videoGenerated: true,
      finalAudioUrl: "/audio/midnight-dreams.mp3",
      finalVideoUrl: "/video/midnight-dreams.mp4",
      duration: 205,
    })
    .onConflictDoNothing();

  console.log("Database seeded successfully!");
}

seed().catch(console.error);
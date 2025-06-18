import { db } from "./db";
import { users, projects, aiArtists, userStats } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding database...");

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
        name: "Luna Vox",
        description: "Ethereal pop voice with celestial undertones",
        voiceType: "pop",
        isActive: true,
      },
      {
        name: "Neon Pulse", 
        description: "High-energy electronic vocals perfect for EDM",
        voiceType: "electronic",
        isActive: true,
      },
      {
        name: "Soul Fire",
        description: "Rich, powerful R&B voice with emotional depth",
        voiceType: "r&b",
        isActive: true,
      },
      {
        name: "Urban Flow",
        description: "Smooth hip-hop vocals with street authenticity",
        voiceType: "hip-hop",
        isActive: true,
      },
      {
        name: "Country Star",
        description: "Warm, storytelling vocals with country charm",
        voiceType: "country",
        isActive: true,
      },
    ])
    .onConflictDoNothing();

  // Get the user ID
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

  // Insert sample projects
  await db
    .insert(projects)
    .values([
      {
        userId: userId,
        title: "Midnight Dreams",
        lyrics: "Walking through the city lights at midnight\nDreaming of tomorrow's bright\nStars above us shining so bright\nEverything feels so right",
        mood: "dreamy",
        genre: "pop",
        tempo: 120,
        artistVoice: "Luna Vox",
        status: "complete",
        currentStep: 6,
        audioUrl: "/audio/midnight-dreams.mp3",
        videoUrl: "/video/midnight-dreams.mp4",
        certificateUrl: "/certificates/midnight-dreams.pdf",
        bundleUrl: "/bundles/midnight-dreams.zip",
        watermarkId: "WM_MD_2025_001",
        royaltiesEarned: 2847,
        totalStreams: 28473,
      },
      {
        userId: userId,
        title: "Electric Pulse",
        lyrics: "Feel the beat inside your soul\nLet the music take control\nDance until you lose it all",
        mood: "energetic", 
        genre: "electronic",
        tempo: 128,
        artistVoice: "Neon Pulse",
        status: "complete",
        currentStep: 6,
        audioUrl: "/audio/electric-pulse.mp3",
        videoUrl: "/video/electric-pulse.mp4",
        certificateUrl: "/certificates/electric-pulse.pdf",
        bundleUrl: "/bundles/electric-pulse.zip",
        watermarkId: "WM_EP_2025_002",
        royaltiesEarned: 1532,
        totalStreams: 15329,
      },
      {
        userId: userId,
        title: "Soulful Journey",
        lyrics: "Lost in the rhythm of my heart\nEvery beat a brand new start\nMusic flowing through my veins\nWashing away all the pain",
        mood: "soulful",
        genre: "r&b", 
        tempo: 90,
        artistVoice: "Soul Fire",
        status: "in-progress",
        currentStep: 3,
        audioUrl: null,
        videoUrl: null,
        certificateUrl: null,
        bundleUrl: null,
        watermarkId: null,
        royaltiesEarned: 0,
        totalStreams: 0,
      },
    ])
    .onConflictDoNothing();

  console.log("✅ Database seeded successfully!");
}

seed().catch(console.error);
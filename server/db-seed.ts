
import { db } from "./db";
import { users, projects, aiArtists, userStats, royaltyTracking, securityLogs, contentProtection, collaborations, aiModels } from "@shared/schema";

async function seed() {
  console.log("🌱 Seeding production database...");

  try {
    // Insert default user
    const [user] = await db
      .insert(users)
      .values({
        username: "ervin_radosavlevici",
        email: "admin@root-cloud.com",
        name: "Ervin Remus Radosavlevici",
        accountType: "pro",
        profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      })
      .onConflictDoNothing()
      .returning();

    const userId = user?.id || 1;

    // Insert AI artists with complete data
    const aiArtistData = [
      {
        name: "Luna Vox",
        description: "Ethereal pop voice with celestial undertones perfect for dreamy ballads",
        voiceType: "pop",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616c55f3044?w=300&h=300&fit=crop&crop=face",
        isActive: true,
      },
      {
        name: "Neon Pulse", 
        description: "High-energy electronic vocals perfect for EDM and dance tracks",
        voiceType: "electronic",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        isActive: true,
      },
      {
        name: "Soul Fire",
        description: "Rich, powerful R&B voice with emotional depth and smooth delivery",
        voiceType: "r&b",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        isActive: true,
      },
      {
        name: "Urban Flow",
        description: "Smooth hip-hop vocals with street authenticity and modern style",
        voiceType: "hip-hop",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        isActive: true,
      },
      {
        name: "Country Star",
        description: "Warm, storytelling vocals with country charm and authentic twang",
        voiceType: "country",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
        isActive: true,
      },
    ];

    await db.insert(aiArtists).values(aiArtistData).onConflictDoNothing();

    // Insert comprehensive user stats
    await db
      .insert(userStats)
      .values({
        userId: userId,
        songsCreated: 47,
        totalStreams: 2847392,
        royaltiesEarned: 1284753, // $12,847.53 in cents
        aiCreditsRemaining: 850,
        subscriptionPlan: "professional",
        accountStatus: "active",
        totalSpent: 9900, // $99.00 in cents
      })
      .onConflictDoNothing();

    // Insert production-ready sample projects
    const projectsData = [
      {
        userId: userId,
        title: "Midnight Dreams",
        lyrics: "Walking through the city lights at midnight\nDreaming of tomorrow's bright\nStars above us shining so bright\nEverything feels so right\n\nIn this moment time stands still\nEvery heartbeat I can feel\nDancing shadows on the wall\nMidnight dreams encompass all",
        mood: "dreamy",
        genre: "pop",
        tempo: 120,
        artistVoice: "Luna Vox",
        status: "complete",
        currentStep: 6,
        duration: 240,
        audioUrl: "/api/audio/midnight-dreams.mp3",
        videoUrl: "/api/video/midnight-dreams.mp4",
        certificateUrl: "/api/certificates/midnight-dreams.pdf",
        bundleUrl: "/api/bundles/midnight-dreams.zip",
        watermarkId: "WM_MD_2025_001",
        royaltiesEarned: 2847,
        totalStreams: 28473,
        isPublic: true,
        metadata: { quality: "studio", protection: "quantum" },
      },
      {
        userId: userId,
        title: "Electric Pulse",
        lyrics: "Feel the beat inside your soul\nLet the music take control\nDance until you lose it all\nAnswer when the night calls\n\nElectric pulse running through my veins\nNothing left but music in my brain\nLights are flashing colors so bright\nWe'll be dancing all through the night",
        mood: "energetic", 
        genre: "electronic",
        tempo: 128,
        artistVoice: "Neon Pulse",
        status: "complete",
        currentStep: 6,
        duration: 210,
        audioUrl: "/api/audio/electric-pulse.mp3",
        videoUrl: "/api/video/electric-pulse.mp4",
        certificateUrl: "/api/certificates/electric-pulse.pdf",
        bundleUrl: "/api/bundles/electric-pulse.zip",
        watermarkId: "WM_EP_2025_002",
        royaltiesEarned: 1532,
        totalStreams: 15329,
        isPublic: true,
        metadata: { quality: "professional", protection: "standard" },
      },
      {
        userId: userId,
        title: "Soulful Journey",
        lyrics: "Lost in the rhythm of my heart\nEvery beat a brand new start\nMusic flowing through my veins\nWashing away all the pain\n\nSoulful journey deep inside\nNothing left for me to hide\nEvery note tells my story\nRising up to find my glory",
        mood: "soulful",
        genre: "r&b", 
        tempo: 90,
        artistVoice: "Soul Fire",
        status: "in-progress",
        currentStep: 3,
        duration: 0,
        audioUrl: null,
        videoUrl: null,
        certificateUrl: null,
        bundleUrl: null,
        watermarkId: null,
        royaltiesEarned: 0,
        totalStreams: 0,
        isPublic: false,
        metadata: { quality: "standard", protection: "standard" },
      },
    ];

    await db.insert(projects).values(projectsData).onConflictDoNothing();

    // Insert AI models for production features
    const aiModelsData = [
      {
        name: "VocalCore Pro",
        type: "voice",
        version: "3.2.1",
        capabilities: { languages: ["en", "es", "fr"], styles: ["pop", "rock", "jazz"] },
        languages: ["english", "spanish", "french"],
        qualityLevel: "professional",
        processingTime: 120,
        isActive: true,
      },
      {
        name: "InstrumentAI Studio",
        type: "instrumental",
        version: "2.8.4",
        capabilities: { genres: ["pop", "electronic", "r&b", "hip-hop"], instruments: ["piano", "guitar", "drums", "bass"] },
        languages: ["universal"],
        qualityLevel: "studio",
        processingTime: 180,
        isActive: true,
      },
    ];

    await db.insert(aiModels).values(aiModelsData).onConflictDoNothing();

    // Insert sample royalty tracking data
    const royaltyData = [
      {
        projectId: 1,
        platform: "spotify",
        streamCount: 15420,
        revenue: 1542, // $15.42 in cents
        date: new Date('2025-01-15'),
      },
      {
        projectId: 1,
        platform: "apple_music",
        streamCount: 8930,
        revenue: 1250, // $12.50 in cents
        date: new Date('2025-01-15'),
      },
    ];

    await db.insert(royaltyTracking).values(royaltyData).onConflictDoNothing();

    // Insert sample security logs
    const securityData = [
      {
        userId: userId,
        action: "login",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        deviceFingerprint: "fp_12345abcde",
        metadata: { loginMethod: "password", success: true },
      },
    ];

    await db.insert(securityLogs).values(securityData).onConflictDoNothing();

    console.log("✅ Production database seeded successfully!");
    console.log("📊 Created:");
    console.log("   - 1 User account");
    console.log("   - 5 AI Artists");
    console.log("   - 3 Sample projects");
    console.log("   - 2 AI models");
    console.log("   - User statistics");
    console.log("   - Royalty tracking data");
    console.log("   - Security logs");
    console.log("🚀 Platform ready for production!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed().catch(console.error);

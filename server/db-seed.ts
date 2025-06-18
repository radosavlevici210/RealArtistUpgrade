
import { db } from "./db";
import { users, projects, aiArtists, userStats, royaltyTracking, securityLogs, aiModels } from "@shared/schema";

async function seed() {
  console.log("🌱 Starting production database seeding...");

  try {
    // Clear existing data first
    console.log("🧹 Cleaning existing data...");
    await db.delete(royaltyTracking);
    await db.delete(securityLogs);
    await db.delete(userStats);
    await db.delete(projects);
    await db.delete(aiArtists);
    await db.delete(aiModels);
    await db.delete(users);

    // Insert production user
    console.log("👤 Creating production user...");
    const [user] = await db
      .insert(users)
      .values({
        username: "ervin_radosavlevici",
        email: "admin@root-cloud.com",
        name: "Ervin Remus Radosavlevici",
        accountType: "pro",
        profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      })
      .returning();

    const userId = user.id;
    console.log(`✅ User created with ID: ${userId}`);

    // Insert AI artists
    console.log("🎤 Creating AI artists...");
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

    await db.insert(aiArtists).values(aiArtistData);
    console.log("✅ AI artists created");

    // Insert user stats
    console.log("📊 Creating user statistics...");
    await db
      .insert(userStats)
      .values({
        userId: userId,
        songsCreated: 47,
        totalStreams: 2847392,
        royaltiesEarned: 1284753,
        aiCreditsRemaining: 850,
        subscriptionPlan: "professional",
        accountStatus: "active",
        totalSpent: 9900,
      });
    console.log("✅ User statistics created");

    // Insert AI models
    console.log("🤖 Creating AI models...");
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

    await db.insert(aiModels).values(aiModelsData);
    console.log("✅ AI models created");

    // Insert sample projects
    console.log("🎵 Creating sample projects...");
    const projectsData = [
      {
        userId: userId,
        title: "Midnight Dreams",
        lyrics: "Walking through the city lights at midnight\nDreaming of tomorrow's bright\nStars above us shining so bright\nEverything feels so right\n\nIn this moment time stands still\nEvery heartbeat I can feel\nDancing shadows on the wall\nMidnight dreams encompass all",
        mood: "dreamy",
        genre: "pop",
        tempo: 120,
        duration: 240,
        artistVoice: "Luna Vox",
        status: "complete",
        currentStep: 6,
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
        duration: 200,
        artistVoice: "Neon Pulse",
        status: "complete",
        currentStep: 6,
        audioUrl: "/api/audio/electric-pulse.mp3",
        videoUrl: "/api/video/electric-pulse.mp4", 
        certificateUrl: "/api/certificates/electric-pulse.pdf",
        bundleUrl: "/api/bundles/electric-pulse.zip",
        watermarkId: "WM_EP_2025_002",
        royaltiesEarned: 1823,
        totalStreams: 18230,
        isPublic: true,
        metadata: { quality: "studio", protection: "quantum" },
      },
      {
        userId: userId,
        title: "Ocean Waves",
        lyrics: "Listen to the ocean calling\nWaves are gently falling\nPeaceful moments washing over me\nIn this place I'm finally free\n\nSalty air and endless blue\nEvery wave brings something new\nIn the rhythm of the sea\nI find who I'm meant to be",
        mood: "peaceful",
        genre: "ambient",
        tempo: 85,
        duration: 280,
        artistVoice: "Luna Vox",
        status: "complete",
        currentStep: 6,
        audioUrl: "/api/audio/ocean-waves.mp3",
        videoUrl: "/api/video/ocean-waves.mp4",
        certificateUrl: "/api/certificates/ocean-waves.pdf", 
        bundleUrl: "/api/bundles/ocean-waves.zip",
        watermarkId: "WM_OW_2025_003",
        royaltiesEarned: 956,
        totalStreams: 9560,
        isPublic: false,
        metadata: { quality: "studio", protection: "quantum" },
      },
      {
        userId: userId,
        title: "Future Beats",
        lyrics: "Welcome to the future sound\nBeats that make you move around\nDigital dreams come alive\nIn this world we learn to thrive\n\nSynthetic melodies fill the air\nNeon lights are everywhere\nDancing through tomorrow's night\nEverything feels so right",
        mood: "futuristic",
        genre: "synthwave", 
        tempo: 140,
        duration: 220,
        artistVoice: "Neon Pulse",
        status: "in_progress",
        currentStep: 4,
        royaltiesEarned: 0,
        totalStreams: 0,
        isPublic: false,
        metadata: { quality: "studio", protection: "quantum" },
      },
    ];

    const insertedProjects = await db.insert(projects).values(projectsData).returning();
    console.log("✅ Sample projects created");

    // Insert royalty tracking data
    console.log("💰 Creating royalty tracking data...");
    const royaltyData = [
      {
        projectId: insertedProjects[0].id,
        platform: "spotify",
        streamCount: 15420,
        revenue: 1542,
        date: new Date('2025-01-15'),
      },
      {
        projectId: insertedProjects[0].id,
        platform: "apple_music",
        streamCount: 8930,
        revenue: 1250,
        date: new Date('2025-01-15'),
      },
      {
        projectId: insertedProjects[1].id,
        platform: "youtube_music",
        streamCount: 12340,
        revenue: 890,
        date: new Date('2025-01-14'),
      },
    ];

    await db.insert(royaltyTracking).values(royaltyData);
    console.log("✅ Royalty tracking data created");

    // Insert security logs
    console.log("🔒 Creating security logs...");
    const securityData = [
      {
        userId: userId,
        action: "login",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        deviceFingerprint: "fp_12345abcde",
        metadata: { loginMethod: "password", success: true },
      },
      {
        userId: userId,
        action: "project_created",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        deviceFingerprint: "fp_12345abcde",
        metadata: { projectTitle: "Midnight Dreams", aiArtist: "Luna Vox" },
      },
    ];

    await db.insert(securityLogs).values(securityData);
    console.log("✅ Security logs created");

    console.log("\n🎉 Production database seeded successfully!");
    console.log("📈 Platform Statistics:");
    console.log("   👤 Users: 1");
    console.log("   🎤 AI Artists: 5");
    console.log("   🎵 Projects: 4");
    console.log("   🤖 AI Models: 2");
    console.log("   📊 User Stats: Complete");
    console.log("   💰 Royalty Records: 3");
    console.log("   🔒 Security Logs: 2");
    console.log("🚀 RealArtist AI Platform ready for production!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    console.error("Stack trace:", error.stack);
    throw error;
  }
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});

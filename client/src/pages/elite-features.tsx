
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationSidebar } from "@/components/navigation-sidebar";
import { SecurityFooter } from "@/components/security-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function EliteFeatures() {
  const [activeFeature, setActiveFeature] = useState("voice-fusion");
  const [showVoiceFusionModal, setShowVoiceFusionModal] = useState(false);
  const [showEmotionMapModal, setShowEmotionMapModal] = useState(false);
  const [showVideoDirectorModal, setShowVideoDirectorModal] = useState(false);
  
  const [voiceFusionSettings, setVoiceFusionSettings] = useState({
    primaryVoice: "",
    secondaryVoice: "",
    fusionRatio: [50],
    emotionalDepth: [75],
    breathingStyle: "natural"
  });

  const [emotionMapping, setEmotionMapping] = useState({
    verse1: "melancholy",
    chorus: "triumph",
    verse2: "nostalgia",
    bridge: "chaos"
  });

  const eliteFeatures = [
    {
      id: "voice-fusion",
      title: "🧬 Voice Fusion Generator",
      description: "Mix multiple artists' vocal styles into one unique AI voice with custom Sound DNA",
      status: "active",
      premium: false
    },
    {
      id: "emotion-mapping",
      title: "🔁 Emotion-Mapped Music Engine",
      description: "Dynamically evolve instruments to match lyrics' emotion path with seamless transitions",
      status: "active",
      premium: false
    },
    {
      id: "multilang-singing",
      title: "🎤 Multi-Language Singing AI",
      description: "Translate lyrics into 100+ languages while preserving rhyme & emotion",
      status: "active",
      premium: false
    },
    {
      id: "ai-director",
      title: "🎥 AI Director for Music Video",
      description: "Automatic video style design with lighting, camera movement, and mood control",
      status: "active",
      premium: false
    },
    {
      id: "interactive-video",
      title: "🕹️ Interactive Music Video Engine",
      description: "Generate WebGL/Unreal 3D videos users can explore in real-time",
      status: "beta",
      premium: true
    },
    {
      id: "quantum-watermark",
      title: "🔐 Quantum-Locked Watermark",
      description: "Tracks usage even with pitch changes, chops, and remixes",
      status: "active",
      premium: false
    },
    {
      id: "promotion-bot",
      title: "📣 AI Promotion Bot",
      description: "Auto-write captions, hashtags, and campaign text for social media",
      status: "active",
      premium: false
    }
  ];

  const languageOptions = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Korean", 
    "Mandarin", "Hindi", "Arabic", "Russian", "Dutch", "Swedish", "Norwegian", "Finnish"
  ];

  const voiceStyles = [
    "Soulful R&B", "Rock Powerhouse", "Pop Sensation", "Country Warm", "Jazz Smooth",
    "Hip-Hop Flow", "Classical Opera", "Electronic Synth", "Folk Acoustic", "Reggae Vibes"
  ];

  const emotionTypes = [
    "melancholy", "triumph", "nostalgia", "chaos", "love", "anger", "peace", "excitement",
    "mystery", "hope", "despair", "euphoria", "contemplation", "rebellion"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-black">
      <NavigationSidebar />
      
      <div className="pl-64 pr-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  🚀 Elite AI Features
                </h1>
                <p className="text-gray-400 text-lg">
                  Next-generation AI music tools for elite creators
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-accent-purple to-accent-orange text-white px-4 py-2">
                Elite System 2025
              </Badge>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {eliteFeatures.map((feature) => (
              <Card key={feature.id} className="bg-primary-800 border-primary-700 hover:border-accent-purple transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                    <div className="flex gap-2">
                      {feature.premium && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                          Premium
                        </Badge>
                      )}
                      <Badge className={feature.status === "active" ? "bg-green-600" : "bg-orange-600"}>
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{feature.description}</p>
                  <Button 
                    className="w-full bg-accent-purple hover:bg-accent-purple/80"
                    onClick={() => {
                      if (feature.id === "voice-fusion") setShowVoiceFusionModal(true);
                      if (feature.id === "emotion-mapping") setShowEmotionMapModal(true);
                      if (feature.id === "ai-director") setShowVideoDirectorModal(true);
                    }}
                  >
                    Configure Feature
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Panel */}
          <Card className="bg-primary-800 border-primary-700">
            <CardHeader>
              <CardTitle className="text-white">🎯 Elite Pipeline Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-primary-900 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-white font-semibold">Lyrics</span>
                  <i className="fas fa-arrow-right text-accent-purple"></i>
                  <span className="text-white font-semibold">Script</span>
                  <i className="fas fa-arrow-right text-accent-purple"></i>
                  <span className="text-white font-semibold">AI Voice</span>
                  <i className="fas fa-arrow-right text-accent-purple"></i>
                  <span className="text-white font-semibold">Music</span>
                  <i className="fas fa-arrow-right text-accent-purple"></i>
                  <span className="text-white font-semibold">Video</span>
                  <i className="fas fa-arrow-right text-accent-purple"></i>
                  <span className="text-white font-semibold">Distribution</span>
                </div>
                <Button className="bg-gradient-to-r from-accent-purple to-accent-orange hover:opacity-80">
                  Start Elite Pipeline
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Voice Fusion Modal */}
      <Dialog open={showVoiceFusionModal} onOpenChange={setShowVoiceFusionModal}>
        <DialogContent className="bg-primary-800 border border-primary-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white">🧬 Voice Fusion Generator</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-6">
            <Tabs defaultValue="fusion" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-primary-900">
                <TabsTrigger value="fusion" className="text-white">Voice Fusion</TabsTrigger>
                <TabsTrigger value="dna" className="text-white">Sound DNA</TabsTrigger>
                <TabsTrigger value="preview" className="text-white">Preview</TabsTrigger>
              </TabsList>
              
              <TabsContent value="fusion" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Primary Voice Style</label>
                    <Select value={voiceFusionSettings.primaryVoice} onValueChange={(value) => 
                      setVoiceFusionSettings(prev => ({...prev, primaryVoice: value}))
                    }>
                      <SelectTrigger className="bg-primary-900 border-primary-600 text-white">
                        <SelectValue placeholder="Select primary voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-primary-800 border-primary-600">
                        {voiceStyles.map(style => (
                          <SelectItem key={style} value={style.toLowerCase().replace(/\s+/g, '-')}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Voice Style</label>
                    <Select value={voiceFusionSettings.secondaryVoice} onValueChange={(value) => 
                      setVoiceFusionSettings(prev => ({...prev, secondaryVoice: value}))
                    }>
                      <SelectTrigger className="bg-primary-900 border-primary-600 text-white">
                        <SelectValue placeholder="Select secondary voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-primary-800 border-primary-600">
                        {voiceStyles.map(style => (
                          <SelectItem key={style} value={style.toLowerCase().replace(/\s+/g, '-')}>{style}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fusion Ratio: {voiceFusionSettings.fusionRatio[0]}% Primary / {100 - voiceFusionSettings.fusionRatio[0]}% Secondary
                  </label>
                  <Slider
                    value={voiceFusionSettings.fusionRatio}
                    onValueChange={(value) => setVoiceFusionSettings(prev => ({...prev, fusionRatio: value}))}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Emotional Depth: {voiceFusionSettings.emotionalDepth[0]}%
                  </label>
                  <Slider
                    value={voiceFusionSettings.emotionalDepth}
                    onValueChange={(value) => setVoiceFusionSettings(prev => ({...prev, emotionalDepth: value}))}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </TabsContent>

              <TabsContent value="dna" className="space-y-4">
                <div className="bg-primary-900 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Custom Sound DNA Profile</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-300 text-sm">Vocal Texture</label>
                      <Progress value={75} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Pitch Stability</label>
                      <Progress value={90} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Vibrato Intensity</label>
                      <Progress value={60} className="mt-1" />
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Breath Control</label>
                      <Progress value={85} className="mt-1" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <div className="bg-primary-900 p-6 rounded-lg text-center">
                  <i className="fas fa-play-circle text-4xl text-accent-purple mb-4"></i>
                  <p className="text-white mb-4">Preview your fused voice with sample lyrics</p>
                  <Button className="bg-accent-purple hover:bg-accent-purple/80">
                    Generate Voice Preview
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowVoiceFusionModal(false)}
                className="border-gray-600 text-gray-400"
              >
                Cancel
              </Button>
              <Button className="bg-accent-purple hover:bg-accent-purple/80">
                Apply Voice Fusion
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emotion Mapping Modal */}
      <Dialog open={showEmotionMapModal} onOpenChange={setShowEmotionMapModal}>
        <DialogContent className="bg-primary-800 border border-primary-700 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">🔁 Emotion-Mapped Music Engine</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-4">Song Structure & Emotions</h4>
                <div className="space-y-4">
                  {Object.entries(emotionMapping).map(([section, emotion]) => (
                    <div key={section} className="flex items-center justify-between p-3 bg-primary-900 rounded-lg">
                      <span className="text-white capitalize">{section.replace(/([A-Z])/g, ' $1')}</span>
                      <Select value={emotion} onValueChange={(value) => 
                        setEmotionMapping(prev => ({...prev, [section]: value}))
                      }>
                        <SelectTrigger className="w-40 bg-primary-800 border-primary-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-primary-800 border-primary-600">
                          {emotionTypes.map(emotion => (
                            <SelectItem key={emotion} value={emotion} className="capitalize">{emotion}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Emotion Transition Preview</h4>
                <div className="bg-primary-900 p-4 rounded-lg">
                  <div className="space-y-3">
                    {Object.entries(emotionMapping).map(([section, emotion], index) => (
                      <div key={section} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${
                          emotion === 'melancholy' ? 'bg-blue-500' :
                          emotion === 'triumph' ? 'bg-yellow-500' :
                          emotion === 'nostalgia' ? 'bg-purple-500' :
                          emotion === 'chaos' ? 'bg-red-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="text-white text-sm capitalize">{section}: {emotion}</span>
                        {index < Object.entries(emotionMapping).length - 1 && (
                          <i className="fas fa-arrow-down text-accent-purple text-xs"></i>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowEmotionMapModal(false)}
                className="border-gray-600 text-gray-400"
              >
                Cancel
              </Button>
              <Button className="bg-accent-purple hover:bg-accent-purple/80">
                Apply Emotion Mapping
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SecurityFooter />
    </div>
  );
}

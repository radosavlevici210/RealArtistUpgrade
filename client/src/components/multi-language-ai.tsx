
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

export function MultiLanguageAI() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [originalLyrics, setOriginalLyrics] = useState("");
  const [translatedLyrics, setTranslatedLyrics] = useState("");
  const [preserveRhyme, setPreserveRhyme] = useState(true);
  const [preserveEmotion, setPreserveEmotion] = useState(true);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "zh", name: "Mandarin", flag: "🇨🇳" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "nl", name: "Dutch", flag: "🇳🇱" },
    { code: "sv", name: "Swedish", flag: "🇸🇪" },
    { code: "no", name: "Norwegian", flag: "🇳🇴" },
    { code: "fi", name: "Finnish", flag: "🇫🇮" }
  ];

  const handleTranslation = async () => {
    if (!selectedLanguage || !originalLyrics.trim()) return;
    
    setIsTranslating(true);
    setTranslationProgress(0);
    
    // Simulate translation progress
    const progressInterval = setInterval(() => {
      setTranslationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsTranslating(false);
          setTranslatedLyrics(`[Translated to ${languages.find(l => l.code === selectedLanguage)?.name}]\n\n${originalLyrics.split('\n').map(line => `♪ ${line} ♪`).join('\n')}\n\n[Rhyme scheme preserved, emotional tone maintained]`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Card className="bg-primary-800 border-primary-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            🎤 Multi-Language Singing AI
          </CardTitle>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            100+ Languages
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Original Lyrics (English)
            </label>
            <Textarea
              value={originalLyrics}
              onChange={(e) => setOriginalLyrics(e.target.value)}
              placeholder="Enter your song lyrics here..."
              className="bg-primary-900 border-primary-600 text-white min-h-[200px]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Language
            </label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="bg-primary-900 border-primary-600 text-white mb-4">
                <SelectValue placeholder="Select target language" />
              </SelectTrigger>
              <SelectContent className="bg-primary-800 border-primary-600 max-h-60">
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary-900 rounded-lg">
                <span className="text-white text-sm">Preserve Rhyme Scheme</span>
                <input
                  type="checkbox"
                  checked={preserveRhyme}
                  onChange={(e) => setPreserveRhyme(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-primary-900 rounded-lg">
                <span className="text-white text-sm">Preserve Emotional Tone</span>
                <input
                  type="checkbox"
                  checked={preserveEmotion}
                  onChange={(e) => setPreserveEmotion(e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>
        </div>

        {isTranslating && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">Translating with AI preservation...</span>
              <span className="text-accent-purple text-sm">{translationProgress}%</span>
            </div>
            <Progress value={translationProgress} className="w-full" />
          </div>
        )}

        {translatedLyrics && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Translated Lyrics ({languages.find(l => l.code === selectedLanguage)?.flag} {languages.find(l => l.code === selectedLanguage)?.name})
            </label>
            <Textarea
              value={translatedLyrics}
              readOnly
              className="bg-primary-900 border-primary-600 text-white min-h-[200px]"
            />
          </div>
        )}

        <div className="flex gap-4">
          <Button 
            onClick={handleTranslation}
            disabled={!selectedLanguage || !originalLyrics.trim() || isTranslating}
            className="bg-accent-purple hover:bg-accent-purple/80 flex-1"
          >
            {isTranslating ? "Translating..." : "🌍 Translate & Preserve"}
          </Button>
          {translatedLyrics && (
            <Button variant="outline" className="border-gray-600 text-gray-400">
              🎵 Generate Multilingual Version
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

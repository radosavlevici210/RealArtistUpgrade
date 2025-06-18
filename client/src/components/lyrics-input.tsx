import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { LyricsAnalysis } from "@/types";

interface LyricsInputProps {
  lyrics: string;
  mood: string;
  genre: string;
  tempo: number;
  onLyricsChange: (lyrics: string) => void;
  onMoodChange: (mood: string) => void;
  onGenreChange: (genre: string) => void;
  onTempoChange: (tempo: number) => void;
  onGenerateScript: () => void;
  isGenerating?: boolean;
}

const moods = [
  { id: "uplifting", label: "Uplifting", icon: "fas fa-heart" },
  { id: "energetic", label: "Energetic", icon: "fas fa-fire" },
  { id: "melancholic", label: "Melancholic", icon: "fas fa-moon" },
  { id: "aggressive", label: "Aggressive", icon: "fas fa-bolt" },
];

const genres = [
  "Pop", "Hip-Hop", "Electronic", "Rock", "R&B", "Country", "Jazz", "Classical"
];

export function LyricsInput({
  lyrics,
  mood,
  genre,
  tempo,
  onLyricsChange,
  onMoodChange,
  onGenreChange,
  onTempoChange,
  onGenerateScript,
  isGenerating = false,
}: LyricsInputProps) {
  const [analysis, setAnalysis] = useState<LyricsAnalysis>({
    lines: 0,
    words: 0,
    estimatedDuration: "0:00",
  });

  useEffect(() => {
    const lines = lyrics.split('\n').filter(line => line.trim()).length;
    const words = lyrics.trim() ? lyrics.trim().split(/\s+/).length : 0;
    const estimatedSeconds = Math.ceil(words / 25 * 60); // 25 words per minute
    const minutes = Math.floor(estimatedSeconds / 60);
    const seconds = estimatedSeconds % 60;
    const estimatedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    setAnalysis({ lines, words, estimatedDuration });
  }, [lyrics]);

  return (
    <div className="lg:col-span-2">
      <div className="bg-primary-800 rounded-2xl border border-primary-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Lyrics & Creative Input</h3>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-lg text-sm border border-accent-blue/30 hover:bg-accent-blue/30"
            >
              <i className="fas fa-magic-wand-sparkles mr-1"></i>AI Assist
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="px-3 py-1 bg-primary-700 hover:bg-primary-600 rounded-lg text-sm"
            >
              <i className="fas fa-upload mr-1"></i>Import
            </Button>
          </div>
        </div>

        {/* Lyrics Textarea */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Song Lyrics</label>
          <Textarea
            value={lyrics}
            onChange={(e) => onLyricsChange(e.target.value)}
            className="w-full h-64 bg-primary-900 border border-primary-600 rounded-xl p-4 text-white placeholder-gray-500 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple resize-none font-mono text-sm leading-relaxed"
            placeholder={`Enter your song lyrics here...

Verse 1:
Walking down this empty street tonight
City lights are fading out of sight
Every step I take feels so unsure
But I know there's something worth fighting for

Chorus:
We're gonna rise above the storm
Break through every wall we've torn
Nothing's gonna stop us now
We'll find our way somehow...`}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              Lines: {analysis.lines} • Words: {analysis.words} • Estimated Duration: {analysis.estimatedDuration}
            </span>
            <button className="text-xs text-accent-blue hover:text-accent-blue/80">
              <i className="fas fa-spell-check mr-1"></i>Check Rhyme Scheme
            </button>
          </div>
        </div>

        {/* Mood & Genre Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Mood & Energy</label>
            <div className="grid grid-cols-2 gap-2">
              {moods.map((moodOption) => (
                <button
                  key={moodOption.id}
                  onClick={() => onMoodChange(moodOption.id)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    mood === moodOption.id
                      ? "bg-accent-purple/20 border border-accent-purple/30 text-accent-purple"
                      : "bg-primary-700 hover:bg-primary-600 border border-primary-600 text-gray-300"
                  }`}
                >
                  <i className={`${moodOption.icon} mr-2`}></i>
                  {moodOption.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Genre</label>
            <Select value={genre} onValueChange={onGenreChange}>
              <SelectTrigger className="w-full bg-primary-900 border border-primary-600 rounded-xl p-3 text-white focus:border-accent-purple focus:ring-1 focus:ring-accent-purple">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent className="bg-primary-800 border border-primary-600">
                {genres.map((genreOption) => (
                  <SelectItem key={genreOption} value={genreOption.toLowerCase()}>
                    {genreOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-300 mb-2">Tempo (BPM)</label>
              <div className="flex items-center space-x-3">
                <Slider
                  value={[tempo]}
                  onValueChange={(value) => onTempoChange(value[0])}
                  min={60}
                  max={180}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-mono bg-primary-900 px-2 py-1 rounded border border-primary-600">
                  {tempo} BPM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary-700">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <i className="fas fa-save mr-2"></i>Save Draft
          </Button>
          <Button
            onClick={onGenerateScript}
            disabled={isGenerating || !lyrics.trim()}
            className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-blue hover:from-accent-purple/80 hover:to-accent-blue/80 rounded-xl font-semibold shadow-lg"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <i className="fas fa-arrow-right mr-2"></i>Generate AI Script
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

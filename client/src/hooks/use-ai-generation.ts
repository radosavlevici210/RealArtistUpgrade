import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function useGenerateScript() {
  return useMutation({
    mutationFn: async ({ lyrics, mood, genre }: { lyrics: string; mood: string; genre: string }) => {
      const response = await apiRequest("POST", "/api/ai/generate-script", { lyrics, mood, genre });
      return response.json();
    },
  });
}

export function useGenerateVoice() {
  return useMutation({
    mutationFn: async ({ script, artistVoice }: { script: any; artistVoice: string }) => {
      const response = await apiRequest("POST", "/api/ai/generate-voice", { script, artistVoice });
      return response.json();
    },
  });
}

export function useGenerateInstrumental() {
  return useMutation({
    mutationFn: async ({ mood, genre, tempo, duration }: { mood: string; genre: string; tempo: number; duration: number }) => {
      const response = await apiRequest("POST", "/api/ai/generate-instrumental", { mood, genre, tempo, duration });
      return response.json();
    },
  });
}

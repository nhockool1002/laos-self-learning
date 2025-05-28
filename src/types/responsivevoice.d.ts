interface ResponsiveVoice {
  speak: (text: string, voice: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
  }) => void;
  cancel: () => void;
  isPlaying: () => boolean;
  getVoices: () => string[];
}

declare global {
  interface Window {
    responsiveVoice: ResponsiveVoice;
  }
}

export {}; 
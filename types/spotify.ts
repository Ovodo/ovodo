export interface SpotifyTrack {
  name: string;
  artists: string[];
  album: string;
  albumArt: string;
  external_url: string;
  preview_url?: string;
  duration_ms: number;
  progress_ms?: number;
}

export interface SpotifyPlaybackState {
  isPlaying: boolean;
  track: SpotifyTrack | null;
  timestamp: number;
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface SpotifyCurrentlyPlayingResponse {
  timestamp: number;
  context: any;
  progress_ms: number;
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string; height: number; width: number }>;
    };
    external_urls: {
      spotify: string;
    };
    preview_url?: string;
    duration_ms: number;
  };
  currently_playing_type: string;
  is_playing: boolean;
}
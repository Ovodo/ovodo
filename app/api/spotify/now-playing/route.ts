import { NextResponse } from "next/server";

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error("Missing Spotify credentials in environment variables");
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    console.log("Failed to get access token:", await response.text());
    // throw new Error("Failed to get access token");
  }

  return response.json();
}

async function getNowPlaying(access_token: string) {
  const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204) {
    return null; // Not playing anything
  }

  if (!response.ok) {
    throw new Error("Failed to get currently playing track");
  }

  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    const data = await getNowPlaying(access_token);

    if (!data || !data.item) {
      return NextResponse.json({
        isPlaying: false,
        message: "Not currently playing any track",
      });
    }

    const track = {
      name: data.item.name,
      artists: data.item.artists.map((artist: any) => artist.name),
      album: data.item.album.name,
      albumArt: data.item.album.images?.[0]?.url || "",
      external_url: data.item.external_urls?.spotify || "",
      preview_url: data.item.preview_url,
      duration_ms: data.item.duration_ms,
      progress_ms: data.progress_ms,
    };

    return NextResponse.json({
      isPlaying: data.is_playing,
      track,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Spotify API Error:", error);
    return NextResponse.json(
      {
        isPlaying: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

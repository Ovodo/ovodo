# Spotify Integration Setup Guide

## Overview
This guide will help you set up Spotify Web API integration to display your currently playing music in real-time.

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the details:
   - App Name: "Your Portfolio Music Room"
   - App Description: "Real-time music sharing for portfolio website"
   - Website: Your domain (e.g., https://yourdomain.com)
   - Redirect URI: `http://localhost:3000/api/auth/callback` (for development)
5. Check the agreements and click "Save"

## Step 2: Get Your Credentials

1. In your new app dashboard, note down:
   - **Client ID**
   - **Client Secret** (click "Show Client Secret")

## Step 3: Get a Refresh Token

You need to generate a refresh token to access your Spotify data. Here's how:

### Method 1: Using Authorization Code Flow

1. Replace `YOUR_CLIENT_ID` and `YOUR_REDIRECT_URI` in this URL:
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=user-read-currently-playing%20user-read-playback-state
```

2. Visit the URL in your browser, authorize the app
3. You'll be redirected to your redirect URI with a `code` parameter
4. Exchange this code for tokens using this curl command:

```bash
curl -H "Authorization: Basic <base64 encoded client_id:client_secret>" \
     -d grant_type=authorization_code \
     -d code=<authorization_code> \
     -d redirect_uri=<redirect_uri> \
     https://accounts.spotify.com/api/token
```

### Method 2: Using the Spotify Web API Console

1. Go to [Spotify Web API Console](https://developer.spotify.com/console/get-users-currently-playing-track/)
2. Click "Get Token"
3. Select scopes: `user-read-currently-playing` and `user-read-playback-state`
4. Use the generated token for initial setup

## Step 4: Environment Variables

Add these to your `.env.local` file:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

## Step 5: Test the Integration

1. Start playing music on Spotify
2. Visit `/music` on your website
3. You should see your currently playing track!

## Troubleshooting

### Common Issues:

1. **"Missing Spotify credentials"**
   - Make sure all environment variables are set
   - Restart your development server after adding env vars

2. **"Failed to get access token"**
   - Check your client ID and secret
   - Ensure your refresh token is valid

3. **"Not currently playing any track"**
   - Make sure you're actively playing music on Spotify
   - Check that your Spotify account has the proper scopes

4. **Rate limiting**
   - The API updates every 30 seconds to avoid rate limits
   - Spotify allows 100 requests per minute for this endpoint

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your client secret secure
- The refresh token doesn't expire but can be revoked by the user
- Consider implementing error handling for when tokens are revoked

## Optional Enhancements

You can extend this integration with:
- Display playback progress bar
- Show recent tracks when nothing is playing
- Add play/pause controls (requires additional scopes)
- Show listening history
- Add a "Join my playlist" feature
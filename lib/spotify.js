/**
 * SPOTIFY-WEB-API-NODE-PACKAGE LIBRARY
 */
import SpotifyWebApi from "spotify-web-api-node";

/**
 * SPOTIFY PERMISSIONS
 */
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  // "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(',');


/**
 * PASS PARAMS scopes VALUES AT THE END OF THE STRING ENDPOINT URL HTTP REQUEST
 */
const params = {
  scope: scopes,
};


/**
 * URLSearchParams = SEARCH THE EXACT PARAM SCOPE VALUE FROM THE SPOTIFY REPOSITORY DATABASE 
 * new URLSearchParams = GENERATE AN INSTANCE OBJECT SEARCHER.
 */
const queryParamString = new URLSearchParams(params);


/**
 * HTTP REQUEST TO SPOTIFY API, VALIDATION USER_ID FOR LOGIN AUTHORIZATION 
 */
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;


/**
 * USE - SPOTIFY-WEB-API-NODE-PACKAGE LIBRARY
 * GENERATE A GENERIC USER DETAILS OBECT TEMPLATE
 * HOLDS clientId AND clientSecret
 */
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };

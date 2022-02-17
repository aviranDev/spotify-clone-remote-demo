import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

/**
 * REFRESH ACCESS TOKEN
 */
async function refreshAccessToken(token) {
  try {
    //SET TOKEN 
    spotifyApi.setAccessToken(token.accessToken)

    //INITIALIZE TOKEN
    spotifyApi.setRefreshToken(token.refreshToken)

    //REFRESH ACCESS TOKEN
    const { body: refreshToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHIED TOKEN", refreshToken);

    return {
      ...token,
      accessToken: refreshToken.access_token,
      //LIMIT JWT TOKEN
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,

      //USE THE REFRESH TOKEN OR RELOAD THE REFRESH TOKEN
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: "RefreshAccessToken"
    }
  }
}

/**
 * SPOTIFY PROVIDER & NEXT APP AUTHENTICATION 
 */
export default NextAuth({

  //CONFIGURE ONE OR MORE AUTHENTICATION PROVIDERS
  providers: [
    SpotifyProvider({
      //CLIENT USER_ID HOLDER
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,

      //CLIENT USER SECRET_KEY HOLDER
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,

      //THE LONGIN PROCCESS WILL BE INITIATED BY SENDING THE USER TO THIS URL 
      authorization: LOGIN_URL,

    }),
  ],
  //JWT INCRYOTED TOKEN
  secret: process.env.JWT_SECRET,

  //MAP TO CUSTOM LOGIN PAGE
  pages: {
    signIn: '/login'
  },


  callbacks: {
    //DESTRUCTOR USER'S TOKEN AND PAYLOAD DETAILS
    async jwt({ token, account, user }) {

      //INITIAL USER SIGN IN VALIDATION SCHEMA
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }

      //RETURN PREVIOUS TOKEN IF THE ACCESS TOKEN HASN'T EXPIRED YET
      if (Date.now() < token.accessTokenExpires) {
        console.log("EXISTING ACCESS TOKEN IS VALID")
        return token;
      }

      //ACCESS TOKEN HAS EXPIREDS THAN REFRESH IT AGAIN
      console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING")
      return await refreshAccessToken(token);
    },

    //THE HASH STRING PASSWORD TOKEN THAT DISPLAY ON THE CLIENT SIDE 
    async session({ session, token }) {
      session.user.accessToken = await token.accessToken;
      session.user.refreshToken = await token.refreshToken;
      session.user.username = await token.username;

      return session;
    }
  }
})
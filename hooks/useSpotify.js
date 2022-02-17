import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "../lib/spotify";

function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      //IF REFRESH ACCESS TOKEN ATTEMPT FAILS, DIRECT USER TO LOGIN PAGE.
      if (session.error === 'RefreshAccessToken') {
        signIn();
      }

      //SET USER'S ACCESS TOKEN AUTHORIZATION
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);


  return spotifyApi;

}

export default useSpotify;
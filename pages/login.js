import { getProviders, signIn } from "next-auth/react";

/**
 * LOGIN FORM
 */
function Login({ providers }) {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login;

/**
 * SERVER SIDE API RENDER DATA GETTING SPOTIFY PROVIDERS  
 */
export async function getServerSideProps() {
  const providers = await getProviders();

  //OUTPUT API RESPONSE DATA - THE PROVIDERS
  //DESTRUCTOR THE PROPS TO - PROVIDERS DATA VALUE
  return {
    props: {
      providers
    }
  }
}

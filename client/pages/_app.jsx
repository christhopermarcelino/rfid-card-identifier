import "@/styles/globals.css";
import { useRouter } from "next/router";

import Layout from "./_layout";
import { AuthProvider } from "@/contexts/AuthContext";

const publicAccess = ["/", "/signin"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (
    process.env.NODE_ENV === "production" &&
    !publicAccess.includes(router.pathname)
  ) {
    router.push("/");
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );

  // return (
  //   <AuthProvider>
  //     <Layout Component={Component} pageProps={pageProps} />
  //   </AuthProvider>
  // );
}

export default MyApp;

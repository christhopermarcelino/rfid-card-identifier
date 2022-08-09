import { useRouter } from "next/router";

import { useAuthState } from "@/contexts/AuthContext";

import Home from "@/pages/index";
import Signin from "@/pages/signin";

export default function Layout({ Component, pageProps }) {
  const { user } = useAuthState();
  const router = useRouter();

  if (user && router.pathname === "/signin") return <Home />;

  if (process.env.NODE_ENV === "production" && user === null) return <Signin />;

  return <Component {...pageProps} />;
}

import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

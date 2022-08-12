import Dashboard from "@/components/Dashboard";
import { useAuthState } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && user === null) {
      router.replace("/signin");
    }
  }, []);

  return (
    <div>
      <Dashboard title='Data Statistik'>
        <main>
          <h1>RFIF Card Identifier</h1>
        </main>
      </Dashboard>
    </div>
  );
}

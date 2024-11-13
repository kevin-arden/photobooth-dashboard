// app/page.tsx
"use client";

import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const HomePage: React.FC = () => {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1>You are not signed in</h1>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
};

export default HomePage;

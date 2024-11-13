// app/dashboard/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import TableOne from "../components/TableOne";
import { fetchData } from "@/services/api";

const DashboardPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the session is loading, don't redirect yet
    if (status === "loading") return;

    // If there's no session, redirect to the login page
    if (!session) {
      router.push("/auth/signin");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetchData();
        console.log("GET FILE", response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Show the dashboard if the user is logged in
  if (status === "loading" || !session) {
    return <div>Loading...</div>; // Show loading state
  }

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Redirect to home page after sign-out
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session.user?.name}</p>
      <button onClick={handleLogout}>Logout</button>
      <TableOne />
    </div>
  );
};

export default DashboardPage;

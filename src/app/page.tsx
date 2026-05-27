import { DashboardScreen } from "@/components/screens/DashboardScreen";
import { AuthInit } from "@/components/user-profile/auth-init";

export default function Home() {
  return (
    <>
      <AuthInit />
      <DashboardScreen />
    </>
  );
}

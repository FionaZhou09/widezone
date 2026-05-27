import { CustomersScreen } from "@/components/screens/CustomersScreen";
import { AuthInit } from "@/components/user-profile/auth-init";

export default function CustomersPage() {
  return (
    <>
      <AuthInit />
      <CustomersScreen />
    </>
  );
}

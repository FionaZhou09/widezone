import { CatalogScreen } from "@/components/screens/CatalogScreen";
import { AuthInit } from "@/components/user-profile/auth-init";

export default function CatalogPage() {
  return (
    <>
      <AuthInit />
      <CatalogScreen />
    </>
  );
}

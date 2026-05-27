import { Suspense } from "react";
import { CustomersScreen } from "@/components/screens/CustomersScreen";
import { AuthInit } from "@/components/user-profile/auth-init";

function CustomersContent() {
  return <CustomersScreen />;
}

export default function CustomersPage() {
  return (
    <>
      <AuthInit />
      <Suspense fallback={<div className="p-4 md:p-8 space-y-4"><div className="h-8 bg-white rounded-lg animate-pulse" /></div>}>
        <CustomersContent />
      </Suspense>
    </>
  );
}

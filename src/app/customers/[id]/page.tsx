import { CustomerDetailScreen } from "@/components/screens/CustomerDetailScreen";
import { AuthInit } from "@/components/user-profile/auth-init";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <>
      <AuthInit />
      <CustomerDetailScreen customerId={id} />
    </>
  );
}

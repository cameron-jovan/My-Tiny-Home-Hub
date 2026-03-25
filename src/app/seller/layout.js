import ProtectedRoute from '@/components/ProtectedRoute';

export default function SellerLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

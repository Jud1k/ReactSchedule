import { useStores } from "@/root-store-context";
import { RoleName } from "@/types";
import { observer } from "mobx-react-lite";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  required_role?: RoleName;
}

const ProtectedRoute = observer(
  ({ children, required_role }: ProtectedRouteProps) => {
    const { authStore } = useStores();

    if (!authStore.isAuth) return <Navigate to="/login" />;

    if (required_role && authStore.user.role_name !== required_role) return <Navigate to="/" />;

    return <>{children}</>;
  }
);

export default ProtectedRoute;

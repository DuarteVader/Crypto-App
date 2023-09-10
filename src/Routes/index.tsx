import { useAuth } from "../hooks/useAuth";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const Routes = () => {
  const { signed } = useAuth();

  return signed ? <ProtectedRoutes /> : <PublicRoutes />;
}

export default Routes;


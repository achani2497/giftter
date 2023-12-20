import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticaded } from "../Redux/Slice/Slice";

export default function ProtectedRoute({ children }: any) {
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate()

  setIsAuthenticaded()

  if (!user.state.isAuthenticated) {
    navigate('/login')
    //   return <Navigate to="/login" state = {{ from: location }
    // } replace />
  }
  return children

};
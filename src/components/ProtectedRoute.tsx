import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// TODO: Ver como implemento esto
// export function ProtectedRoute({ path, element }: any) {
//     const userData = useSelector((store: any) => store.user.data);
//     const isAccessible = userData.user && userData.isLoggedIn;
//     let location = useLocation();
//     const component = isAccessible ? element : (<Navigate to="/login" state={{ from: location }} replace />)

//     return <Route path={path} element={component}></Route>

// };

export function RequireAuth({ children }: { children: JSX.Element }) {
    const userData = useSelector((store: any) => store.user.data);
    let location = useLocation();

    if (!userData.isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
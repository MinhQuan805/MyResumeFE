import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";

interface AuthMiddlewareProps {
  children: ReactNode;
}
const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
    const isAuth = localStorage.getItem('accessToken');
    return isAuth ? children
    : <Navigate to="/admin/auth/login" />
}
export default AuthMiddleware;
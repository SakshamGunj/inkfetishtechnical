import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface AuthorProtectedRouteProps {
    children?: React.ReactNode;
}

const AuthorProtectedRoute: React.FC<AuthorProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-black mb-4" />
                <h2 className="text-xl font-black uppercase tracking-widest text-black">Verifying Clearance...</h2>
            </div>
        );
    }

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/authorsite/login" replace />;
    }

    // Render children if passed directly, otherwise render Outlet for nested routes
    return children ? <>{children}</> : <Outlet />;
};

export default AuthorProtectedRoute;

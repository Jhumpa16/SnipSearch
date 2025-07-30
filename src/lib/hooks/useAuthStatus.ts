import { useAuth } from '../auth-context';

export function useAuthStatus() {
  const { user, loading } = useAuth();
  
  return {
    isAuthenticated: !!user,
    isUnauthenticated: !loading && !user,
    isLoading: loading,
    user,
  };
} 
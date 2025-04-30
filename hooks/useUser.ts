import { useKindeAuth } from '@kinde-oss/kinde-auth-nextjs';


export function useUser() {
  const { user, isAuthenticated, isLoading } = useKindeAuth();
    console.log(user)
  return {
    user,
    isAuthenticated,
    isLoading,
  };
}

import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export function useKindeUser() {
  const { user, isAuthenticated, isLoading } = useKindeAuth();
  console.log(user, isLoading);
  const fullName =
    user?.given_name && user?.family_name
      ? `${user.given_name} ${user.family_name}`
      : user?.given_name || user?.family_name || "";

  const enhancedUser = user ? { ...user, fullName } : undefined;

  return {
    user: enhancedUser,
    isAuthenticated,
    isLoading,
  };
}

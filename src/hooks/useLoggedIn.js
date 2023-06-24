import { useQuery } from "react-query";

import AuthService from "../services/authService";

export const useLoggedIn = () => {
  const res = useQuery(
    ["auth"],
    async () => {
      try {
        const res = await AuthService.isLoggedIn();
        return res;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    }
  );

  return res;
};

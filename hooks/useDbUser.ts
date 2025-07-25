import { axiosPublic } from "@/lib/axiosPublic";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useDbUser() {
  const { user } = useKindeAuth();
  //   if (user) {
  //     const fetchUser = async () => {
  //       const res = await axiosPublic.get(`/api/user?id=${user?.id}`);
  //       console.log(res.data);
  //     };
  //     fetchUser();
  //   }

  const { data: dbUser, refetch } = useQuery({
    queryKey: ["dbUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/user?id=${user?.id}`);
      // console.log("Db User", res.data.user);
      return res.data.user;
    },
  });

  return { dbUser, refetch };
}

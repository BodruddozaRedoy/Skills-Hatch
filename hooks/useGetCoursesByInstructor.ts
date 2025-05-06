import { axiosPublic } from "@/lib/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import useDbUser from "./useDbUser";
import { useState } from "react";

export default function useGetCoursesByInstructor() {
  const [courseId, setCourseId] = useState();
  const { dbUser } = useDbUser();
  const {
    data: coursesByInstructor = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-courses", dbUser?.kindeId],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/api/course?kindeId=${dbUser?.kindeId}&courseId=${""}`
      );
      console.log(res.data);
      return res.data.data;
    },
    enabled: !!dbUser,
  });
  return { coursesByInstructor, refetch, setCourseId, isLoading };
}

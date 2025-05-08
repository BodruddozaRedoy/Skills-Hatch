import { axiosPublic } from "@/lib/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import useDbUser from "./useDbUser";

export default function useGetCoursesByInstructor() {
  const { dbUser } = useDbUser();
  const {
    data: coursesByInstructor = [],
    refetch,
    isLoading,
    isSuccess,
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
  console.log(isLoading, isSuccess);
  return { coursesByInstructor, refetch, isLoading, isSuccess };
}

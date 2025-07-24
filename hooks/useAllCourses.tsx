import { axiosPublic } from "@/lib/axiosPublic"
import { useQuery } from "@tanstack/react-query"
import useDbUser from "./useDbUser";
import { useKindeUser } from "./useKindeUser";

export const useAllCourses = () => {
      const { dbUser } = useDbUser();
      const {user} = useKindeUser()
    const {data:courses} = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            // const res = await axios.get("/courses.json")
            const res = await axiosPublic.get(`/api/course?kindeId=${user?.id}`)
            return res.data.data
        },
        enabled: !!user
    })

    return {courses}
}
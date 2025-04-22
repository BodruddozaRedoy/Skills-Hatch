import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAllCourses = () => {
    const {data:courses} = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const res = await axios.get("/courses.json")
            return res.data
        }
    })

    return {courses}
}
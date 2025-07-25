import { axiosPublic } from "@/lib/axiosPublic";
import { useState } from "react";
import useDbUser from "./useDbUser";

export default function useDeleteCourse() {
  const [deleteCourse, setDeleteCourse] = useState({
    courseId: "",
  });
  const { dbUser } = useDbUser();
  const deleteAction = async () => {
    const res = await axiosPublic.delete(
      `/api/course?kindeId=${dbUser?.kindeId}&courseId=${deleteCourse?.courseId}`
    );
    // console.log(res.data);
  };
  deleteAction();
  return { setDeleteCourse };
}

import UpdateCourse from "../component/UpdateClient";

export default async function UpdatePage({ params }: { params: { _id: string } }) {
    const { _id } = params;
    console.log("_id", _id)
    return <UpdateCourse _id={_id} />;
}

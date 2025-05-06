import UpdateClient from "../component/UpdateClinet";


export default function UpdatePage({ params }: { params: { _id: string } }) {
    return <UpdateClient courseId={params._id} />;
}

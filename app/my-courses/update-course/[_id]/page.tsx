import UpdateClient from "../component/UpdateClinet";


export default function UpdatePage({ params }: { params: { _id: string } }) {
    return <UpdateClient _id={params._id} />;
}

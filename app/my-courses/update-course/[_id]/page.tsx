import UpdateClient from "../component/UpdateClient";

export default async function UpdatePage({ params }: { params: { _id: string } }) {
    const { _id } = params;
    return <UpdateClient _id={_id} />;
}

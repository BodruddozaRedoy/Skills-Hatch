import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function useUser () {
  const {getUser} =  getKindeServerSession()
  const user = await getUser()
  console.log(user)
  return {user}
}

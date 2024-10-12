import { UserButton } from "@/features/auth/components/user-button";
import { getCurrentUser } from "@/features/auth/get-current-user";
import { redirect } from "next/navigation";

const Home = async () => {

  const user = await getCurrentUser();
  if(!user) redirect('/sign-in');

  return (
    <div>
      this is a home page
    </div>
  )
}

export default Home;

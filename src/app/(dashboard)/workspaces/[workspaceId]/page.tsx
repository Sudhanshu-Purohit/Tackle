import { getCurrentUser } from "@/features/auth/get-current-user";
import { redirect } from "next/navigation";

const WorkspaceIdPage = async () => {

    const user = await getCurrentUser();
    if (!user) redirect('/sign-in');

    return (
        <div>
            workspace id page
        </div>
    )
}

export default WorkspaceIdPage;

import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType } from "hono"
import { useRouter } from "next/navigation"
import { toast } from "sonner"



const $post = client.api.auth.logout["$post"]
// InferResponseType
type ResType = InferResponseType<typeof $post>


export const useLogout = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResType, Error>({
        mutationFn: async () => {
            const response = await client.api.auth.logout["$post"]();

            if (!response.ok) {
                throw new Error(); // this will redirect to onError function
            }
            
            return await response.json()
        },
        onSuccess: () => {
            toast.success('Logout successful. See you next time! 👋');
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ['current'] })
            queryClient.invalidateQueries({ queryKey: ['workspaces'] })
        },
        onError: (error) => {
            toast.error("Oops! There was an issue logging you out. 😟");
        }
    })

    return mutation;
}
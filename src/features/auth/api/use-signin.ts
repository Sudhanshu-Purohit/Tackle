import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferRequestType, InferResponseType } from "hono"
import { useRouter } from "next/navigation"


// InferRequestType
const $post = client.api.auth["sign-in"].$post
type ReqType = InferRequestType<typeof $post>

// InferResponseType
type ResType = InferResponseType<typeof $post>


export const useSignIn = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<ResType, Error, ReqType>({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth["sign-in"]["$post"]({ json })
            return await response.json()
        },
        onSuccess: () => {
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ['current'] })
        }
    })

    return mutation;
}
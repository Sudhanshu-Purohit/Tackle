import { client } from "@/lib/rpc"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType } from "hono"



const $post = client.api.auth.logout["$post"]
// InferResponseType
type ResType = InferResponseType<typeof $post>


export const useLogout = () => {

    const queryClient = useQueryClient();

    const mutation = useMutation<ResType, Error>({
        mutationFn: async () => {
            const response = await client.api.auth.logout["$post"]()
            return await response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['current'] })
        }
    })

    return mutation;
}
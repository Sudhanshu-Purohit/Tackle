import { cookies } from 'next/headers';
import { Account, Client } from 'node-appwrite';
import 'server-only';

export const getCurrentUser = async () => {
    try {
        const sessionClient = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = cookies().get('auth-cookie');

        if (!session) return null;

        sessionClient.setSession(session.value);
        const account = new Account(sessionClient);

        const user = await account.get();

        return user;
    } catch (error) {
        return null;
    }
}
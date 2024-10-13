import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from '@/config';
import { cookies } from 'next/headers';
import { Account, Client, Databases, Query } from 'node-appwrite';
import 'server-only';

export const getWorkspaces = async () => {
    try {
        const sessionClient = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = cookies().get('auth-cookie');

        if (!session) return { documents: [], total: 0 };

        sessionClient.setSession(session.value);

        const databases = new Databases(sessionClient);
        const account = new Account(sessionClient);
        const user = await account.get();

        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [
                Query.equal('userId', user.$id)
            ]
        );

        if (members.total === 0) {
            return { documents: [], total: 0 };
        }

        const workspaceIds = members.documents.map((member) => member.workspaceId);

        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACES_ID,
            [
                Query.orderDesc('$createdAt'),
                Query.contains('$id', workspaceIds)
            ]
        );

        return workspaces;
    } catch (error) {
        return { documents: [], total: 0 };
    }
}
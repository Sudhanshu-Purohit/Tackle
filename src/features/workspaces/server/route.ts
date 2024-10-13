import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACES_ID } from '@/config';
import { sessionMiddleware } from '@/lib/session-middleware';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { ID, Query } from 'node-appwrite';
import { createWorkspaceSchema } from '../schemas';
import { MemberRole } from '@/features/members/types';
import { getInviteCode } from '@/lib/utils';

const app = new Hono()
    .get('/', sessionMiddleware, async (c) => {

        const databases = c.get('databases');
        const user = c.get('user');

        // only load the workspaces which we are a member of.
        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [
                Query.equal('userId', user.$id)
            ]
        );

        if(members.total === 0) {
            return c.json({
                data: {
                    documents: [],
                    total: 0
                }
            })
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

        return c.json({
            data: workspaces
        })
    })
    .post('/', zValidator('form', createWorkspaceSchema), sessionMiddleware, async (c) => {

        const databases = c.get('databases');
        const storage = c.get('storage');
        const user = c.get('user');

        const { name, image } = c.req.valid('form');

        let uploadedImageUrl: string | undefined;

        if (image instanceof File) {
            const file = await storage.createFile(
                IMAGES_BUCKET_ID,
                ID.unique(),
                image
            );

            const arrayBuffer = await storage.getFilePreview(
                IMAGES_BUCKET_ID,
                file.$id
            );

            uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`;
        }

        const workspace = await databases.createDocument(
            DATABASE_ID,
            WORKSPACES_ID,
            ID.unique(),
            {
                name: name,
                userId: user.$id,
                imageUrl: uploadedImageUrl,
                inviteCode: getInviteCode(6)
            }
        )

        // while creating the workspace create the user for that workspace also.
        await databases.createDocument(
            DATABASE_ID,
            MEMBERS_ID,
            ID.unique(),
            {
                workspaceId: workspace.$id,
                userId: user.$id,
                role: MemberRole.ADMIN
            }
        )

        return c.json({
            data: workspace
        })
    })


export default app;
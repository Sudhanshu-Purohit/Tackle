import { createAdminClient } from '@/services/appwrite';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { ID } from 'node-appwrite';
import { signInSchema, signUpSchema } from '../schemas';

const app = new Hono()
    .post('/sign-in', zValidator('json', signInSchema), async (c) => {
        const { email, password } = c.req.valid('json');

        const { account } = await createAdminClient();

        await account.create(ID.unique(), email, password);
        const session = await account.createEmailPasswordSession(email, password);

        setCookie(c, "auth-cookie", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 60 * 60 * 24 * 30,
        })

        return c.json({
            success: true
        })
    })
    .post('/sign-up', zValidator('json', signUpSchema), async (c) => {
        const { name, email, password } = c.req.valid('json');

        const { account } = await createAdminClient();

        await account.create(ID.unique(), email, password, name);
        const session = await account.createEmailPasswordSession(email, password);

        setCookie(c, "auth-cookie", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 60 * 60 * 24 * 30,
        })

        return c.json({
            success: true
        })
    })
    .post('/logout', async (c) => {
        // const { account } = await createSessionClient();

        deleteCookie(c, "auth-cookie");
        // await account.deleteSession("current");

        return c.json({
            success: true
        })
    })


export default app;
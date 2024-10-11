import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { signInSchema, signUpSchema } from '../schemas';

const app = new Hono()
    .post('/sign-in', zValidator('json', signInSchema), (c) => {
        const { email, password } = c.req.valid('json');

        console.log({ email, password })

        return c.json({
            message: 'Hello signed in',
        })
    })
    .post('/sign-up', zValidator('json', signUpSchema), (c) => {
        const { name, email, password } = c.req.valid('json');

        console.log({ name, email, password });

        return c.json({
            message: 'Hello signed up',
        })
    })


export default app;
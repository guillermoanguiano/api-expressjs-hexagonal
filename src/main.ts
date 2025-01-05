import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { ExpressUserRouter } from './lib/User/infrastructure/ExpressUserRouter';

const app = express();

app.use(ExpressUserRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        console.error(err.stack);
        res.status(500).send(err.message);
    }

    console.error(err);
    res.status(500).send('Something went wrong!');
})

app.listen(3000, () => console.log('Server running on port 3000'));
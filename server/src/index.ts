import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port: number = 8888;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello Perlynka');
});

app.listen(port, () => {
   console.log(`Connected successfully on port ${port}`);
});

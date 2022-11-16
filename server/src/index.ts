import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
const port: number = 8888;

app.use(cors());
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
   res.send('Hello Perlynka');
});

app.listen(port, () => {
   console.log(`Connected successfully on port ${port}`);
});

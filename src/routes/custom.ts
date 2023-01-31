import { Request, Response } from 'express';
import path from 'path'

const customrouter = (req: Request, res: Response) => {
    res.render(path.join(__dirname, '../views/custom'), {
        headline: "Custom Message",
    });
}

export default customrouter

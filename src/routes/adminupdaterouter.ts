import { Request, Response } from 'express';
import path from 'path'

const adminupdatedrouter = (req: Request, res: Response) => {
    res.render(path.join(__dirname, '../ejs/admin_updated'), {
        headline: "Updated Admin Params",
        phone_numbers_debug: req.body.debug_numbers,
        phone_numbers_production: req.body.production_numbers,
    });
}

export default adminupdatedrouter

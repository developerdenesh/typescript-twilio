import { Request, Response } from 'express';
import path from 'path'
import { updateNumbers } from '../controllers/dynamo';

const adminupdatedrouter = (req: Request, res: Response) => {
    console.log(JSON.stringify(req.body))
    updateNumbers({ 
        old_debug_nums: req.body.old_debug_numbers,
        debug_nums: req.body.debug_numbers, 
        old_production_nums: req.body.old_production_nums,
        production_nums: req.body.production_numbers
    })

    res.render(path.join(__dirname, '../../views/admin_updated'), {
        headline: "Updated Admin Params",
        phone_numbers_debug: req.body.debug_numbers,
        phone_numbers_production: req.body.production_numbers,
    });
}

export default adminupdatedrouter

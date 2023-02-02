import { Request, Response } from 'express';

const admindetailapi = (req: Request, res: Response) => {
    // req.body is forwarded from the previous url to here
    const url = require('url');
    res.redirect(308, url.format({
        pathname: "/admin_updated",
    }))
    res.status(401).end();
    return;
}

export default admindetailapi

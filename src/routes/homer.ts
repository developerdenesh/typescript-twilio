import { Request, Response } from 'express';
import path from 'path'
import { password, username } from '../variables'

const homerouter = (req: Request, res: Response) => {
    console.log('Logged in');

    if (req.body.username === username && req.body.password === password) {
        res.render(path.join(__dirname, '../views/index'), {
            headline: "Welcome to the Notifications page",
        });
    }
    else {
        res.redirect("/")
    }
}

export default homerouter
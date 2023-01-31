import { Request, Response } from 'express';
import path from 'path'

const loginrouter = (req: Request, res: Response) => {
    const message = 'Welcome to the sms api. The 2 apis are: cleaning_completed and bumper_engaged';
    console.log(message)
    // res.send(message);

    res.render(path.join(__dirname, '../views/login.ejs'), {
        headline: "Login Page",
    });
}

export default loginrouter

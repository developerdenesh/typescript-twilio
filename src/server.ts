import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Twilio } from "twilio";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const accountSid: string = process.env.ACCOUNT_SID || ''
const authToken: string = process.env.AUTH_TOKEN || ''
const client = new Twilio(accountSid, authToken);
const robot_name = process.env.ROBOT_NAME || '';
const final_number = process.env.FINAL_NUMBER || '';
const our_number = process.env.OUR_NUMBER || '';

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the sms api. The 2 apis are: cleaning_completed and bumper_engaged');
});

app.get('/cleaning_completed', (req: Request, res: Response) => {
    const date: Date = new Date();
    const body: string = `${robot_name}: Cleaning plan is completed for Terminal at time: ${date}`;
    client.messages
        .create({
            body: body,
            from: `whatsapp:${our_number}`,
            to: `whatsapp:${final_number}`
        })
        .then(message => {
            console.log(message.sid)
            console.log("sent the message")
        })
    res.send('Sending cleaning completed request: ' + body);
});

app.get('/bumper_engaged', (req: Request, res: Response) => {
    const body: string = `${robot_name}: Robot has been stopped. Please release the emergency stop`;
    client.messages
        .create({
            body: body,
            from: `whatsapp:${our_number}`,
            to: `whatsapp:${final_number}`
        })
        .then(message => {
            console.log(message.sid)
            console.log("sent the message")
        })
    res.send('Sending bumper engaged request ' + body);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
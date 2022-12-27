import express, { Express, Request, Response } from 'express';
import { Twilio } from "twilio";
import { sendMessage } from './helper'
import { 
    accountSid, 
    authToken, 
    environment, 
    phone_numbers_debug, 
    phone_numbers_production, 
    port,
    robot_name, 
    sms_id, 
} from './variables'
import path from 'path'

// Using the express backend library
const app: Express = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Constant variables to be used in the endpoints later
const client = new Twilio(accountSid, authToken);
const phone_numbers_debug_arr: Array<string> = phone_numbers_debug.split(" ") || []
const phone_numbers_production_arr: Array<string> = phone_numbers_production.split(" ") || []

app.get('/', (req: Request, res: Response) => {
    const message = 'Welcome to the sms api. The 2 apis are: cleaning_completed and bumper_engaged';
    console.log(message)
    // res.send(message);
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/cleaning_completed', (req: Request, res: Response) => {
    console.log("inside the cleaning completed endpoint")
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${robot_name}: Cleaning plan is completed for Terminal 4 at time: ${singapore_date}`;

    phone_numbers_debug_arr.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    if (environment === "PRODUCTION") {
        phone_numbers_production_arr.map(out_number => {
            sendMessage({ client, body, out_number, sms_id })
        })
    }

    res.send('Sending cleaning completed request: ' + body);
});

app.get('/cleaning_completed_debug', (req: Request, res: Response) => {
    console.log("inside the cleaning completed endpoint for debugging")
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${robot_name}: Cleaning plan is completed for Terminal 4 at time: ${singapore_date} (this is a test message)`;

    // This method only sends to the debug numbers
    phone_numbers_debug_arr.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Sending cleaning completed request: ' + body);
});


app.get('/cleaning_starting', (req: Request, res: Response) => {
    console.log("inside the cleaning completed endpoint")
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${robot_name}: Cleaning for Terminal 4 started at time: ${singapore_date}`;

    phone_numbers_debug_arr.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    if (environment === "PRODUCTION") {
        phone_numbers_production_arr.map(out_number => {
            sendMessage({ client, body, out_number, sms_id })
        })
    }

    res.send('Sending cleaning completed request: ' + body);
});

app.get('/cleaning_starting_debug', (req: Request, res: Response) => {
    console.log("inside the cleaning completed endpoint for debugging")
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${robot_name}: Cleaning for Terminal 4 started at time: ${singapore_date} (this is a test message)`;

    // This method only sends to the debug numbers
    phone_numbers_debug_arr.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Sending cleaning completed request: ' + body);
});



app.get('/bumper_engaged', (req: Request, res: Response) => {
    console.log("inside the bumper engaged endpoint")
    const body: string = `${robot_name}: Robot has been stopped. Please release the emergency stop`;

    phone_numbers_debug_arr.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    if (environment === "PRODUCTION") {
        phone_numbers_production_arr.map(out_number => {
            sendMessage({client, body, out_number, sms_id })
        })
    }

    res.send('Sending bumper engaged request ' + body);
});

app.get('/bumper_engaged_debug', (req: Request, res: Response) => {
    console.log("inside the bumper engaged endpoint for debugging")
    const body: string = `${robot_name}: Robot has been stopped. Please release the emergency stop (this is a test message)`;

    // This method only sends to the debug numbers
    phone_numbers_debug_arr.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Sending bumper engaged request ' + body);
});

app.listen(port, () => {
    // NO SSL at the moment
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
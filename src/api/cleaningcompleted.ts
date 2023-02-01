import { Request, Response } from 'express';
import { sendMessage } from '../helper'
import {
    accountSid,
    authToken,
    environment,
    password,
    phone_numbers_debug,
    phone_numbers_production,
    port,
    robot_name,
    username,
    sms_id,
} from '../variables'
import {
    debug_nums,
    production_nums
} from '../controllers/dynamo'
import { Twilio } from "twilio";


const client = new Twilio(accountSid, authToken);
// const phone_numbers_debug_arr: Array<string> = phone_numbers_debug.split(" ") || []
// const phone_numbers_production_arr: Array<string> = phone_numbers_production.split(" ") || []


const cleaningcompletedapi = (req: Request, res: Response) => {
    console.log("inside the cleaning completed endpoint")
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${robot_name}: Cleaning plan is completed for Terminal 4 at time: ${singapore_date}`;

    debug_nums.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    if (environment === "PRODUCTION") {
        production_nums.map(out_number => {
            sendMessage({ client, body, out_number, sms_id })
        })
    }

    res.send('Sending cleaning completed request: ' + body);
}

export default cleaningcompletedapi
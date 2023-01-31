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
import { Twilio } from "twilio";


const client = new Twilio(accountSid, authToken);
const phone_numbers_debug_arr: Array<string> = phone_numbers_debug.split(" ") || []

const bumperengageddebugapi = (req: Request, res: Response) => {
    console.log("inside the bumper engaged endpoint for debugging")
    const date: Date = new Date();
    const singapore_date = date.toLocaleString("en-GB", { timeZone: 'Asia/Singapore' })
    const body: string = `${robot_name}: Robot has been stopped at ${singapore_date}. Please release the emergency stop (this is a test message)`;

    // This method only sends to the debug numbers
    phone_numbers_debug_arr.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Sending bumper engaged request ' + body);
}

export default bumperengageddebugapi

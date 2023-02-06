import { Request, Response } from 'express';
import { sendMessage, getSingaporeDate } from '../helper'
import { accountSid, authToken, environment, robot_name, sms_id } from '../variables'
import { debug_nums, production_nums } from '../controllers/dynamo'
import { Twilio } from "twilio";

const client = new Twilio(accountSid, authToken);

const cleaningcompletedapi = (req: Request, res: Response) => {
    console.log("inside the cleaning completed endpoint")
    const singapore_date: string = getSingaporeDate()
    const body: string = `${robot_name}: Cleaning plan is completed for Terminal 2 at time: ${singapore_date}`;

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

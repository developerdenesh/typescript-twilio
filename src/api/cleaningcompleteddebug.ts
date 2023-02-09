import { Request, Response } from 'express';
import { sendMessage, getSingaporeDate } from '../helper'
import { accountSid, authToken, robot_name, sms_id } from '../variables'
import { Twilio } from "twilio";
import { debug_nums } from '../controllers/dynamo'

const client = new Twilio(accountSid, authToken);

const cleaningcompleteddebugapi = (req: Request, res: Response) => {
    console.log("inside the cleaning completed endpoint for debugging")
    const singapore_date: string = getSingaporeDate()
    const body: string = `${robot_name}: Cleaning plan is completed for Terminal 2 at time: ${singapore_date} (this is a test message)`;

    // This method only sends to the debug numbers
    debug_nums.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    res.send('Sending cleaning completed request: ' + body);
}

export default cleaningcompleteddebugapi

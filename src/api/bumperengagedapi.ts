import { Request, Response } from 'express';
import { sendMessage, getSingaporeDate } from '../helper'
import { accountSid, authToken, environment, robot_name, sms_id } from '../variables'
import { Twilio } from "twilio";
import { debug_nums, production_nums } from '../controllers/dynamo'

const client = new Twilio(accountSid, authToken);

const bumberengagedapi = (req: Request, res: Response) => {
    console.log("inside the bumper engaged endpoint")
    const singapore_date: string = getSingaporeDate()
    const body: string = `${robot_name}: Robot has been stopped at ${singapore_date}. Please release the emergency stop`;

    debug_nums.map(out_number => {
        sendMessage({ client, body, out_number, sms_id })
    })

    if (environment === "PRODUCTION") {
        production_nums.map(out_number => {
            sendMessage({ client, body, out_number, sms_id })
        })
    }

    res.send('Sending bumper engaged request ' + body);
}

export default bumberengagedapi

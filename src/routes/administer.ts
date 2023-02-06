import { Request, Response } from 'express';
import path from 'path'
import {
    accountSid,
    authToken,
    environment,
    password,
    port,
    robot_name,
    username,
    sms_id,
} from '../variables'
import {
    debug_nums,
    production_nums,
}  from '../controllers/dynamo'
import connectdynamo from '../controllers/dynamo'

const adminrouter = async (req: Request, res: Response) => {
    // Obtain the latest values from the DB
    const result = await connectdynamo();
    console.log(result)

    res.render(path.join(__dirname, '../../views/admin'), {
        headline: "Admin",
        port: port,
        environment: environment,
        accountSid: accountSid,
        authToken: authToken,
        robot_name: robot_name,
        sms_id: sms_id,
        phone_numbers_debug: debug_nums,
        phone_numbers_production: production_nums,
        username: username,
        password: password,
    });
}

export default adminrouter

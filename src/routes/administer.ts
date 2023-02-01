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
    production_nums
} from '../controllers/dynamo'

const adminrouter = (req: Request, res: Response): void => {
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

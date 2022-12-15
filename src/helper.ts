import { Twilio } from "twilio"

export const sendMessage = ({ client, body, out_number, sms_id }: {client: Twilio, body: string, out_number: string, sms_id: string}) => {
    client.messages
        .create({
            body: body,
            to: `${out_number}`,
            messagingServiceSid: `${sms_id}`
        })
        .then((message: any) => {
            console.log(message.sid)
            console.log("sent the message: " + body)
        })
}
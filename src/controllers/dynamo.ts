import AWS from 'aws-sdk'
import { debug } from 'console';

// Set the region 
AWS.config.update({ region: 'ap-southeast-1' });

export const debug_nums: Array<string> = [];
export const production_nums: Array<string> = [];

let debug_nums_modifier = debug_nums
let production_nums_modifier = production_nums

const obtainNumbers = async () => {
    // Create the DynamoDB service object
    var ddb = new AWS.DynamoDB()

    // Call DynamoDB to read the item from the table
    ddb.scan({
        TableName: 'debugnumbers',
    }, (err, data) => {
        if (err) {
            console.log("Error:", err);
        } else {
            if (data.Items && data.Items.length === 1) {
                // In case the data is undefined
                const debug_nums_string: string = (data.Items[0].numbers.S) ? (data.Items[0].numbers.S) : ("")
                console.log(`Debug numbers: ${debug_nums_string}`)
                for (let i = 0; i < debug_nums_modifier.length; i++) {
                    debug_nums_modifier.pop()
                }

                debug_nums_string.split(" ").map(element => {
                    debug_nums_modifier.push(element)
                })
            }
        }
    });

    // Call DynamoDB to read the item from the table
    ddb.scan({
        TableName: 'phonenumbers',
    }, (err, data) => {
        if (err) {
            console.log("Error!!!:", err);
        } else {
            if (data.Items && data.Items.length === 1) {
                // In case the data is undefined
                const production_nums_string: string = (data.Items[0].numbers.S) ? (data.Items[0].numbers.S) : ("")
                console.log(`Production numbers: ${production_nums_string}`)
                for (let i = 0; i < production_nums_modifier.length; i++) {
                    production_nums_modifier.pop()
                }
                production_nums_string.split(" ").map(element => {
                    production_nums_modifier.push(element)
                })
            }
        }
    });
}


export const updateNumbers = ({ debug_nums, old_debug_nums, production_nums, old_production_nums }: { debug_nums: string, old_debug_nums: string, production_nums: string, old_production_nums: string }) => {
    console.log(`Updating debug: ${debug_nums}`)
    console.log(`Updating production: ${production_nums}`)

    // Create the DynamoDB service object
    var ddb = new AWS.DynamoDB()

    ddb.deleteItem({
        TableName: 'phonenumbers',
        Key: {
            'numbers': { S: old_production_nums },
        }
    }, (err, data) => {
        if (err) {
            console.log("Error:", err);
        } else {
            console.log("Success:", data);

            ddb.putItem({
                TableName: 'phonenumbers',
                Item: {
                    'numbers': { S: production_nums },
                }
            }, (err, data) => {
                if (err) {
                    console.log("Error:", err);
                } else {
                    console.log("Success:", data);
                    obtainNumbers()
                }
            });
        }
    });

    ddb.deleteItem({
        TableName: 'debugnumbers',
        Key: {
            'numbers': { S: old_debug_nums },
        }
    }, (err, data) => {
        if (err) {
            console.log("Error:", err);
        } else {
            console.log("Success:", data);

            ddb.putItem({
                TableName: 'debugnumbers',
                Item: {
                    'numbers': { S: debug_nums },
                }
            }, (err, data) => {
                if (err) {
                    console.log("Error:", err);
                } else {
                    console.log("Success:", data);
                    obtainNumbers()
                }
            });
        }
    });

}

export default obtainNumbers

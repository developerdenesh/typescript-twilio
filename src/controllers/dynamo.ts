import AWS from 'aws-sdk'
import { debug } from 'console';

// Set the region 
AWS.config.update({ region: 'ap-southeast-1' });

export const debug_nums: Array<string> = [];
export const production_nums: Array<string> = [];

let debug_nums_modifier = debug_nums
let production_nums_modifier = production_nums

const convertCommasToSpaces = ({ input }: { input: string }): string => {
    // First remove spaces, then reduce mutliple commas to one comma then replace comma with a space
    const answer: string = input.replace(/ /g, "").replace(/,+/g,',').replace(/,/g, " ")

    // If the last character is a space, remove it
    return (answer.charAt(answer.length - 1) === ' ') ? (answer.substring(0, answer.length - 1)) : (answer)
}


export const readNumbers = ({ modifier, tablename, ddb }: { modifier: Array<string>, tablename: string, ddb: AWS.DynamoDB }) => {
    ddb.scan({
        TableName: tablename,
    }, (err, data) => {
        if (err) {
            console.log("Error:", err);
        } else {
            if (data.Items && data.Items.length === 1) {
                // In case the data is undefined
                const nums_string: string = (data.Items[0].numbers.S) ? (data.Items[0].numbers.S) : ("")
                
                // Clear the modifier
                const length: number = modifier.length
                for (let i = 0; i < length; i++) {
                    modifier.pop()
                }

                // Add the new numbers to the modifier
                nums_string.split(" ").map(element => {
                    modifier.push(element)
                })

            } else if (data.Items && data.Items.length > 1) {
                console.error(`There are more than one entries in the db: ${tablename}`)
            }
        }
    });
}


const deleteAndUpdateItem = ({ old_numbers, new_numbers, tablename, ddb }: { old_numbers: string, new_numbers: string, tablename: string, ddb: AWS.DynamoDB }) => {
    ddb.deleteItem({
        TableName: tablename,
        Key: {
            'numbers': { S: old_numbers },
        }
    }, (err, data) => {
        if (err) {
            console.log("Error:", err);
        } else {
            ddb.putItem({
                TableName: tablename,
                Item: {
                    'numbers': { S: new_numbers },
                }
            }, (err, data) => {
                if (err) {
                    console.log("Error:", err);
                } else {
                    if (tablename === "debugnumbers") {
                        readNumbers({
                            modifier: debug_nums_modifier,
                            tablename: 'debugnumbers',
                            ddb: ddb
                        })
                    } else if (tablename === "phonenumbers") {
                        readNumbers({
                            modifier: production_nums_modifier,
                            tablename: 'phonenumbers',
                            ddb: ddb
                        })
                    }
                }
            });
        }
    });
}


const obtainNumbers = async () => {
    // Create the DynamoDB service object
    const ddb = new AWS.DynamoDB()

    // Call DynamoDB to read the item from the table
    readNumbers({
        modifier: debug_nums_modifier,
        tablename: 'debugnumbers',
        ddb: ddb
    })

    readNumbers({
        modifier: production_nums_modifier,
        tablename: 'phonenumbers',
        ddb: ddb
    })
}


export const updateNumbers = ({ debug_nums, old_debug_nums, production_nums, old_production_nums }: { debug_nums: string, old_debug_nums: string, production_nums: string, old_production_nums: string }) => {
    
    // Create the DynamoDB service object
    const ddb = new AWS.DynamoDB()

    const old_debug_nums_spaced = convertCommasToSpaces({ input: old_debug_nums })
    const old_production_nums_spaced = convertCommasToSpaces({ input: old_production_nums })
    const debug_nums_spaced = convertCommasToSpaces({ input: debug_nums })
    const production_nums_spaced = convertCommasToSpaces({ input: production_nums })

    // Delete and update the item in the DynamoDB
    deleteAndUpdateItem({
        old_numbers: old_production_nums_spaced,
        new_numbers: production_nums_spaced,
        tablename: 'phonenumbers',
        ddb: ddb
    })

    // Delete and update the item in the DynamoDB
    deleteAndUpdateItem({
        old_numbers: old_debug_nums_spaced,
        new_numbers: debug_nums_spaced,
        tablename: 'debugnumbers',
        ddb: ddb
    })
}


export default obtainNumbers

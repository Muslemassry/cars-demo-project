const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const tableName = 'car';
exports.handler = async () => {
    const params = {
        TableName: tableName
    };
    try {
        console.log('Fetching cars from table:', tableName);
        const data = await docClient.send(new ScanCommand(params));
        if (!data.Items || data.Items.length === 0) {
            throw new Error('Exception: No cars found in the database');
        }
        console.log('Successfully fetched', data.Items.length, 'cars');
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        console.error('Error fetching cars:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching cars', error })
        };
    }
};

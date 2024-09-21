// googleSheets.js


const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fs = require('fs');
const path = require('path');

// Load your Google Sheets API credentials
const CREDENTIALS_PATH = path.resolve('credentials.json'); // Update with your path
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Authenticate with Google Sheets API
async function authorize() {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync('token.json')));
    return oAuth2Client;
}

// Function to fetch data
async function fetchData() {
    const auth = await authorize();
    const spreadsheetId = '1IfxY7GOSX22sVN80aq_QccT515ImBSEcPDfGST8mEPA'; // Google Spreadsheet ID
    const range = 'Tabular!A2:L'; // Range of data (adjust as necessary)

    const response = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range,
    });

    const rows = response.data.values;
    if (!rows.length) {
        console.log('No data found.');
        return;
    }

    // Parse the fetched data
    const courses = rows.map((row) => ({
        courseCode: row[0], // Course
        theoryInitial: row[3], // Theory Initial
        theoryDay: row[4], // Theory Day
        theoryTime: row[5], // Theory Time
        theoryRoom: row[6], // Theory Room
        labInitial: row[7], // Lab Initial
        labDay: row[8], // Lab Day
        labTime: row[9], // Lab Time
        labRoom: row[10], // Lab Room
    }));

    return courses;
}

fetchData().then((data) => console.log(data)).catch(console.error);

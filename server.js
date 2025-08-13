const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.post('/upload-CSV', (req, res)=>{
    const uploadCSV = req.body;
    const csvString = req.body.csvData;
    const rows = csvString.split('\n');
    const headers = rows.shift();
    let SuspiciousCount = 0;
    for (row of rows){
        let dataPoints = row.split(',');

        if (Number(dataPoints[2]) > 10000){
            SuspiciousCount++;
        }
    }
    res.json({SuspiciousCount})
})

app.listen(3000);
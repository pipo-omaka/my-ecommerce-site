const { subscribe } = require('diagnostics_channel');
const express = require('express');
const router = express.Router();

/*
1. Read exitiog JSON file
2. Parse it into file
3. add new atat inarray
4. write array in file
*/

const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const {email} = req.body
    const subscribe = {subscribeAt : new Date(), email};

    const filePath = path.join(__dirname, "..", "data", "subscribe.json") ;

    //Step 1, 2 : Read exiting file and parse it into an array

    let subscribes = [];

    if(fs.existsSync(filePath)) 
        {
            let data = fs.readFileSync(filePath, "utf-8");
            subscribes = JSON.parse(data);

            //Step 3 : Append new data
            subscribes.push(subscribe)

            //Step 4 : Write array back into file
            fs.writeFileSync(filePath, JSON.stringify(subscribes, null, 2));
            res.status(200).json({message : 'Email Received', subscribe});
        } else {
            fs.writeFileSync(filePath, JSON.stringify(subscribe, null, 2))
            res.status(200).json({message : 'Email Received', subscribe});
        }

    
});

module.exports = router;
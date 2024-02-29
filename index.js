const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
var asyncLoop = require('node-async-loop');
const axios = require('axios');
const InputDataDecoder = require('ethereum-input-data-decoder');
const { ABI } = require('./abi.js');



// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.post('/api/history', (req, res) => {

    const URL = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${req.body.address}&startblock=0&endblock=99999999&sort=desc&page=1&offset=50&apikey=48155D87J73SYAU8WQ4KKH4AQ4VS5MHY4Q`


    axios.get(URL)
        .then(function (response) {
            res.json({
                status: false,
                data: response.data.result,
                code: 200
            })
            // handle success
            // console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    // https://api.etherscan.io/api?module=account&action=txlist&address=0xEe1AFdEC5A0f952fb5932d59CFD5ac2B0CBd697F&startblock=0&endblock=99999999&sort=asc&apikey=48155D87J73SYAU8WQ4KKH4AQ4VS5MHY4Q
    //     const infuraApiKey = '8f61122d11514e96ab84a1ffba67763e';
    //     const infuraUrl = `https://sepolia.infura.io/v3/8f61122d11514e96ab84a1ffba67763e`;
    //     const web3 = new Web3(infuraUrl);

    //     // Get the transaction count (number of transactions sent from the address)
    //     web3.eth.getTransactionCount(req.body.address)
    //         .then(count => {
    //             const List = [];
    //             // Retrieve transaction history
    //             for (let i = 0; i < count; i++) {
    //                 web3.eth.getTransactionFromBlock('latest', i)
    //                     .then(transaction => {
    //                         console.log(i,transaction)
    //                         List.push(transaction)
    //                         if((List.length-1) === count) {
    //                             res.json({
    //                                 status: false,
    //                                 data: List,
    //                                 code: 200
    //                             })
    //                         }

    //                     })
    //                     .catch(error => {
    //                         console.error('Error retrieving transaction:', error);
    //                     });
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error retrieving transaction count:', error);
    //         });

});

app.post('/api/decode', (req, res) => {
    const decoder = new InputDataDecoder(ABI);
    const data = decoder.decodeData(req.body.data);
    res.json({
        status: false,
        data: data,
        code: 200
    })
}
);

app.post('/api/submissioncode', (req, res) => {
    const list = [
        "08251",
        "08252",
        "08253",
        "08254",
        "08255",
        "08256",
        "08257",
        "08258",
        "08259",
        "08260",
        "08261",
        "08262",
        "08263",
        "08264",
        "08265",
        "08266",
        "08267",
        "08268",
        "08269",
        "08270",
        "08271",
        "08272",
        "08273",
        "08274",
        "08275"
    ]
    const code = req.body.code;
    const result = list.find(item => item === code);
    if (result) {
        res.json({
            status: true,
            data: result,
            code: 200
        })
    } else {
        res.json({
            status: false,
            message:"Invalid submission code",
            code: 400
        })
    }
}
);



app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
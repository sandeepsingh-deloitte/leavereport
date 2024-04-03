const cds = require("@sap/cds");

const express = require('express')
const app = express()
const https = require('https');

const VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES)
const CREDENTIALS = VCAP_SERVICES.xsuaa[0].credentials

module.exports = cds.service.impl(async function () {

    this.on('READ', 'LeaveReport', async (req) => {

        // doCallEndpoint()
        //     .then((data) => {
        //         console.log('Successfully called remote endpoint.');
        //         return data ? data : [];
        //     }).catch((error) => {
        //         console.log('Error occurred while calling REST endpoint ' + error);

        //     })

        let requests = [];

        let data = await doCallEndpoint();

        data.map((data1) => {
            requests.push({
                Request: data1.RequestNumber,
                RequestType: data1.LeaveType
            })
        });

        requests.$count = requests.length;

        return requests;


        // let leaveService = await cds.connect.to("LeaveRequest");

        // const{LeaveRequest} = leaveService.entities;

        // let requests = await leaveService.run(SELECT.from(LeaveRequest));

        // return requests;
    });



});


// helper method to call the endpoint
const doCallEndpoint = async () => {
    return new Promise((resolve, reject) => {
        return fetchJwtToken()
            .then((jwtToken) => {
                let data = [];
                const options = {
                    host: '96174b4dtrial-dev-leaveform-srv.cfapps.us10-001.hana.ondemand.com',
                    path: '/odata/v4/LeaveRequest/LeaveRequest?$select=*',
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + jwtToken,
                        Accept: "application/json"
                    }
                }
                const req = https.request(options, (res) => {
                    res.setEncoding('utf8')
                    const status = res.statusCode
                    if (status !== 200 && status !== 201) {
                        return reject(new Error(`Failed to call endpoint. Error: ${status} - ${res.statusMessage}`))
                    }
                    res.on('data', (d) => {
                        try {
                            data = JSON.parse(d).value;
                        }
                        catch (oErr) {

                        }
                        resolve(data);

                    })
                });

                req.on('error', (error) => {
                    return reject({ error: error })
                });

                req.write('done')
                req.end();
            })
            .catch((error) => {
                reject(error)
            })
    })
}

// jwt token required for calling REST api
const fetchJwtToken = function () {
    return new Promise((resolve, reject) => {
        const options = {
            host: CREDENTIALS.url.replace('https://', ''),
            path: '/oauth/token?grant_type=client_credentials&response_type=token',
            headers: {
                Authorization: "Basic " + Buffer.from(CREDENTIALS.clientid + ':' + CREDENTIALS.clientsecret).toString("base64")
            }
        }
        https.get(options, res => {
            res.setEncoding('utf8')
            let response = ''
            res.on('data', chunk => {
                response += chunk
            })
            res.on('end', () => {
                try {
                    const jwtToken = JSON.parse(response).access_token
                    resolve(jwtToken)
                } catch (error) {
                    return reject(new Error('Error while fetching JWT token'))
                }
            })
        })
            .on("error", (error) => {
                return reject({ error: error })
            });
    })
}


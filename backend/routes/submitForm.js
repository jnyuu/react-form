const { validationResult, check } = require('express-validator')

const express = require('express');
const { google } = require("googleapis");
const router = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();
const userModel = require("../models/user");

const cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['token'];
    return token;
};

router.post("/",
    check("step1", "Step 1 - array error").isArray({ min: 1, max: 10 }),
    check("step1.*.industry", "Step 1 industry - string error").isString(),
    check("step1.*.priority", "Step 1 priority - int error").isInt({ min: 0, max: 10 }),
    check("step2", "Step 2 - string error").isString(),
    check("step3", "Step 3 - array error").isArray({ min: 1, max: 10 }),
    check("step3.*.decisionMaker", "Step 3 decision maker - string error").isString(),
    check("step3.*.priority", "Step 3 priority - int error").isInt({ min: 0, max: 10 }),
    check("step4", "Step 4 - array error").isArray({ min: 1, max: 5 }),
    check("step4.*.employees", "Step 4 employees - string error").isString(),
    check("step4.*.priority", "Step 4 priority - int error").isInt({ min: 0, max: 10 }),
    check("step5", "Step 5 - object error").isObject(),
    check("step5.revenue", "Step 5 revenue - string error").isString(),
    check("step5.funding", "Step 5 funding - string error").isString(),
    check("step6", "Step 6 - string error").isString(),
    check("step7", "Step 7 - string error").isArray({ min: 1, max: 5 }),
    check("step7.*.value", "Step 7 region - string error").isString(),
    check("step8", "Step 8 - string error").isArray({ min: 1, max: 5 }),
    check("step8.*.value", "Step 8 region - string error").isString(),
    check("step9", "Step 9 - string error").isString(),
    check("step10", "Step 10 - array error").isArray({ min: 5, max: 5 }),
    check("step10.*.dataPoint", "Step 10 data point - string error").isString(),
    check("step10.*.checked", "Step 10 checked - bool error").isBoolean(),
    check("step11", "Step 11 - object error").isObject(),
    check("step11.productJob", "Step 11 product job - string error").isString(),
    check("step11.customerSolutions", "Step 11 customer solutions - string error").isString(),
    check("step12", "Step 12 - string error").isString(),
    check("step13", "Step 13 - array error").isArray({ min: 1, max: 10 }),
    check("step13.*", "Step 13 - string error").isString(),
    check("step14", "Step 14 - string error").isString()
    , async function (req, res, next) {

        const validationResults = validationResult(req);

        console.log(validationResults.errors);
        if (validationResults.errors.length !== 0) {
            return res.status(400).send({
                message: validationResults.errors
            });;
        };

        const authToken = cookieExtractor(req)
        let decodedLogin;
        if (authToken) {
            try {
                decodedLogin = jwt.verify(authToken, process.env.JWT_SECRET)
            } catch (e) {
                console.log(e);
            }
        }

        const userExists = await userModel.find({ login: decodedLogin })

        if (userExists.length > 0) {
            // user found
            // console.log("user found : " + userExists[0]);
            // console.log("submit icp form found user ");

            const spreadsheetData = userExists[0].ICPSpreadsheet
            const auth = new google.auth.GoogleAuth({
                keyFile: "backend/keys.json"
                ,
                scopes: "https://www.googleapis.com/auth/spreadsheets",
            });

            const authClientObject = await auth.getClient();

            const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

            const step1Row1 = [];
            const step1Row2 = [];
            const step2 = [req.body.step2];
            const step3Row1 = [];
            const step3Row2 = [];
            const step4Row1 = [];
            const step4Row2 = [];
            const step5Row1 = [req.body.step5.revenue];
            const step5Row2 = [req.body.step5.funding];
            const step6 = [req.body.step6];
            const step7 = [];
            const step8 = [];
            const step9 = [req.body.step9];
            const step10Row1 = [];
            const step10Row2 = [];
            const step11Row1 = [req.body.step11.productJob];
            const step11Row2 = [req.body.step11.customerSolutions];
            const step12 = [req.body.step12];
            const step13 = req.body.step13;
            const step14 = [req.body.step14];

            req.body.step1.forEach(el => {
                step1Row1.push(el.industry)
                step1Row2.push(el.priority)
            });

            req.body.step3.forEach(el => {
                step3Row1.push(el.decisionMaker)
                step3Row2.push(el.priority)
            });

            req.body.step4.forEach(el => {
                step4Row1.push(el.employees)
                step4Row2.push(el.priority)
            });

            req.body.step7.forEach(el => {
                step7.push(el.value)
            });

            req.body.step8.forEach(el => {
                step8.push(el.value)
            });

            req.body.step10.forEach(el => {
                step10Row1.push(el.dataPoint)
                if (el.checked) {
                    step10Row2.push("Yes")
                } else {
                    step10Row2.push("No")
                }
            });

            for (let i = 0; i < 9; i++) {
                step1Row1.push("")
                step1Row2.push("")
                step3Row1.push("")
                step3Row2.push("")
                step4Row1.push("")
                step4Row2.push("")
                step5Row1.push("")
                step5Row2.push("")
                step7.push("")
                step8.push("")
                step13.push("")
            }


            try {
                await googleSheetsInstance.spreadsheets.values.update({
                    auth: auth, //auth object
                    spreadsheetId: spreadsheetData.spreadsheetId, //spreadsheet id
                    range: spreadsheetData.sheetName + "!B2:Z31", //sheet name and range of cells
                    valueInputOption: "USER_ENTERED", // The information will be passed according to what the usere passes in as date, number or text
                    resource: {
                        values: [step1Row1, step1Row2, step2,
                            step3Row1, step3Row2, step4Row1, step4Row2,
                            step5Row1, step5Row2, step6, step7, step8, step9,
                            step10Row1, step10Row2, step11Row1, step11Row2,
                            step12, step13, step14]
                    },
                });

                console.log("form submit : " + decodedLogin);

                return res.status(200).send({
                    message: "Form submitted"
                });


            } catch (err) {
                return res.status(400).send({
                    message: err
                });;
            }
        } else {
            console.log("not found user submit icp form ");

            // user not found
            return res.status(400).send({
                message: "user not found"
            });;
        }
    });

module.exports = router;
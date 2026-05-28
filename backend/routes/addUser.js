const express = require('express');
const router = express.Router();

const { google } = require("googleapis");
const path = require('path');
const { validationResult, check } = require('express-validator')
const userModel = require("../models/user");
require('dotenv').config();

router.get("/",
    function (req, res, next) {
        res.status(200)
        res.sendFile(path.join(__dirname, '..', '..', 'build', 'addUser.html'));
    });

router.post("/",
    check("key", "key doesnt exist").exists(),
    check("key", "key isnt a string").isString(),
    check("userName", "userName doesnt exist").exists(),
    check("userName", "userName isnt a string").isString(),
    check("userPassword", "userPassword doesnt exist").exists(),
    check("userPassword", "userPassword isnt a string").isString(),
    async function (req, res, next) {
        console.log('addUser POST payload:', {
            body: req.body,
            envAddUserKey: process.env.ADD_USER_KEY ? '[REDACTED]' : undefined,
        });

        const validationResults = validationResult(req);
        if (!validationResults.isEmpty()) {
            console.error('addUser validation failed:', validationResults.array());
            return res.status(400).send({
                message: validationResults.array()
            });
        }

        const isKeyValid = req.body.key === process.env.ADD_USER_KEY;
        console.log('addUser key valid:', isKeyValid);
        if (!isKeyValid) {
            return res.status(400).send({
                message: "invalid key"
            });
        }

        const existingUser = await userModel.findOne({ login: req.body.userName });
        console.log('addUser existing user found:', Boolean(existingUser), 'for login:', req.body.userName);
        if (existingUser) {
            return res.status(400).send({
                message: "user with the same username exists in the database"
            });
        }

        console.log('addUser creating Google Sheets sheet for:', req.body.userName);
        const auth = new google.auth.GoogleAuth({
            keyFile: "backend/keys.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        const authClientObject = await auth.getClient();
        console.log('addUser Google auth client created');

        const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

        const newSheet = await addSheet(googleSheetsInstance, process.env.SPREADSHEET_ID, req.body.userName, req.body.userPassword);
        console.log('addUser addSheet result:', newSheet);

        if (!newSheet.sheetCreated) {
            console.error('addUser sheet creation failed:', newSheet);
            return res.status(400).send({
                message: "error when adding a sheet",
                details: newSheet
            });
        }

        const user = new userModel({
            login: req.body.userName,
            password: req.body.userPassword,
            token: "",
            spreadsheetData: {
                spreadsheetId: process.env.SPREADSHEET_ID,
                sheetId: newSheet.randomId,
                sheetName: req.body.userName
            },
            formData: {
                step1: [{ value: "", priority: 0 }],
                step2: "",
                step3: [{ value: "", priority: 0 }],
                step4: [{ value: "1 person", priority: 0 }],
                step5: { value1: "Don't Know", value2: "" },
                step6: "",
                step7: [{ label: "Choose the : country/region/state", value: "Choose the : country/region/state" }],
                step8: [{ label: "Choose the : country/region/state", value: "Choose the : country/region/state" }],
                step9: "",
                step10: [
                    { value: "email", checked: false },
                    { value: "phone", checked: false },
                    { value: "text", checked: false },
                    { value: "socialMedia", checked: false },
                    { value: "faceToFace", checked: false }
                ],
                step11: { value1: "", value2: "" },
                step12: "",
                step13: [""],
                step14: ""
            }
        });

        try {
            await user.save();
            console.log('addUser saved user:', req.body.userName);
        } catch (err) {
            console.error('addUser user.save failed:', err);
            return res.status(500).send({ message: 'Failed to save new user', error: err.toString() });
        }

        return res.status(200).send({ message: "user added to database" });
    }
);

async function addSheet(api, spreadsheetId, tabName, password) {
    try {
        if ((await api.spreadsheets.get({ spreadsheetId: spreadsheetId })).data.sheets
            .filter(sheet => sheet.properties.title === tabName).length === 0) {
            let randomId = Math.floor(Math.random() * (999999999 - 1 + 1) + 1);

            while ((await api.spreadsheets.get({ spreadsheetId: spreadsheetId })).data.sheets
                .filter(sheet => sheet.properties.sheetId === randomId).length !== 0) {
                randomId = Math.floor(Math.random() * (999999999 - 1 + 1) + 1);
            }
            await api.spreadsheets.batchUpdate({
                spreadsheetId: spreadsheetId,
                resource: {
                    requests: [{
                        addSheet: {
                            properties: {
                                title: tabName,
                                sheetId: randomId
                            }
                        }
                    }]
                }
            });

            const rows = [{
                values: createColoredRow("Instant login link :  https://localhost:3000/login-form?username=" + tabName + "&password=" + password, {
                    red: 0.2,
                    green: 0.66,
                    blue: 0.33
                })
            }, {
                values: createColoredRow("STEP 1 - example description ", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 1 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 2 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 3 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 3 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 4 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 4 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 5 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 5 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 6 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 7 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 8 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 9 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 10 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 10 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 11 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 11 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 12 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 13 - example description", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 14 - example description", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            },
            ]


            await api.spreadsheets.batchUpdate({
                spreadsheetId: spreadsheetId,
                resource: {
                    requests: [
                        {
                            updateCells: {
                                rows: rows,
                                "range": {
                                    "sheetId": randomId, // Sheet id
                                    "startColumnIndex": 0,
                                    "endColumnIndex": 20,
                                    "startRowIndex": 0,
                                    "endRowIndex": 21
                                },
                                "fields": "*"
                            }
                        }
                    ]
                },
            });

            return { sheetCreated: true, randomId: randomId }
        } else {
            console.warn('addSheet skipped because tab already exists:', tabName);
            return { sheetCreated: false, reason: 'tab already exists' };
        }
    } catch (err) {
        console.error('addSheet caught error:', err);
        return { sheetCreated: false, error: err.toString(), stack: err.stack };
    }
}

function createColoredRow(firstvalue, rowBgColor) {
    const array = []
    array.push({
        userEnteredValue: {
            stringValue: firstvalue
        },
        userEnteredFormat: {
            backgroundColor: rowBgColor
        }
    })
    for (let i = 0; i < 14; i++) {
        array.push({
            userEnteredValue: {
                stringValue: ""
            },
            userEnteredFormat: {
                backgroundColor: rowBgColor
            }
        })
    }
    return array;
}

module.exports = router;
const express = require('express');
const router = express.Router();

const { google } = require("googleapis");
const path = require('path');
const { validationResult, check } = require('express-validator')
const userModel = require("../models/user");

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

        const validationResults = validationResult(req);

        if (validationResults.errors.length !== 0) {
            return res.status(400).send({
                message: validationResults.errors
            });;
        };

        if (req.body.key !== "WT3%Sj4hAlAoyNVKx^V%D4OrmTDJ8EiHI46O7Y2vYVW#E3bu0O") {
            res.status(400)
            res.send({
                message: "invalid key"
            });
        } else {

            const userExists = await userModel.find({ login: req.body.userName })

            if (userExists.length > 0) {
                return res.status(400).send({
                    message: "user with the same username exists in the database"
                });;
            } else {

                const auth = new google.auth.GoogleAuth({
                    keyFile: "backend/keys.json"
                    ,
                    scopes: "https://www.googleapis.com/auth/spreadsheets",
                });

                const authClientObject = await auth.getClient();

                const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });

                const newSheet = await addSheet(googleSheetsInstance, "1_51fJ7RBr8J5UlrjYxT_nBhYUb4F8KLbmNC3MU7flCk", req.body.userName, req.body.userPassword)

                if (newSheet.sheetCreated) {
                    const user = new userModel({
                        login: req.body.userName,
                        password: req.body.userPassword,
                        scraperUsed: false,
                        token: "",
                        scrapedCompaniesData: [
                            {}
                        ],
                        ICPTimeTracked: [],
                        ICPSpreadsheet: {
                            spreadsheetId: "1_51fJ7RBr8J5UlrjYxT_nBhYUb4F8KLbmNC3MU7flCk",
                            sheetId: newSheet.randomId,
                            sheetName: req.body.userName
                        },
                        ICPForm: {
                            step1: [
                                {
                                    industry: "",
                                    priority: 0
                                }
                            ],
                            step2: "",
                            step3: [
                                {
                                    decisionMaker: "",
                                    priority: 0
                                }
                            ],
                            step4: [
                                {
                                    employees: "1 person",
                                    priority: 0
                                }
                            ],
                            step5: {
                                revenue: "Don't Know",
                                funding: ""
                            },
                            step6: "",
                            step7: [
                                {
                                    label: "Choose the : country/region/state",
                                    value: "Choose the : country/region/state"
                                }
                            ],
                            step8: [
                                {
                                    label: "Choose the : country/region/state",
                                    value: "Choose the : country/region/state"
                                }
                            ],
                            step9: "",
                            step10: [
                                {
                                    dataPoint: "email",
                                    checked: false
                                },
                                {
                                    dataPoint: "phone",
                                    checked: false
                                },
                                {
                                    dataPoint: "text",
                                    checked: false
                                },
                                {
                                    dataPoint: "socialMedia",
                                    checked: false
                                },
                                {
                                    dataPoint: "faceToFace",
                                    checked: false
                                }
                            ],
                            step11: {
                                productJob: "",
                                customerSolutions: ""
                            },
                            step12: "",
                            step13: [
                                ""
                            ],
                            step14: ""
                        }
                    });
                    try {
                        await user.save();
                    } catch (err) {
                        console.log(err);
                        return response.status(500).send(err);
                    }
                    return res.status(200).send({
                        message: "user added to database"
                    });
                } else {
                    return res.status(400).send({
                        message: "error when adding a sheet"
                    });
                }
            }
        }
    });

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
                values: createColoredRow("User data :  https://sulma-icp-2.herokuapp.com/login-form?username=" + tabName + "&password=" + password, {
                    red: 0.2,
                    green: 0.66,
                    blue: 0.33
                })
            }, {
                values: createColoredRow("STEP 1 - Industry", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 1 - Industry priority (0-10)", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 2 - Who or what to avoid", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 3 - Decision maker", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 3 - Decision maker priority (0-10)", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 4 - Employee count", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 4 - Employee count priority (0-10)", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 5 - Revenue", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 5 - Funding", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 6 - Associations", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 7 - Where are they from?", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 8 - What regions do they target?", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 9 - Customer Similarities", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 10 - Data point", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 10 - Data point priority", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 11 - Product Job", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 11 - Customer Solutions", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 12 - Customers' special requirements", {
                    red: 0.75,
                    green: 0.56,
                    blue: 0.00
                })
            }, {
                values: createColoredRow("STEP 13 - Top competitors", {
                    red: 0.98,
                    green: 0.74,
                    blue: 0.02
                })
            }, {
                values: createColoredRow("STEP 14 - top goal for the cooperation", {
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
            return { sheetCreated: false }
        }
    } catch (err) {
        return { sheetCreated: false }
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
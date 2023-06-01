const { validationResult } = require('express-validator')
const { check } = require('express-validator');


const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const userModel = require("../models/user");

router.post("/",
    // check("step1", "Step 1 - array error").isArray({ min: 1, max: 10 }),
    // check("step1.*.industry", "Step 1 industry - string error").isString(),
    // check("step1.*.priority", "Step 1 priority - int error").isInt({ min: 0, max: 10 }),
    // check("step2", "Step 2 - string error").isString(),
    // check("step3", "Step 3 - array error").isArray({ min: 1, max: 10 }),
    // check("step3.*.decisionMaker", "Step 3 decision maker - string error").isString(),
    // check("step3.*.priority", "Step 3 priority - int error").isInt({ min: 0, max: 10 }),
    // check("step4", "Step 4 - array error").isArray({ min: 9, max: 9 }),
    // check("step4.*.employees", "Step 4 employees - string error").isString(),
    // check("step4.*.priority", "Step 4 priority - int error").isInt({ min: 0, max: 10 }),
    // check("step5", "Step 5 - object error").isObject(),
    // check("step5.revenue", "Step 5 revenue - string error").isString(),
    // check("step5.funding", "Step 5 funding - string error").isString(),
    // check("step6", "Step 6 - string error").isString(),
    // check("step7", "Step 7 - string error").isArray({ min: 1, max: 5 }),
    // check("step7.*.value", "Step 7 region - string error").isString(),
    // check("step8", "Step 8 - string error").isArray({ min: 1, max: 5 }),
    // check("step8.*.value", "Step 8 region - string error").isString(),
    // check("step9", "Step 9 - string error").isString(),
    // check("step10", "Step 10 - array error").isArray({ min: 5, max: 5 }),
    // check("step10.*.dataPoint", "Step 10 data point - string error").isString(),
    // check("step10.*.checked", "Step 10 checked - bool error").isBoolean(),
    // check("step11", "Step 11 - object error").isObject(),
    // check("step11.productJob", "Step 11 product job - string error").isString(),
    // check("step11.customerSolutions", "Step 11 customer solutions - string error").isString(),
    // check("step12", "Step 12 - string error").isString(),
    // check("step13", "Step 13 - array error").isArray({ min: 1, max: 10 }),
    // check("step13.*", "Step 13 - string error").isString(),
    // check("step14", "Step 14 - string error").isString(),
    async function (req, res, next) {

        // UPDATE USER VALUE
        await userModel.updateOne({ login: '123' }, { password: "1111111111" }).then(result => {
            const { matchedCount, modifiedCount } = result;
            if (matchedCount && modifiedCount) {
                console.log(`Successfully updated the item.`)
            }
        })
            .catch(err => console.error(`Failed to update the item: ${err}`))


        // FIND USER BY LOGIN
        const userExists = await userModel.find({ login: "123" })
        if (userExists.length > 0) {
            // user found
            console.log("user found : " + userExists[0]);

        } else {
            // user not found
            console.log("user not found");
        }

        //ADD A NEW USER
        // const user = new userModel(request.body);
        // try {
        //     await user.save();
        //     response.send(user);
        // } catch (err) {
        //     console.log(err);
        //     response.status(500).send(err);
        // }


        //check if user exists
        //create a user
        //read a value from user
        //save value to user

        res.send("TEST RESPONSE");
    });

module.exports = router;



// app.get("*", (req, res) => {
//   console.log(req.path);
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

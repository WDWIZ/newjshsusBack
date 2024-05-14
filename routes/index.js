const express = require('express');
const moment = require('moment');
const env = process.env;

function indexRouter(sql){
    const router = express.Router();

    router.get('/today', async (req, res, next) => {
        let today = new Date();
        today = moment(today).format("YYYY-MM-DD");
        let msg = await sql.query(`
            SELECT *
            FROM good
            WHERE workdate = "${today}"
        `, {onlyVal: true});

        if (msg.length > 0){
            msg = msg.map((x, idx) => {
                x = {
                    ...x,
                    workdate: today
                }

                return x;
            });
        }
        res.json(msg);
    });

    return router;
}

module.exports = indexRouter;
const express = require('express');
const moment = require('moment');
const env = process.env;

function indexRouter(sql){
    const router = express.Router();

    router.get('/today', async (req, res, next) => {
        const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);

        const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
        const kr_curr = new Date(utc + (KR_TIME_DIFF));
        let today = kr_curr;
        
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

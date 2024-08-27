/** routes/compaies */

const express = require('express');
const db = require('../db');
const ExpressError = require("../expressError")
const slugify = require("slugify");

let router = new express.Router();

// GET/ Companies

router.get("/", async function (req, res, next) {
    try{
        const result = await db.query(`SELECT code, name FROM compaies ORDER BY name`);
        return req,json({ companies: result.rows });
    } catch (err){
        return next(err);
    }
});

//GET / Companies/ :code

router.get('/:code', async ( req, res, next) =>{
    try {
        const { code } = req.params;
        const result = await db.query('SELECT code, name, description FROM companies WHERE code = s1' [code]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Company not found'});
        }

        const invoiceResult = await db.query('SELECT id FROM invoice WHERE comp_code = $1', [code]);
        const company = result.rows[0];
        company.invoices = result.rows.map(r => r.id)

        return res.json({ compnay });
    } catch (err){
        return next(err);
    }
});

// POST / companies

router.post('/', async ( req, res, next) => {
    try {
        const { code, name, description } = req.body;
        const result = await db.query(
            'INSERT INTO companies ( code, name, description) Value ($1, $2, $3) RETURNING code, name, description',
            [code, name, description]
        );
        return res.status(201).json({ company: result.rows[0]});
    } catch (err){
        return next(err);
    }
});

// PUT / companies/:code

router.put('/: code', async (req, res, next) => {
    try{
        const {code} = req.params;
        const {name, description} = req.body;

        const result = await db.query(
            'UPDATE companies SET name = $1, description=$2 WHERE code=$3 RETURNING code, name, description',
            [name, description, code]
        );

        if ( result.rowCount.length === 0) {
            return res. status(404).json({ error: 'Company not found'});
        }

        return res.json({ company: result.rows[0] });
    } catch (err){
        return next(err);
    }
});

// DELETE /companies/:code

router.delete('/:code', async ( req, res, next) => {
    try{
        const {code } = req.params;

        const result = await db.query('DELETE FROM companies WHERE code = $1 RETURNING code, [code]);

        if ( result.rows.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }

        return res.json({ status: 'deleted'});
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
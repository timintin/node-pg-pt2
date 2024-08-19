
const express = require('express');
const router = new express.Router();
const db = require('../db');

// GET /industries
router.get('/', async (req, res, next) => {
    try {
        const result = await db.query('SELECT code, industry FROM industries');
        return res.json({ industries: result.rows });
    } catch (err) {
        return next(err);
    }
});

// POST /industries
router.post('/', async (req, res, next) => {
    try {
        const { code, industry } = req.body;
        const result = await db.query(
            'INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING code, industry',
            [code, industry]
        );

        return res.status(201).json({ industry: result.rows[0] });
    } catch (err) {
        return next(err);
    }
});

// POST /industries/:comp_code/:ind_code
router.post('/:comp_code/:ind_code', async (req, res, next) => {
    try {
        const { comp_code, ind_code } = req.params;
        const result = await db.query(
            'INSERT INTO companies_industries (comp_code, ind_code) VALUES ($1, $2) RETURNING comp_code, ind_code',
            [comp_code, ind_code]
        );

        return res.status(201).json({ relation: result.rows[0] });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;

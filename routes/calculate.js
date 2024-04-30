const express = require('express');
const Zakat = require('./zakat.model');

const router = express.Router();

router.post('/calculate', (req, res) => {
  const { assets, debts, nisabMethod, zakatDate } = req.body;

  const zakat = new Zakat(assets, debts, nisabMethod, zakatDate);
  const { zakatAmount, isDue } = zakat.isZakatDue();

  res.json({ zakatAmount, isDue });
});

module.exports = router;
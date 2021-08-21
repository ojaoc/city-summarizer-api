const express = require('express');
const { listCities, listCityDetails } = require('../controllers/city');

const router = express.Router();

/* GET city list. */
router.get('/list', async (req, res) => {
  try {
    const cityList = await listCities(req, res);
    res.send(cityList);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* GET city details list. */
router.get('/list-details', (req, res) => {
  listCityDetails(req, res);
});

module.exports = router;

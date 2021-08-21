const express = require('express');
const { listCities, listCityDetails } = require('../controllers/city');
const { notFoundMessage } = require('../utils/consts');

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
router.get('/list-details', async (req, res) => {
  try {
    const cityListDetails = await listCityDetails(req, res);
    res.send(cityListDetails);
  } catch (err) {
    if (err.message === notFoundMessage) {
      res.status(404).send(err.message);
      return;
    }
    res.status(500).send(err.message);
  }
});

module.exports = router;

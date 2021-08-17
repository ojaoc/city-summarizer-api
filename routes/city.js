const express = require('express');
const { listCities, listCityDetails } = require('../controllers/city');

const router = express.Router();

/* GET city list. */
router.get('/list', (req, res) => {
  listCities(req, res);
});

/* GET city details list. */
router.get('/list-details', (req, res) => {
  listCityDetails(req, res);
});

module.exports = router;

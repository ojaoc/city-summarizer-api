const express = require('express');
const { listCities, listCityDetails } = require('../controllers/city');
const { notFoundMessage } = require('../utils/consts');

const router = express.Router();

router.get('/list', async (req, res) => {
  // #swagger.tags = ['City']
  // #swagger.description = 'Enpoint to obtain list of city names from a query prefix'
  // #swagger.parameters['q'] = { in: 'query', description: 'Query Prefix' }
  try {
    const cityList = await listCities(req, res);
    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/City_Name" },
      description: 'List of cities acording to query prefix'
      } */
    res.send(cityList);
  } catch (err) {
    // #swagger.responses[500]
    res.status(500).send(err.message);
  }
});

router.get('/list-details', async (req, res) => {
  // #swagger.tags = ['City']
  // #swagger.description = 'Enpoint to obtain list of city details from a list of cities'
  // #swagger.parameters['q'] = { in: 'query', description: 'City names separated by comma' }
  try {
    const cityListDetails = await listCityDetails(req, res);
    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/City_Details" },
      description: 'List of city details from list of city names'
      } */
    res.send(cityListDetails);
  } catch (err) {
    if (err.message === notFoundMessage) {
      /* #swagger.responses[404] =
        { description: 'Could not find any details for the provided city list'} */
      res.status(404).send(err.message);
      return;
    }
    // #swagger.responses[500]
    res.status(500).send(err.message);
  }
});

module.exports = router;

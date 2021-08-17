const axios = require('axios');
const { geoDbUrl, openWeatherMapUrl } = require('../utils/consts');

module.exports.listCities = ({ query: { q } }, res) => {
  if (!q) {
    return res
      .status(400)
      .send(
        'Query parameter "q" which corresponds to the query string for city listing is required'
      );
  }

  const resultData = [];
  const promises = [];

  promises.push(
    axios
      .get(geoDbUrl(q))
      .then(({ data: { data } }) => {
        resultData.push(...data);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      })
  );

  return Promise.all(promises).then(() => res.send(resultData));
};

module.exports.listCityDetails = ({ query: { q } }, res) => {
  if (!q) {
    return res
      .status(400)
      .send(
        'Query parameter "q" which corresponds to the query string for city DETAILS listing is required'
      );
  }

  const resultData = [];
  const promises = [];

  q.split(',').forEach((city) => {
    promises.push(
      axios
        .get(openWeatherMapUrl(city))
        .then(({ data }) => {
          resultData.push(data);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        })
    );
  });

  return Promise.all(promises).then(() => res.send(resultData));
};

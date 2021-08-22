const axios = require('axios');
const {
  geoDbUrl,
  openWeatherMapUrl,
  notFoundMessage,
} = require('../utils/consts');

module.exports.listCities = async ({ query: { q, offset } }) => {
  if (!q) {
    return [];
  }

  const resultData = { data: [], metadata: {} };

  try {
    const {
      data: { data, metadata },
    } = await axios.get(geoDbUrl(q, 10, offset));

    resultData.metadata = metadata;
    data.forEach(({ name, country }) => {
      resultData.data.push({ label: `${name}, ${country}`, value: name });
    });
  } catch (err) {
    throw new Error(err.message);
  }

  return resultData;
};

module.exports.listCityDetails = async ({ query: { q } }) => {
  if (!q) {
    return [];
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
          if (err.response.status === 404) {
            throw new Error(notFoundMessage);
          }
          throw new Error(err.message);
        })
    );
  });

  await Promise.all(promises);

  return resultData;
};

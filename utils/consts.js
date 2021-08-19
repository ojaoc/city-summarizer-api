/* eslint-disable comma-dangle */

// returns url for city listing public API GeoDB
module.exports.geoDbUrl = (namePrefix, limit, offset, sort) => {
  if (!namePrefix) {
    throw new Error('The GEODBURL requires a "namePrefix" as first param');
  }

  let url =
    'http://geodb-free-service.wirefreethought.com/v1/geo/cities?types=CITY';

  // limit query record number
  url += '&limit=';
  if (limit) {
    url += limit;
  } else {
    url += '10';
  }

  // offseting values (page)
  url += '&offset=';
  if (offset) {
    url += offset;
  } else {
    url += '0';
  }

  // search string
  if (namePrefix) {
    url += `&namePrefix=${namePrefix}`;
  }

  // sort by
  url += '&sort=';
  if (sort) {
    url += sort;
  } else {
    url += 'name';
  }

  return url;
};

// returns url for open weather map public API
module.exports.openWeatherMapUrl = (q) => {
  const apiKey = process.env.OPEN_WEATHER_KEY;
  if (!apiKey) {
    throw new Error(
      'API KEY for openweathermap required! (process.env.OPEN_WEATHER_KEY)'
    );
  } else if (!q) {
    throw new Error('Query string required for open weather api call');
  }
  return `https://api.openweathermap.org/data/2.5/weather?q=${q}&APPID=${apiKey}`;
};

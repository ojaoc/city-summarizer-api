// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

const doc = {
  info: {
    version: '1.0.0',
    title: 'City Summarizer API',
    description: 'Useful app to obtain information about any city',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'City',
      description: 'Endpoints',
    },
  ],
  definitions: {
    City_Name: {
      data: [
        {
          label: 'Faro, Portugal',
          value: 'Faro',
        },
      ],
      metadata: {
        currentOffset: 0,
        totalCount: 1,
      },
    },
    City_Details: [
      {
        coord: {
          lon: -8.6455,
          lat: 40.6443,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01n',
          },
        ],
        base: 'stations',
        main: {
          temp: 17.99,
          feels_like: 17.75,
          temp_min: 16.26,
          temp_max: 23.97,
          pressure: 1018,
          humidity: 73,
        },
        visibility: 10000,
        wind: {
          speed: 1.3,
          deg: 337,
          gust: 1.49,
        },
        clouds: {
          all: 1,
        },
        dt: 1629665804,
        sys: {
          type: 2,
          id: 2004836,
          country: 'PT',
          sunrise: 1629611527,
          sunset: 1629660190,
        },
        timezone: 3600,
        id: 2742611,
        name: 'Aveiro',
        cod: 200,
      },
    ],
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);

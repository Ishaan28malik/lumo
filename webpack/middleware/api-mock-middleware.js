const fs = require('fs');
const path = require('path');

const BASE_PATH = '/mock-api';
// Router configuration mapping paths to JSON files
const mockApirouterConfig = require('./mock-api-routes');

// Function to convert wildcard paths to regular expressions
const convertToRegex = (path) => {
  const regexString = path.replace(/\*/g, '.*');
  return new RegExp(`^${regexString}$`);
};

// Preprocess the router configuration to convert paths to regex
const processedRouterConfig = Object.keys(mockApirouterConfig).map((key) => ({
  regex: convertToRegex(key),
  file: mockApirouterConfig[key],
}));

const apiMockMiddleware = {
  name: 'api-mocker',
  path: BASE_PATH,
  middleware: (req, res) => {
    const url = req.originalUrl.replace(BASE_PATH, '');
    console.log(`finding json for => ${url}`);

    const matchedRoute = processedRouterConfig?.find((route) =>
      route.regex.test(url)
    );

    if (matchedRoute) {
      const filePath = path.join(__dirname, matchedRoute.file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Error reading file');
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
      });
    } else {
      res.status(404).send('Not Found');
    }
  },
};

module.exports = apiMockMiddleware;

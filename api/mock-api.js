const fs = require('fs');
const path = require('path');

// Same route config and JSON files the webpack dev server mock uses
const mockApirouterConfig = require('../webpack/middleware/mock-api-routes');

const MOCKS_DIR = path.join(process.cwd(), 'webpack', 'middleware');

const processedRouterConfig = Object.keys(mockApirouterConfig).map((key) => ({
  regex: new RegExp(`^${key.replace(/\*/g, '.*')}$`),
  file: mockApirouterConfig[key],
}));

// vercel.json rewrites /mock-api/<path>?<query> to /api/mock-api?path=<path>&<query>,
// so rebuild the original "/<path>?<query>" the route config expects
const getOriginalUrl = (reqUrl) => {
  const url = new URL(reqUrl, 'http://localhost');
  const mockPath = url.searchParams.get('path') || '';
  url.searchParams.delete('path');
  const query = url.searchParams.toString();
  return `/${mockPath}${query ? `?${query}` : ''}`;
};

// The queues page only shows messages from the last few days, so move the
// fixed dates in queues.json to the last few hours on every request
const withRecentQueueTimestamps = (data) => {
  const hour = 60 * 60 * 1000;
  const items = JSON.parse(data).map((item, index) => ({
    ...item,
    queue: {
      ...item.queue,
      timestamp: new Date(Date.now() - (index + 1) * hour).toISOString(),
    },
  }));
  return JSON.stringify(items);
};

module.exports = (req, res) => {
  const url = getOriginalUrl(req.url);
  const matchedRoute = processedRouterConfig.find((route) =>
    route.regex.test(url)
  );

  if (!matchedRoute) {
    res.status(404).json({ message: `No mock found for ${url}` });
    return;
  }

  fs.readFile(path.join(MOCKS_DIR, matchedRoute.file), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading mock file' });
      return;
    }
    const body = matchedRoute.file.endsWith('queues.json')
      ? withRecentQueueTimestamps(data)
      : data;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(body);
  });
};

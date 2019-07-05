const cacheableResponse = require('cacheable-response');
const { parse } = require('url');
const cors = require('cors');
const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const api = require('./services/get-item')

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000

const app = next({ dev });
const handler = app.getRequestHandler();

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res, pagePath, queryParams }) => ({
    data: await app.renderToHTML(req, res, pagePath, queryParams)
  }),
  send: ({ data, res }) => res.send(data)
})

app.prepare().then(() => {
  const server = express();

  server.use(cors());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.get('/', (req, res) => ssrCache({ req, res, pagePath: '/' }))

  server.get('/contact', (req, res) => {
    return app.render(req, res, '/contact', req.query)
  })

  server.get('/blog/:id', (req, res) => {
    const queryParams = { id: req.params.id }
    const pagePath = '/blog'
    return ssrCache({ req, res, pagePath, queryParams })
  })

  // Serve the item webpage with next.js as the renderer
  server.get('/posts', (req, res) => {
    const itemData = api.getItem()
    return app.render(req, res, '/posts', { itemData })
  })

  // When rendering client-side, we will request the same data from this route
  server.get('/_data/posts', (req, res) => {
    const itemData = api.getItem()
    return res.json(itemData)
  })

  server.get('*', (req, res) => {
    return handler(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})
.catch(ex => {
  console.error(ex.stack);
  process.exit(1);
});

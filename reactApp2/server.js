
import React from 'react'
import express from 'express';
import fs from 'fs';;
import ReactDOMServer from 'react-dom/server';
import App from './src/App';

const app = express();

app.use(express.static('./build'));

app.get('/*', (req, res) => {
  const appString = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
    );
  });
});

app.listen(3000, () => console.log('Server started'));
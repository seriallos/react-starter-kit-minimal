/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

require('source-map-support').install();

import 'babel/polyfill';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';

const server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname)));


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------


// The top-level React component + HTML template for it
const templateFile = path.join(__dirname, 'templates/index.html');
const template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('*', async (req, res, next) => {
  try {
    let notFound = false;
    let css = [];
    let data = {description: ''};

    data.title = 'Starter Kit';
    data.css = css.join('');
    data.body = '';
    let html = template(data);
    if (notFound) {
      res.status(404);
    }
    res.send(html);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});

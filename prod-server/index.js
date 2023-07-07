"use strict";

var _env = require("./config/env");
const express = require('express');
const app = express();
const port = 3000;
const registerRoutes = require('./routes').default;
(0, _env.setEnvironment)(app);
registerRoutes(app);
app.get('/', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.send('Running server in development mode');
  } else {
    return res.sendFile('index.html', {
      root: __dirname + '/../dist/'
    });
  }
});
app.listen(port, () => {
  console.log(`WOYM app listening on port ${port} in ` + process.env.NODE_ENV + ' mode');
});
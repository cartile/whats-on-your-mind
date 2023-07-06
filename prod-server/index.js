const express = require('express');
const app = express();
const port = 3000;
const registerRoutes = require('./routes').default;
registerRoutes(app);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`WOYM app listening on port ${port}`);
});
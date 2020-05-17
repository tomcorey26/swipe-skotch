import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

const port = 3000;
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

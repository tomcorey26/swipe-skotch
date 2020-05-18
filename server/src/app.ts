import express from 'express';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.get('/', (_, res) => {
  res.send({ data: 'The sedulous hyena ate the antelope!' });
});

//test
app.get('/hurr', (_, res) => {
  res.send('durr');
});

const port = 4000;
app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});

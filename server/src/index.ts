import express from 'express';
import search from './router/search';
import upload from './router/upload';
import path from 'path';

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && origin.includes('http://localhost')) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/search', search);
app.use('/api/upload', upload);
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

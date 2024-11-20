import express from 'express';
import search from './router/search';
import upload from './router/upload';
import path from 'path';

const app = express();
const PORT = 3000;

app.use('/api/search', search);
app.use('/api/upload', upload);
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

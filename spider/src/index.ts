import express from 'express';
import Search from './router/search';

const app = express();
const PORT = 3000;

app.use('/api/search', Search);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

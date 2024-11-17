import express from 'express';
import { parseHtml } from '../utils';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await parseHtml(req.query);
  res.send(result);
});

export default router;

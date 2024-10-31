import express from 'express';
const router = express.Router();
import { createSong,listSongs,updateSong,removeSong,returnStatistics } from '../controllers/SongControllers.js';

router.get('/', listSongs)
router.post('/', createSong)
router.put('/:id',updateSong )
router.delete('/:id',removeSong )
router.get('/stats', returnStatistics)

export default router;
import express from 'express';
import {
  getAllRoomServices,
  getRoomServiceById,
  updateRoomService,
} from '../controllers/roomserviceController.js';

const router = express.Router();

router.get('/', getAllRoomServices);
router.get('/:id', getRoomServiceById);
router.put('/:id', updateRoomService);

export default router;

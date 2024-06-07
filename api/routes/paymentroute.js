import express from 'express';
import handlePayment from '../controllers/paymentcontroller.js';
const router=express.Router();
router.post('/createpayment', handlePayment);
export default router;
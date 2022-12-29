// import { add_feedback, get_AppSettings } from '../../models/user/payment.model';

export const getPaymentReminder = async (req, res) => {
    try {

        res.status(200).json({ status: true, message: "Ok" })

        // res.status(200).json({ status: true,data: settings.body }) 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}

export const getPaymentMethod = async (req, res) => {
    try {
        const payment_method = [
                {
                    "payment_method_id": "1",
                    "payment_method_name": "Cash on Delivery",
                    "payment_method_status": "1"
                },
                {
                    "payment_method_id": "2",
                    "payment_method_name": "Razorpay",
                    "payment_method_status": "1"
                }
            ]
        
        
        res.status(200).json({ status: true, data: payment_method })

        // res.status(200).json({ status: true,data: settings.body }) 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}

export const getPaymentStatusUpdate = async (req, res) => {
    try {
        const { order_id,payment_status,payment_type,payment_method_id,razorpay_order_id,razorpay_payment_id,razorpay_signature,token} = req.body
        
        
        res.status(200).json({ status: true, message: "Ok" })

        // res.status(200).json({ status: true,data: settings.body }) 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}

export const getRazorpayMethod = async (req, res) => {
    try {
        const { amount, order_id } = req.body

        const list = 
           {
                    "id": "order_J1n7KFAxwLNeun",
                    "entity": "order",
                    "amount": 19400,
                    "amount_paid": 0,
                    "amount_due": 19400,
                    "currency": "INR",
                    "receipt": "pay01032022155456",
                    "offer_id": null,
                    "status": "created",
                    "attempts": 0,
                    "notes": [],
                    "created_at": 1646130359
            }
            
        res.status(200).json({ status: true, data: list })

        // res.status(200).json({ status: true,data: settings.body }) 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error })
    }
}
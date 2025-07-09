import Razorpay from "razorpay";


export const createOrder = async (req, res) => {
  const { amount, appointmentId } = req.body;

  console.log("amount, appointmentId",    amount, appointmentId)

  if (!amount || !appointmentId) {
    return res.status(400).json({ error: "Amount and Appointment ID required" });
  }

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: appointmentId,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({ order });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

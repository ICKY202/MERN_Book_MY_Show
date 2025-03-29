const bookingRoutes = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../model/BookingModel");
const ShowModel = require("../model/showModel");
const stripe = require("stripe")(process.env.stripe_secret_key);

bookingRoutes.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: "tok_visa",
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      customer: customer.id,
      receipt_email: token.email,
      description: "Token has been assigned to the movie!",
    });
    const transactionId = paymentIntent.id;
    res.send({
      success: true,
      message: "Payment has been made successfully",
      data: transactionId,
    });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});
bookingRoutes.post("/book-show", authMiddleware, async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    const show = await ShowModel.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, ...req.body.seats];
    await ShowModel.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });
    res.send({
      success: true,
      message: "Show has been booked successfully",
      data: booking,
    });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

bookingRoutes.get(
  "get-all-bookings-by-user",
  authMiddleware,
  async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.body.user })
        .populate("user")
        .populate("show")
        .populate({ path: "movie", model: "movie" })
        .populate({ path: "theatre", model: "theater" });
      res.send({
        success: true,
        message: "Fetched all the bookings by user",
        data: bookings,
      });
    } catch (err) {
      res.send({ success: false, message: err.message });
    }
  }
);

module.exports = bookingRoutes;

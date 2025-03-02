const express = require("express");
const router = express.Router();
const { auth, adminAuth } = require("../middleware/auth");
const Ticket = require("../models/Ticket");

router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const ticket = new Ticket({
      title,
      description,
      createdBy: req.user.userId,
    });

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tickets =
      req.user.role === "admin"
        ? await Ticket.find().populate("createdBy", "username")
        : await Ticket.find({ createdBy: req.user.userId });

    res.json(tickets);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.put("/:id", auth, adminAuth, async (req, res) => {
  const { status } = req.body;

  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(ticket);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;

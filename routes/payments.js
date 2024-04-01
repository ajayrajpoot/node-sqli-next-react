const fs = require("fs");

const {
  getPayment,
  addPayment,
  updatePayment,
  getUserByUsernameAndEmail,
  updatePaymentStatus,
} = require("../models/payments");

const express = require("express"); 
const router = express.Router();

const multer = require("multer");
// Multer configuration for file uploads

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  // Accept only png, pdf, and jpg files
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, PDF, and JPG files are allowed"));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

// API endpoint to fetch all users
router.get("/api/payment-detail-all", async (req, res) => {
  try {

    // Extract query parameters for filtering
    const { id, status, email, username } = req.query;
    
    let payments = await getPayment(  id, status, email, username  );

    // payments = payments.map(data=>{
    //   // data.create_at = data.create_at;
    //   // data.update_at = data.update_at;

    //   return data;
    // })

    res.status(200).json({ success: true, message: "", data: payments });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});
 
 

router.post( "/api/payment-detail/add", upload.single("doc"), async (req, res) => {
    try {
      const { username, email, phone, doc } = req.body;

      // Check if the user exists
      const existingUser = await getUserByUsernameAndEmail(username, email);

      if (existingUser) {
      } else {
        // If user already exists, add the payment with the existing user_id
        const payment = {
          user_id: existingUser.id,
          // Add any other payment fields here
          status: "padding",
          ...req.body,
        };

        // Check if a file was uploaded
        if (req.file) {
          // If a file was uploaded, add its path to payment data
          payment.doc = req.file.filename;
        }
      }

      const result = await addPayment(payment);
      if (!result) {
        throw new Error("Failed to add payment");
      }

      res
        .status(200)
        .json({ success: true, message: "Payment added successfully" });
    } catch (error) {
      console.error("Error adding payment:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);
router.put("/api/payment-detail/update/:id", async (req, res) => {
  try {
    let params = req.body;

    let result = await updatePayment(req.params.id, params);

    res.status(200).json({ success: true, message: "", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Define the route for updating payment status
router.put("/api/payment-detail/update-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update payment status in the database
    await updatePaymentStatus(id, status);

    res
      .status(200)
      .json({ success: true, message: "Payment status updated successfully" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update payment status" });
  }
});

module.exports = router;

const fs = require("fs");

const {
  getPayment,
  addPayment, 
  getUserByUsernameAndEmail, 
} = require("../../models/payments");

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

 
router.post("/api/payment-detail", async (req, res) => {
  try {
    
    // Extract query parameters for filtering
    const {   email, username } = req.body;
    console.log(email, username )
    let payments = await getPayment( null, null, email, username );

    payments = payments.map((row)=>{
      return {
        id: row.id,
          status: row.status,
          email: row.email,
          username: row.username, 
          create_at: row.create_at,
      }
    }
    );
    res.status(200).json({ result: true, message: "", data: payments });

  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, error: error.message });
  }
});


router.post("/api/payment-confirmation", upload.single("doc"), async (req, res) => {
  try {
    const { username, email, amount, description } = req.body;

    console.log("req.body", req.body)
    console.log("req.body",  req.file?.filename)
    // Check if the user exists
    const existingUser = await getUserByUsernameAndEmail(username, email);
    const currentDate = new Date();

    // Format the date using toLocaleString() method
    const formattedDate = currentDate.toLocaleString('en-US', {
      weekday: 'long', // Full name of the day (e.g., Monday)
      month: 'long',   // Full name of the month (e.g., January)
      day: 'numeric', // Numeric representation of the day (e.g., 23)
      year: 'numeric', // Full numeric representation of the year (e.g., 2024)
      hour: 'numeric', // Numeric representation of the hour (e.g., 12)
      minute: 'numeric', // Numeric representation of the minute (e.g., 30)
      second: 'numeric', // Numeric representation of the second (e.g., 45)
      timeZone: 'UTC' // Specify the time zone (e.g., UTC)
    });
    if (existingUser) {
      // If user already exists, add the payment with the existing user_id
      let payment = {
        user_id: existingUser.id,
        // Add any other payment fields here
        status: "pending",
        // username:username,
        // email:email,
        description: description,
        amount: amount,
        create_at:new Date().toISOString(),
      };

      // Check if a file was uploaded
      if (req.file) {
        // If a file was uploaded, add its path to payment data
        payment.doc = req.file.filename;
      } 

      const result = await addPayment(payment); 

      if (!result) {
        throw new Error("Failed to add payment");
      }
      res.status(200).json({ success: true, message: "Payment added successfully" });
    } else {
      throw new Error("Fail Payment added verification" );
    }
  } catch (error) {
    console.error("Error adding payment:", error,  );

    // If payment fails, delete the uploaded file
    if (req.file) {
      fs.unlink(`${req.file.path}`, (err) => {
        if (err) {
          console.error("Error deleting uploaded file:", err);
        } else {
          console.log("Uploaded file deleted successfully");
        }
      });
    }

    res.status(500).json({ success: false, message: error.message });
  }
}
);
  
module.exports = router;

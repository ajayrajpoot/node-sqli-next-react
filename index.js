// index.js
 
const express = require("express");
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler')

const { connectDatabase } = require("./db/sqlite");

const authMiddleware = require("./middleware/authMiddleware");

const router = require("./routes");
const pubRouter = require("./routes/pub");
const { logger, logEvents } = require('./middleware/logger')
const corsOptions = require('./config/corsOptions')

connectDatabase();

const bodyParser = require("body-parser");

// Create Express app
const app = express();
const PORT = process.env.PORT || 5001;
// Middleware to parse request bodies

app.use(logger) // log all requests
// Configure CORS middleware with allowed origins and methods
app.use(cors(corsOptions))
// app.use(cors({
//   origin:  ['http://localhost:3000', 'localhost:3000', 'localhost'],
//   methods : '*' ,
//   allowedHeaders: '*'
// }));
// Allow requests from all origins/ Define the allowed origins 


// Serve static files from the 'public' folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//public routes
app.use(pubRouter.user)
app.use(pubRouter.payments)

// Apply the authMiddleware to this route
app.use(authMiddleware);

app.use(router.user);
app.use(router.usersDetail);
app.use(router.payments);

app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

 

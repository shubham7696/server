const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const cors = require("cors");

//dotenv config
dotenv.config({ path: "./.env" });

// rest objects
const app = express();

//middlewares
const crosOptions = {
  origin: "*", //process.env.ORIGIN,
};

app.use(cors(crosOptions));

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/employee", require("./routes/empRoutes"));
app.use("/api/v1/patients", require("./routes/patientRoutes"));

// PORT
const port = process.env.PORT || 8080;

//Listen PORT
app.listen(port, async () => {
  try {
    // mongoDb Connection
    await connectDb();
    console.log(`Server Running in Mode = ${process.env.NODE_MODE} on ${port}`);
  } catch (error) {
    console.log(error)
  }
});

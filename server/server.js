import express from "express";
import cors from "cors";
import satellites from "./routes/satellite.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/satellites", satellites);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
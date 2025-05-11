const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { timeStamp } = require("console");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema & Model
const DHTSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  moisture: Number,
  timestamp: String,
});

const DHTModel = mongoose.model("DHTData", DHTSchema);

// // API to receive data from ESP32
// app.post("/api/sendData", async (req, res) => {
//   try {
//     const { temperature, humidity, moisture } = req.body;
//     console.log(
//       `Temperature: ${temperature}°C, Humidity: ${humidity}% , Moisture: ${moisture}%`
//     );
//     const newData = new DHTModel({ temperature, humidity, moisture });
//     await newData.save();
//     res.status(201).json({ message: "Data saved!", data: newData });
//     console.log("Data saved to MongoDB");
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.post("/api/esp32/fetchData", async (req, res) => {
  try {
    const { temperature, humidity, moisture } = req.body;

    const timestamp = new Date(); // full timestamp

    console.log(
      `Temperature: ${temperature}°C, Humidity: ${humidity}%, Moisture: ${moisture}%, Timestamp: ${timestamp}`
    );

    const newData = new DHTModel({
      temperature,
      humidity,
      moisture,
      timestamp, // store full timestamp
    });

    await newData.save();

    res.status(201).json({ message: "Data saved!", data: newData });
    console.log("Data saved to MongoDB");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/fetch", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // default to page 1
  const limit = parseInt(req.query.limit) || 25; // default to 25 records

  const skip = (page - 1) * limit;

  try {
    const data = await DHTModel.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/fetch/latest", async (req, res) => {
  try {
    const data = await DHTModel.findOne().sort({ timestamp :1 }).limit(1);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/fetch/temperature", async (req, res) => {
  try {
    const data = await DHTModel.find({}, { temperature: 1, timestamp: 1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/fetch/humidity", async (req, res) => {
  try {
    const data = await DHTModel.find({}, { humidity: 1, timestamp: 1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/fetch/soil-moisture", async (req, res) => {
  try {
    const data = await DHTModel.find({}, { moisture: 1, timestamp: 1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/fetch/average", async (req, res) => {
  try {
    const data = await DHTModel.aggregate([
      {
        $group: {
          _id: null,
          avgHumidity: { $avg: "$humidity" },
          avgMoisture: { $avg: "$moisture" },
          avgTemperture: { $avg: "$temperature" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

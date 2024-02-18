require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT;

// Import fetch from node-fetch
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Defining route to fetch data for traffic
app.get("/fetch/trafficData", async (req, res) => {
  const baseUrl = "https://api.swetrix.com/v1/log";
  const projectID = process.env.PROJECTID;
  const period = "4w";
  const timeBucket = "day";
  const urlToFetch = `${baseUrl}?pid=${projectID}&period=${period}&timeBucket=${timeBucket}`;

  try {
    const trafficDataRequest = await fetch(urlToFetch, {
      headers: {
        "x-api-key": process.env.APIKEY,
      },
    });

    if (trafficDataRequest.ok) {
      const trafficData = await trafficDataRequest.json();
      res.json(trafficData);
    }
  } catch (error) {
    console.error("Failedf to fetch traffic data", error);
    res.status(500).json({ message: "Failed to fetch external data" });
  }
});

// Defining route to fetch data for performance
app.get("/fetch/performanceData", async (req, res) => {
  const baseUrl = "https://api.swetrix.com/v1/log/performance";
  const projectID = process.env.PROJECTID;
  const period = "4w";
  const timeBucket = "day";
  const urlToFetch = `${baseUrl}?pid=${projectID}&period=${period}&timeBucket=${timeBucket}`;

  try {
    const performanceDataRequest = await fetch(urlToFetch, {
      headers: {
        "x-api-key": process.env.APIKEY,
      },
    });

    if (performanceDataRequest.ok) {
      const performanceData = await performanceDataRequest.json();
      res.json(performanceData);
    }
  } catch (error) {
    console.error("Failed to fetch traffic data", error);
    res.status(500).json({ message: "Failed to fetch external data" });
  }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "/public")));

// Define a route for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

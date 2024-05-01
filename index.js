require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;

const OpenAI = require("openai");
const openai = new OpenAI(process.env.ORGANIZATION_ID);

// Import fetch from node-fetch
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Parse raw text
app.use(bodyParser.text({ type: "text/plain" }));

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

// Defining route for getting traffic metrics
app.get("/fetch/trafficMetricsData", async (req, res) => {
  const baseUrl = "https://api.swetrix.com/v1/log/birdseye";
  const projectID = process.env.PROJECTID;
  const period = "4w";
  const urlToFetch = `${baseUrl}?pid=${projectID}&period=${period}`;

  try {
    const trafficMetricsDataRequest = await fetch(urlToFetch, {
      headers: {
        "x-api-key": process.env.APIKEY,
      },
    });

    if (trafficMetricsDataRequest.ok) {
      const trafficMetricsData = await trafficMetricsDataRequest.json();
      res.json(trafficMetricsData);
    }
  } catch (error) {
    console.error("Failed to fetch traffic data", error);
    res.status(500).json({ message: "Failed to fetch external data" });
  }
});

app.post("/analyze", async (req, res) => {
  const messages = [
    { role: "system", content: "You are a helpful assistant" },
    { role: "user", content: `Analyze and offer insights about the following data: ${req.body}.` },
  ];
  const model = "gpt-4-turbo-preview";

  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: model,
    });
    if (typeof completion === "undefined") {
      res.send("Failed to fait the translation");
    }
    res.json(completion?.choices[0].message?.content);
  } catch (error) {
    console.error(error);
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

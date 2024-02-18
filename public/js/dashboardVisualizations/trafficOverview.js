export const renderTrafficOvertime = (dataObject) => {
  if (dataObject === null || typeof dataObject === "undefined") {
    console.error("Failed to fetch data. Please try again.");
  }

  const trafficData = dataObject?.chart;
  const trafficDateRange = trafficData?.x;
  const websiteVisits = trafficData?.visits;
  const uniqueVisitors = trafficData?.uniques;
  const sessionDurationSeconds = trafficData?.sdur;
  const sessionDuration = [];

  for (let durationInSeconds of sessionDurationSeconds) {
    let durationInMinutes = durationInSeconds / 60;
    sessionDuration.push(durationInMinutes.toFixed(2));
  }

  const trafficVisualization = {
    x: trafficDateRange,
    y: websiteVisits,
    mode: "lines+markers+text",
    line: { shape: "spline" },
    name: "Visits to the website",
    text: websiteVisits,
    textposition: "top",
    type: "scatter",
  };

  const uniqueUsersVisualization = {
    x: trafficDateRange,
    y: uniqueVisitors,
    mode: "lines+markers+text",
    line: { shape: "spline" },
    name: "Unique visitors",
    text: uniqueVisitors,
    textposition: "top",
    type: "scatter",
  };

  const sessionDurationVisualization = {
    x: trafficDateRange,
    y: sessionDuration,
    yaxis: "y2",
    mode: "lines+markers+text",
    line: { shape: "spline" },
    name: "Session Duration",
    text: sessionDuration,
    textposition: "top",
    type: "scatter",
  };

  const chartLayout = {
    showlegend: true,
    legend: {
      orientation: "h",
      x: 0,
      y: 1.2, // Positioned a little above the top of the chart area
    },
  };

  const chartConfig = {
    displayModeBar: false,
  };

  Plotly.newPlot("traffic-overtime", [trafficVisualization, uniqueUsersVisualization], chartLayout, chartConfig);

  Plotly.newPlot("sdur-overtime", [sessionDurationVisualization], chartLayout, chartConfig);
};

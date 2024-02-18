export const renderPerformanceOvertime = async (dataObject) => {
  if (dataObject === null || typeof dataObject === "undefined") {
    console.error("Failed to fetch data. Please try again later.");
  }
  const performanceCharts = dataObject?.chart;
  const { x, render, domLoad } = performanceCharts;

  const domLoadVisualization = {
    x: x,
    y: domLoad,
    mode: "lines+markers+text",
    line: { shape: "spline" },
    name: "Avg. Load Speed",
    text: domLoad,
    textposition: "top",
    type: "scatter",
  };

  const browserRenderVisualization = {
    x: x,
    y: render,
    mode: "lines+markers+text",
    line: { shape: "spline" },
    name: "Avg. Browser Render",
    text: render,
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

  if (x && domLoad && render) {
    Plotly.newPlot("performance-overtime", [domLoadVisualization, browserRenderVisualization], chartLayout, chartConfig);
  }
};

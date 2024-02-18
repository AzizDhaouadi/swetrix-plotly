export const renderTrafficOsBreakdownData = async (dataObject) => {
  if (dataObject === null || dataObject === "undefined") {
    console.error("Could no fetch data. Please try again later.");
  }
  const trafficBreakdownParams = dataObject?.params;
  const trafficOsData = trafficBreakdownParams?.os;

  const osArray = [];
  const osVisitorsCount = [];

  trafficOsData.forEach((os) => {
    osArray.push(os?.name);
    osVisitorsCount.push(os?.count);
  });

  const osVisualization = {
    type: "bar",
    x: osArray,
    y: osVisitorsCount,
  };

  const chartLayout = {
    title: "Visitors per OS",
  };

  const chartConfig = {
    displayModeBar: false,
  };

  Plotly.newPlot("traffic-os", [osVisualization], chartLayout, chartConfig);
};

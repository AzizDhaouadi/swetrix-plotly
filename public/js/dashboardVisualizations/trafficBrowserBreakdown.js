export const renderTrafficBrowserBreakdownData = async (dataObject) => {
  if (dataObject === null || dataObject === "undefined") {
    console.error("Could no fetch data. Please try again later.");
  }
  const trafficBreakdownParams = dataObject?.params;
  const trafficBrowserData = trafficBreakdownParams?.br;

  const browsersArray = [];
  const browsersVisitorsCount = [];

  trafficBrowserData.forEach((browser) => {
    browsersArray.push(browser?.name);
    browsersVisitorsCount.push(browser?.count);
  });

  const browsersVisitorsVisualization = {
    type: "bar",
    x: browsersArray,
    y: browsersVisitorsCount,
  };

  const chartLayout = {
    title: "Visitors per Browser",
  };

  const chartConfig = {
    displayModeBar: false,
  };

  Plotly.newPlot("traffic-browser", [browsersVisitorsVisualization], chartLayout, chartConfig);
};

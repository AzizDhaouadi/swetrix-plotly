export const renderTrafficDeviceBreakdownData = async (dataObject) => {
  if (dataObject === null || dataObject === "undefined") {
    console.error("Could no fetch data. Please try again later.");
  }
  const trafficBreakdownParams = dataObject?.params;
  const trafficDeviceData = trafficBreakdownParams?.dv;

  const devicesArray = [];
  const devicesVisitorsCount = [];

  trafficDeviceData.forEach((device) => {
    devicesArray.push(device?.name);
    devicesVisitorsCount.push(device?.count);
  });

  const devicesVisualization = {
    type: "bar",
    x: devicesArray,
    y: devicesVisitorsCount,
  };

  const chartLayout = {
    title: "Visitors per Device Category",
  };

  const chartConfig = {
    displayModeBar: false,
  };

  Plotly.newPlot("traffic-device", [devicesVisualization], chartLayout, chartConfig);
};

export const renderPagesAndReferrersData = (dataObject) => {
  if (dataObject === null || typeof dataObject === "undefined") {
    console.error("Failed to fetch the required data. Please try again.");
  }

  const trafficDataParams = dataObject?.params;

  const pagesData = trafficDataParams?.pg;
  const referrersData = trafficDataParams?.ref;

  const pagesNames = [];
  const pagesVisits = [];

  const referrersNames = [];
  const referrersVisits = [];

  for (let pageData of pagesData) {
    pagesNames.push(pageData?.name);
    pagesVisits.push(pageData?.count);
  }

  for (let referrerData of referrersData) {
    referrersNames.push(referrerData?.name);
    referrersVisits.push(referrerData?.count);
  }

  const values = [pagesNames, pagesVisits];
  const referrersValues = [referrersNames, referrersVisits];

  const pagesTrafficTableVisualization = {
    type: "table",
    columnwidth: [600, 100],
    header: {
      values: [["<b>Page</b>"], ["<b>Visitors</b>"]],
      align: "center",
      line: { width: 1, color: "black" },
      fill: { color: "grey" },
      font: { family: "Arial", size: 12, color: "white" },
    },
    cells: {
      values: values,
      align: "left",
      line: { color: "black", width: 1 },
      font: { family: "Arial", size: 11, color: ["black"] },
    },
  };

  const referrersTrafficTableVisualization = {
    type: "table",
    columnwidth: [650, 50],
    header: {
      values: [["<b>Page Refferer</b>"], ["<b>Visits</b>"]],
      align: "center",
      line: { width: 1, color: "black" },
      fill: { color: "grey" },
      font: { family: "Arial", size: 12, color: "white" },
    },
    cells: {
      values: referrersValues,
      align: "left",
      line: { color: "black", width: 1 },
      font: { family: "Arial", size: 11, color: ["black"] },
    },
  };

  const pagesChartLayout = {
    title: "Page Visitors Breakdown",
    height: 700,
    width: 700,
  };

  const referrersChartLayout = {
    title: "Referrer Visitors Breakdown",
    height: 700,
    width: 700,
  };

  const chartConfig = {
    displayModeBar: false,
  };

  Plotly.newPlot("traffic-pages", [pagesTrafficTableVisualization], pagesChartLayout, chartConfig);
  Plotly.newPlot("traffic-referrers", [referrersTrafficTableVisualization], referrersChartLayout, chartConfig);
};

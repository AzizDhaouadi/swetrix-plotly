import { convertCountryCode } from "../countriesISO3/convertToISO3.js";

export const renderTrafficGeoBreakdownData = async (dataObject) => {
  if (dataObject === null || dataObject === "undefined") {
    console.error("Failed to fetch data. Please try again later.");
  }
  const trafficBreakdownParams = dataObject?.params;
  const countriesTrafficData = trafficBreakdownParams?.cc;

  const countriesArray = [];
  const countriesVisitorsCount = [];

  countriesTrafficData.forEach((country) => {
    countriesArray.push(convertCountryCode(country?.name));
    countriesVisitorsCount.push(country?.count);
  });

  const trafficGeoVisualization = {
    type: "choropleth",
    locationmode: "ISO-3",
    locations: countriesArray,
    z: countriesVisitorsCount,
    zmin: 0,
    zmax: Math.max(...countriesVisitorsCount),
    colorscale: [
      [0, "rgb(242,240,247)"],
      [0.2, "rgb(218,218,235)"],

      [0.4, "rgb(188,189,220)"],
      [0.6, "rgb(158,154,200)"],

      [0.8, "rgb(117,107,177)"],
      [1, "rgb(84,39,143)"],
    ],
    autocolorscale: false,
    showscale: true,
    marker: {
      line: {
        color: "black",
        width: 1,
      },
    },
  };

  const chartLayout = {
    title: "Unique visitors geographics distribution",
    geo: {
      projection: {
        type: "equirectangular",
      },
      showlakes: true,
      lakecolor: "rgb(255,255,255)",
      scope: "world",
    },
  };

  const chartConfig = {
    displayModeBar: false,
  };

  Plotly.newPlot("traffic-geo", [trafficGeoVisualization], chartLayout, chartConfig);
};

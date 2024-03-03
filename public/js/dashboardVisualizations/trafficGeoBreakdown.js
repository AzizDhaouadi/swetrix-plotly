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
    autocolorscale: true,
    showscale: true,
  };

  const chartLayout = {
    title: "Unique visitors geographic distribution",
    width: 1200,
    height: 1000,
    geo: {
      countrycolor: "rgb(255, 255, 255)",
      showland: true,
      landcolor: "rgb(217, 217, 217)",
      showlakes: true,
      lakecolor: "rgb(255, 255, 255)",
      subunitcolor: "rgb(255, 255, 255)",
      scope: "world",
    },
  };

  const chartConfig = {
    displayModeBar: false,
    dragMode: false,
    scrollZoom: false,
  };

  Plotly.newPlot("traffic-geo", [trafficGeoVisualization], chartLayout, chartConfig, { showLink: false });
};

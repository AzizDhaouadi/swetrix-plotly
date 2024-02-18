"use strict";

import { renderCustomEventsData } from "./dashboardVisualizations/customEventsData.js";

const fetchTrafficData = async () => {
  const fetchTrafficDataRequest = await fetch("/fetch/trafficData");
  if (fetchTrafficDataRequest.ok) {
    const trafficData = await fetchTrafficDataRequest.json();
    return trafficData;
  }
};

const rendertrafficData = async () => {
  const trafficData = await fetchTrafficData();
  renderCustomEventsData(trafficData);
};

rendertrafficData();

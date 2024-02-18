"use strict";

import { renderCustomEventsData } from "./dashboardVisualizations/customEventsData.js";
import { renderTrafficOvertime } from "./dashboardVisualizations/trafficOverview.js";
import { renderPagesAndReferrersData } from "./dashboardVisualizations/pagesAndRefferers.js";

const fetchTrafficData = async () => {
  const fetchTrafficDataRequest = await fetch("/fetch/trafficData");
  if (fetchTrafficDataRequest.ok) {
    const trafficData = await fetchTrafficDataRequest.json();
    return trafficData;
  }
};

const rendertrafficData = async () => {
  const trafficData = await fetchTrafficData();
  renderTrafficOvertime(trafficData);
  renderCustomEventsData(trafficData);
  renderPagesAndReferrersData(trafficData);
};

rendertrafficData();

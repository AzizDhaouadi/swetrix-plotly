"use strict";

import { renderTrafficBirdsEyeData } from "./dashboardVisualizations/trafficMetricsBirdseye.js";

const fetchTrafficMetricsData = async () => {
  const trafficMetricsDataRequest = await fetch("/fetch/trafficMetricsData");
  if (trafficMetricsDataRequest.ok) {
    const trafficMetricsData = await trafficMetricsDataRequest.json();
    return trafficMetricsData;
  }
};

const renderTrafficMetricsData = async () => {
  const trafficMetricsData = await fetchTrafficMetricsData();
  renderTrafficBirdsEyeData(trafficMetricsData);
};

renderTrafficMetricsData();

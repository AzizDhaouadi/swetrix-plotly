"use strict";

import { renderPerformanceOvertime } from "./dashboardVisualizations/performanceOvertime.js";
import { renderPerformanceBirdsEyeData } from "./dashboardVisualizations/performanceMetrics.js";

const fetchPerformanceData = async () => {
  const performanceDataRequest = await fetch("/fetch/performanceData");
  if (performanceDataRequest.ok) {
    const performanceData = await performanceDataRequest.json();
    return performanceData;
  }
};

const renderPerformanceData = async () => {
  const performanceData = await fetchPerformanceData();
  renderPerformanceOvertime(performanceData);
  renderPerformanceBirdsEyeData(performanceData);
};

renderPerformanceData();

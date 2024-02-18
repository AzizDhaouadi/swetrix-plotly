export const renderPerformanceBirdsEyeData = async (dataObject) => {
  if (dataObject === null || typeof dataObject === "undefined") {
    console.error("Failed to fetch the data. Please try again later.");
  }

  const performanceCharts = dataObject?.chart;
  const { domLoad, render, ttfb } = performanceCharts;
  const frontendArray = [];
  domLoad.map((num, index) => {
    frontendArray.push(num + render[index]);
  });
  const returnFrontendMetric = () => {
    let frontendMetric = 0;
    for (let feMetric of frontendArray) {
      frontendMetric += feMetric;
    }
    frontendMetric /= frontendArray.length;
    return `${frontendMetric.toFixed(2)}s`;
  };
  const returnBackendMetric = () => {
    let backendMetric = 0;
    for (let beMetric of ttfb) {
      backendMetric += beMetric;
      return `${backendMetric}s`;
    }
  };

  const frontendDiv = document.getElementById("frontend");
  const backendDiv = document.getElementById("backend");

  frontendDiv.innerText = returnFrontendMetric();
  backendDiv.innerText = returnBackendMetric();
};

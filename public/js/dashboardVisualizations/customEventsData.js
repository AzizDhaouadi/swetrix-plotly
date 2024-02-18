export const renderCustomEventsData = (dataObject) => {
  if (dataObject === null || dataObject === "undefined") {
    console.error("Could no fetch data. Please try again later.");
  }

  const customEventsObj = dataObject?.customs;
  const eventsOverviewDiv = document.querySelector("#events-overview");

  if (eventsOverviewDiv) {
    for (const [key, value] of Object.entries(customEventsObj)) {
      const wrapperDiv = document.createElement("div");
      wrapperDiv.classList.add("w-25");
      const customEventValue = document.createElement("div");
      const customEventName = document.createElement("div");
      customEventValue.classList.add("fw-bold", "fs-3");
      customEventValue.innerText = value;
      customEventName.innerText = key;
      wrapperDiv.appendChild(customEventValue);
      wrapperDiv.appendChild(customEventName);
      eventsOverviewDiv.appendChild(wrapperDiv);
    }
  }

  const customEventsVisualization = {
    type: "pie",
    labels: Object.keys(customEventsObj),
    values: Object.values(customEventsObj),
  };

  const chartLayout = {
    title: "Custom Events Distribution",
    height: 600,
    width: 600,
    legend: {
      orientation: "h", // 'h' for horizontal layout
      x: 0.5, // Center the legend on the x-axis
      y: -0.1, // Position the legend below the chart on the y-axis
      xanchor: "center", // Anchor the legend at its center
      yanchor: "top", // Anchor the legend at its top to push it below the chart
    },
  };

  const chartConfig = {
    displayModeBar: false,
  };

  Plotly.newPlot("events-percent-total", [customEventsVisualization], chartLayout, chartConfig);
};

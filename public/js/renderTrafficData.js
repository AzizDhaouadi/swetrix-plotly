"use strict";

import { renderCustomEventsData } from "./dashboardVisualizations/customEventsData.js";
import { renderTrafficOvertime } from "./dashboardVisualizations/trafficOverview.js";
import { renderPagesAndReferrersData } from "./dashboardVisualizations/pagesAndRefferers.js";
import { renderTrafficGeoBreakdownData } from "./dashboardVisualizations/trafficGeoBreakdown.js";
import { renderTrafficDeviceBreakdownData } from "./dashboardVisualizations/trafficDeviceBreakdown.js";
import { renderTrafficBrowserBreakdownData } from "./dashboardVisualizations/trafficBrowserBreakdown.js";
import { renderTrafficOsBreakdownData } from "./dashboardVisualizations/trafficOsBreakdown.js";
import { fetchAnswers } from "./generativeAnswering/fetchAnswers.js";


const tafficInsightsButton = document.querySelector("#insights-traffic-overtime");
let doneWaitingForInsights = false;

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
  renderTrafficGeoBreakdownData(trafficData);
  renderTrafficDeviceBreakdownData(trafficData);
  renderTrafficBrowserBreakdownData(trafficData);
  renderTrafficOsBreakdownData(trafficData);

  tafficInsightsButton.addEventListener("click", async () => {
    const contactModule = document.querySelector("[data-lead-capture-modal]");
    const closeContactModuleButton = document.querySelector("[data-close-lead-capture-modal]");

    if (typeof contactModule === "undefined" || contactModule === null) {
      throw new Error("Contact module not found");
    }

    contactModule.showModal();

    closeContactModuleButton.addEventListener("click", () => contactModule.close());

    await fetchAnswers(trafficData?.chart).then((response) => {
      doneWaitingForInsights = true;
      const answers = JSON.parse(response);
      if(doneWaitingForInsights) {
        const modelBody = document.getElementById('model-body');
        modelBody.innerHTML = '';

        const insightsContainer = document.createElement('div');
        insightsContainer.classList.add('text-md-left');
        const recommendationsContainer = document.createElement('div');
        recommendationsContainer.classList.add('text-md-left');
        
        const insightsHeading = document.createElement('h3');
        const recommendationsHeading = document.createElement('h3');

        console.log(answers);

        insightsHeading.innerText = 'Insights';
        insightsHeading.classList.add("h3");
        insightsContainer.appendChild(insightsHeading);
      
  
        recommendationsHeading.innerText = 'Recommendations';
        recommendationsHeading.classList.add("h3");
        recommendationsContainer.appendChild(recommendationsHeading);
  
        const insightsArray = Object.entries(answers["insights"]);
        const recommendationsArray = Object.entries(answers?.recommendations);
  
        insightsArray.forEach((insight) => {
          const insightParagraph = document.createElement('p');
          insightParagraph.innerText = insight[1];
          insightsContainer.appendChild(insightParagraph);
        });
  
        recommendationsArray.forEach((recommendation) => {
          const recommendationParagraph = document.createElement('p');
          recommendationParagraph.innerText = recommendation[1];
          recommendationsContainer.appendChild(recommendationParagraph);
        });

        const insightsAndRecommendationsContainer = document.createElement('div');
        insightsAndRecommendationsContainer.classList.add("container");
  
        insightsAndRecommendationsContainer.appendChild(insightsContainer);
        insightsAndRecommendationsContainer.appendChild(recommendationsContainer);

        console.log(insightsAndRecommendationsContainer);

        modelBody.appendChild(insightsAndRecommendationsContainer);
  
        tafficInsightsButton.innerText = 'View Insights';
      }
    });

  });

};

rendertrafficData();


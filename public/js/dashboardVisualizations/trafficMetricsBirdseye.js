export const renderTrafficBirdsEyeData = (dataObject) => {
  if (dataObject === null || typeof dataObject === "undefined") {
    console.error("Failed to fetch the required data. Please try again.");
  }
  const visitsDiv = document.querySelector("#traffic-snapshot #visits");
  const visitorsDiv = document.querySelector("#traffic-snapshot #visitors");
  const sessionDurationDiv = document.querySelector("#traffic-snapshot #sdur");
  const bounceRateDiv = document.querySelector("#traffic-snapshot #br");

  const currentTrafficBirdsEyeData = dataObject["KT4Y783yoT2n"]?.current;
  const { all, unique, sdur, bounceRate } = currentTrafficBirdsEyeData;

  visitsDiv.innerText = all;
  visitorsDiv.innerText = unique;
  sessionDurationDiv.innerText = `${Math.floor(sdur / 60)}m ${Math.floor(sdur % 60)}s`;
  bounceRateDiv.innerText = `${bounceRate}%`;
};

export const fetchAnswers = async (dataToAnalyze) => {
    const insightsDataRequest = await fetch('/analyze', {
        method: 'POST',
        body: JSON.stringify({dataToAnalyze})
    });

    if (insightsDataRequest.ok) {
        const insightsData = await insightsDataRequest.json();
        return insightsData;
    } else {
        console.error('Failed to fetch insights data:', insightsDataRequest.status);
    }
};
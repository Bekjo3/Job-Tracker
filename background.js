chrome.runtime.onInstalled.addListener(() => {
    console.log('Job Application Tracker installed.');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'applyJob') {
      chrome.identity.getAuthToken({ interactive: true }, function(token) {
        if (token) {
          addJobApplication(request.jobDetails, token);
        } else {
          console.error('The OAuth token was not retrieved.');
        }
      });
    }
  });
  
  function addJobApplication(jobDetails, token) {
    const spreadsheetId = 'YOUR_SPREADSHEET_ID';
    const range = 'Sheet1!A1:C1';
    const valueInputOption = 'RAW';
  
    const params = {
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: valueInputOption,
    };
  
    const valueRangeBody = {
      "values": [
        [jobDetails.companyName, jobDetails.jobTitle, jobDetails.dateApplied]
      ]
    };
  
    const request = {
      method: 'POST',
      async: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(valueRangeBody)
    };
  
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`, request)
      .then(response => response.json())
      .then(data => console.log('Job application added:', data))
      .catch(error => console.error('Error adding job application:', error));
  }
  
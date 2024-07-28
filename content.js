document.addEventListener('click', function(event) {
    if (event.target.matches('.apply-button')) {  // Update with the actual selector
        const jobDetails = {
            companyName: document.querySelector('.company-name').innerText,
            jobTitle: document.querySelector('.job-title').innerText,
            dateApplied: new Date().toLocaleDateString(),
            status: 'Applied' 
        };
        chrome.runtime.sendMessage({ action: 'applyJob', jobDetails: jobDetails });
    }
});

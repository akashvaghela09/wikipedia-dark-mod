const updatePage = () => {
    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = chrome.runtime.getURL('popup.css');

    // Append the <link> element to the document's <head>
    document.head.appendChild(linkElement);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "toggle") {
        // toggle the status value in chrome storage
        chrome.storage.sync.get(['status'], function (result) {
            if (result.status === true) {
                chrome.storage.sync.set({ status: false }, function () {
                    // reload the page
                    location.reload();
                });
            } else {
                chrome.storage.sync.set({ status: true }, function () {
                    updatePage();
                });
            }
        });
    }
});

chrome.storage.sync.get(['status'], function (result) {
    if (result.status !== false) {
        updatePage();
    }
});
console.log('contentScript.js loaded');

var linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.type = 'text/css';
linkElement.href = chrome.runtime.getURL('popup.css');

// Append the <link> element to the document's <head>
document.head.appendChild(linkElement);
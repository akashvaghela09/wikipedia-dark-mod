console.log('contentScript.js loaded');

// contentScript.js
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     console.log('Message received in contentScript:', message.text);
//     if (message.message === "Hello from popup!") {
//         // Do something with the message
//         console.log(message.message);
//         updateHomePage("#E6E6FA");
//     } else if (message.message === "page-rendered") {
//         console.log("page-rendered");
//         updateHomePage("#E6E6FA");
//     }
// });

var linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.type = 'text/css';
linkElement.href = chrome.runtime.getURL('popup.css');

// Append the <link> element to the document's <head>
document.head.appendChild(linkElement);


const updateHomePage = ({ primary, secondary, body, font, title, link, visited }) => {
    const hexColor = primary;

    let documentBody = document.body;
    documentBody.style.backgroundColor = secondary;
    documentBody.style.color = font;

    // style all h1, h2,h3, h4, h5, h6
    let allHeaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    if (allHeaders.length > 0) {
        allHeaders.forEach((header) => {
            header.style.color = title;
        });
    }

    // style all a tags and add style for visited if they are clicked
    let allLinks = document.querySelectorAll("a");
    if (allLinks.length > 0) {
        allLinks.forEach((aTag) => {
            aTag.style.color = link;
            aTag.addEventListener("click", () => {
                aTag.style.color = visited;
            });
        });
    }

    // Select all input elements
    let inputs = document.querySelectorAll('input');

    // Set black background for each input
    inputs.forEach((input) => {
        input.style.backgroundColor = primary;
    });

    const buttonList = document.querySelectorAll(".lang-list-button");
    if (buttonList.length > 0) {
        buttonList.forEach((button) => {
            button.style.backgroundColor = secondary;
        });
    }

    const footerDiv = document.querySelectorAll(".footer-sidebar-content")
    footerDiv.forEach((div) => {
        div.style.backgroundColor = secondary;
    });

    // // Select the target element
    let targetElement = document.getElementById('typeahead-suggestions');

    // Create a new MutationObserver
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // Check if nodes were added
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Apply the desired style to the added nodes
                Array.from(mutation.addedNodes).forEach(function (node) {
                    let aTagList = node.querySelectorAll("a");
                    aTagList.forEach((aTag) => {
                        aTag.style.backgroundColor = secondary;
                    });
                });
            }
        });
    });

    // Configure and start the observer
    let observerConfig = {
        childList: true, // Watch for changes in the child nodes
        subtree: true // Watch for changes in all descendants
    };

    if (targetElement !== null) {
        observer.observe(targetElement, observerConfig);
    }
}

const updateWikiPage = ({ primary, secondary, card, border, header }) => {
    let pageContainer = document.querySelectorAll(".mw-page-container");
    if (pageContainer.length > 0) {
        pageContainer.forEach((node) => {
            node.style.backgroundColor = primary;
        });
    }

    let pageHeader = document.querySelector(".vector-header-container");
    if (pageHeader !== null) {
        pageHeader.style.backgroundColor = header;
    }

    let tableOfContents = document.querySelector(".vector-toc");
    if (tableOfContents !== null) {
        tableOfContents.style.backgroundColor = primary;
        // tableOfContents.style.border = `1px solid ${border}`;
    }

    var linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.type = 'text/css';
    linkElement.href = chrome.runtime.getURL('popup.css');

    // Append the <link> element to the document's <head>
    document.head.appendChild(linkElement);
}

const updateInfoBox = ({ primary, card, border }) => {
    let allTables = document.querySelectorAll("table");
    allTables.forEach((table) => {
        table.style.backgroundColor = card;
        table.style.borderColor = border;
    });

    let allFigure = document.querySelectorAll("figcaption");
    allFigure.forEach((figure) => {
        figure.style.backgroundColor = card;
        figure.style.borderColor = border;
    }
    );

    let thumbnailContainer = document.querySelectorAll(".thumbinner.multiimageinner");
    thumbnailContainer.forEach((container) => {
        container.style.backgroundColor = card;
        container.style.borderColor = border;
    });

    let thumbCaption = document.querySelectorAll(".thumbinner");
    thumbCaption.forEach((caption) => {
        caption.style.backgroundColor = card;
        caption.style.borderColor = border;
    });
}

const updateFooterLinks = ({ border, secondary }) => {
    let sideBoxs = document.querySelectorAll(".side-box.side-box-right.plainlinks.sistersitebox");
    sideBoxs.forEach((node) => {
        node.style.backgroundColor = secondary;
        node.style.borderColor = border;
    });

    let catLinks = document.querySelectorAll(".catlinks");
    catLinks.forEach((node) => {
        node.style.backgroundColor = secondary;
        node.style.borderColor = border;
    });

    let navLinks = document.querySelectorAll(".navbox");
    navLinks.forEach((node) => {
        node.style.backgroundColor = secondary;
        node.style.borderColor = border;
    });

    let portalBar = document.querySelectorAll(".portal-bar");
    portalBar.forEach((node) => {
        node.style.backgroundColor = secondary;
        node.style.borderColor = border;
    });

    // let navBarDividers = document.querySelectorAll(".navbox-abovebelow");
    // navBarDividers.forEach((link) => {
    //     link.style.backgroundColor = color;
    //     link.style.borderColor = "transparent";
    // }
    // );

    // let navBarLists = document.querySelectorAll(".navbox-list");
    // navBarLists.forEach((link) => {
    //     link.style.borderColor = "transparent";
    // });
}

const colorConfig = {
    "serenity": {
        "primary": "#B3CEE5",
        "secondary": "#91B8D9",
    },
    // "charcoal": {
    //     "primary": "#1e1e1f",
    //     "secondary": "#2c2c2d",
    // },
    // "dark": {
    //     "primary": "#151515",
    //     "secondary": "#202020",
    // },
    // "light": {
    //     "primary": "#1f1f1f",
    //     "secondary": "#2c2c2c",
    // },
    "charcoal": {
        "primary": "#1e1e1f",
        "secondary": "#2c2c2d",
    },
    "dark": {
        "primary": "#212123",
        "secondary": "#282a2b",
        "header": "#2f3234",
        "link": "#7490b9",
        "visited": "#4b566c",
        "font": "#6a7279",
        "border": "#2f3138",
        "title": "#686a70",
        "card": "#292b2d",
    },
    "light": {
        "primary": "#1f1f1f",
        "secondary": "#2c2c2c",
    },
}

updateHomePage(colorConfig.dark);
updateWikiPage(colorConfig.dark);
updateInfoBox(colorConfig.dark);
updateFooterLinks(colorConfig.dark);
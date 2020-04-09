chrome.webNavigation.onBeforeNavigate.addListener(details => {

    if (details.url.endsWith(".pdf")) {

        chrome.storage.sync.get("isEnabled", storage => {

            if (storage.isEnabled !== false) {

                if (details.url.startsWith("file:///")) {

                    chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {

                        if (!isAllowedAccess) {
                            chrome.tabs.update(details.tabId, {
                                url: chrome.runtime.getURL("/open_extensions_page.html")
                            });
                        }
                    });
                }





                let url = details.url;

                if (url.startsWith("file:///")) {
                    url = url.substring("file:///".length, url.length);
                }

                chrome.tabs.update({
                    url: chrome.runtime.getURL(`/pdf.js/web/viewer.html?file=${url}`)
                });
            }
        });
    }
});




chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        if (message.type === "downloadPdf") {

            let request = new XMLHttpRequest();
            request.addEventListener("load", event => {

                chrome.tabs.sendMessage(tabs[0].id, { type: "downloadedPdf", value: request });
            });

            request.open("GET", message.value, false);
            request.send();

            return true;

        } else if (message.type === "translate") {

            let request = new XMLHttpRequest();
            request.addEventListener("load", event => {

                sendResponse(request.responseText);
            });

            request.open("GET", message.value, false);
            request.send();

            return true;

        } else if (message.type === "setIcon") {
            chrome.browserAction.setIcon(message.value);

            return true;
        }
    }
);


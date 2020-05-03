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

        switch (message.type) {
            case "openExtensionsPage":
                chrome.tabs.update({
                    url: `edge://extensions/?id=${chrome.runtime.id}`
                });
                break;
            case "setIcon":
                chrome.browserAction.setIcon(message.value);
                break;
        }
    }
);


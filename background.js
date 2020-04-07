chrome.extension.isAllowedFileSchemeAccess(isAllowedAccess => {

    if (!isAllowedAccess) {

        chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
            if (details.url.startsWith("file:///")) {
                chrome.tabs.update(details.tabId, {
                    url: `extension://${chrome.runtime.id}/open_extensions_page.html`
                });
            }
        });
    }
});


chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        if (message.type === "openPDFInViewer") {

            if (message.value.url.startsWith("file:///")) {
                message.value.url = message.value.url.substring("file:///".length, message.value.url.length);
            }

            chrome.tabs.update({
                url: `extension://${chrome.runtime.id}/pdf.js/web/viewer.html?file=${message.value.url}`
            });

            return true;

        } else if (message.type === "openExtensionsPage") {

            chrome.tabs.create({
                index: sender.tab.index + 1,
                url: `edge://extensions/?id=${chrome.runtime.id}`
            });

            return true;

        } else if (message.type === "fetchPdf") {

            let request = new XMLHttpRequest();
            request.addEventListener("load", event => {

                chrome.tabs.sendMessage(tabs[0].id, { type: "fetchedPdf", value: request });
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


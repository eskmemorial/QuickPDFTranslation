chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {

        switch (message.type) {
            case 'openPDFInViewer':

                chrome.tabs.create({
                    windowId: sender.tab.windowId,
                    index: sender.tab.index,
                    openerTabId: sender.tab.id,
                    url: `extension://${chrome.runtime.id}/pdf.js/web/viewer.html?file=${message.value.url}`
                });

                return true;
                break;

            case 'fetchWebPage':

                let request = new XMLHttpRequest();
                request.addEventListener('load', event => {

                    chrome.tabs.sendMessage(tabs[0].id, { type: "resultOfFetchWebPage", value: request });
                });

                request.open('GET', file, false);
                request.send();

                return true;
                break;

        }
    }
);


chrome.runtime.onMessage.addListener(
    (message, sender, sendResponse) => {


        if (message.type === "openPDFInViewer") {

            chrome.tabs.create({
                windowId: sender.tab.windowId,
                index: sender.tab.index,
                openerTabId: sender.tab.id,
                url: `extension://${chrome.runtime.id}/pdf.js/web/viewer.html?file=${message.value.url}`
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
        }



    }
);


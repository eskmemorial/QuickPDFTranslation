chrome.storage.sync.get("enable", storage => {

    if (storage.enable !== false) {

        chrome.runtime.sendMessage(
            {
                type: "openPDFInViewer",
                value: { url: window.location.href }
            }
        );
    }
});

chrome.runtime.sendMessage(
    {
        type: "openPDFInViewer",
        value: { url: window.location.href }
    }
);

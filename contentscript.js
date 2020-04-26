chrome.storage.sync.get("isEnabled", storage => {

    if (storage.isEnabled === false) {
        chrome.runtime.sendMessage(
            {
                type: "setIcon",
                value: { path: "icon64_disabled.png" }
            }
        );
    }
});
chrome.storage.sync.get("isEnabled", storage => {

    if (storage.isEnabled !== false) {
        enableExtension();
    } else {
        disableExtension();
    }
});


chrome.storage.sync.get("intoLang", storage => {

    const intoLang = storage.intoLang || "ja";

    document.querySelector(`option[value='${intoLang}']`).setAttribute("selected", "");

});

document.querySelector("select").addEventListener("change", event => {

    chrome.storage.sync.set({
        intoLang: event.target.value
    });

});


document.querySelector("#enable").addEventListener("click", enableExtension);

document.querySelector("#disable").addEventListener("click", disableExtension);

document.querySelector("#open_options").addEventListener("click", event => {
    window.open("options.html");
});






function enableExtension() {

    chrome.storage.sync.set({ isEnabled: true }, () => {
        document.querySelector("#enable").setAttribute("style", "display:none;");
        document.querySelector("#disable").setAttribute("style", "display:inline-block;");

        chrome.runtime.sendMessage(
            {
                type: "setIcon",
                value: { path: "icon64.png" }
            }
        );

        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            tabs.forEach(tabs => {
                chrome.tabs.sendMessage(tab.id, { type: "extensionEnabled", value: true });
            });
        });
    });
}


function disableExtension() {

    chrome.storage.sync.set({ isEnabled: false }, () => {
        document.querySelector("#disable").setAttribute("style", "display:none;");
        document.querySelector("#enable").setAttribute("style", "display:inline-block;");

        chrome.runtime.sendMessage(
            {
                type: "setIcon",
                value: { path: "icon64_disabled.png" }
            }
        );

        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, { type: "extensionEnabled", value: false });
            });
        });
    });
}


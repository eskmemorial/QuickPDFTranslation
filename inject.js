const removePanel = () => {

    document.querySelector("div.qpt-panel").remove();

    document.removeEventListener("click", removePanel);
    document.addEventListener("click", translate);
};


const translate = (clickEvent) => {


    const showPanel = (responseText) => {

        let panel = document.createElement("div");
        panel.setAttribute("class", "qpt-panel");
        panel.setAttribute("style", `top:${clickEvent.pageY}px;left:${clickEvent.pageX}px;`);
        panel.innerHTML = responseText;

        document.firstElementChild.appendChild(panel);
    };



    const text = document.getSelection().toString();

    if (text.length < 2) {
        return;
    }

    chrome.storage.sync.get("toLang", storage => {

        const toLang = storage.toLang || "ja";

        let request = new XMLHttpRequest();
        request.addEventListener("load", event => {

            showPanel(request.responseText);
        });

        request.open("POST", "https://www.eskmemorial.jp/works/quickpdftranslation/translate", true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(`text=${encodeURI(text)}&to_lang=${encodeURI(toLang)}`);
    });

    document.removeEventListener("click", translate);
    document.addEventListener("click", removePanel);
};


chrome.storage.sync.get("isEnabled", storage => {

    if (storage.isEnabled !== false) {
        document.addEventListener("click", translate);
    } else {
        chrome.runtime.sendMessage(
            {
                type: "setIcon",
                value: { path: "icon64_disabled.png" }
            }
        );
    }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "extensionEnabled") {

        if (message.value) {

            document.removeEventListener("click", removePanel);
            document.addEventListener("click", translate);
        } else {

            document.removeEventListener("click", translate);
            document.removeEventListener("click", removePanel);
        }
    }
});


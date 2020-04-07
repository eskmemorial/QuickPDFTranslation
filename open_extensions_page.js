document.querySelector("#open_extensions_page").addEventListener("click", () => {

    chrome.runtime.sendMessage(
        {
            type: "openExtensionsPage"
        }
    );
});
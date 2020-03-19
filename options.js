document.querySelector("#installed_extensions").addEventListener("click", event => {

    chrome.runtime.sendMessage(
        {
            type: "openInstalledExtensions"
        }
    );
});


chrome.storage.sync.get("toLang", storage => {

    const toLang = storage.toLang || "ja";

    document.querySelector(`option[value='${toLang}']`).setAttribute("selected", "");

});

document.querySelector("#save").addEventListener("click", event => {

    const select = document.querySelector("select");
    const toLang = select.options[select.selectedIndex].value;

    chrome.storage.sync.set({
        toLang: toLang
    });

    alert("Saved!");
});
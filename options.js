chrome.storage.sync.get(["translationServer", "toLang"], storage => {

    let translationServer = storage.translationServer || "https://www.eskmemorial.jp/works/quickpdftranslation/translate";

    let toLang = storage.toLang || "ja";

    document.querySelector("input[name='translationServer']").setAttribute("value", translationServer);

    document.querySelector(`option[value='${toLang}']`).setAttribute("selected", "");

});

document.querySelector("#save").addEventListener("click", event => {

    const translationServer = document.querySelector("input[name='translationServer']").value;

    const select = document.querySelector("select");
    const toLang = select.options[select.selectedIndex].value;

    chrome.storage.sync.set({
        translationServer: translationServer,
        toLang: toLang
    });

    alert("Saved!");
});
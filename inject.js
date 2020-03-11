document.addEventListener("click", event => {

    let text = document.getSelection().toString();

    if (text === "") {
        return;
    }

    translate(text);

});



function translate(text) {

    chrome.runtime.sendMessage(
        {
            type: "fetchWebPage",
            value: "file"
        }
    );


}

function showPannel(resultText) {



}
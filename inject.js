let mouseX = 0;
let mouseY = 0;


document.addEventListener("click", event => {

    let text = document.getSelection().toString();

    if (text === "") {
        return;
    }

    console.log(event);

    mouseX = event.pageX;
    mouseY = event.pageY;

    translate(text);

});



function translate(text) {

    console.log("translate");

    chrome.runtime.sendMessage(
        {
            type: "translate",
            value: `https://www.eskmemorial.jp/works/quickpdftranslation/translate?text=${text}`
        },
        showPanel
    );


}

function showPanel(responseText) {

    console.log(responseText);

    let panel = document.createElement("div");
    panel.setAttribute("class", "qpt-panel");
    panel.setAttribute("style", `top:${mouseY}px;left:${mouseX}px;`);
    panel.innerHTML = responseText;

    document.firstElementChild.appendChild(panel);

}
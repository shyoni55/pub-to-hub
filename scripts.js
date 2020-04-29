//if on pubmed

if (window.location.hostname === "www.ncbi.nlm.nih.gov") {
  //find all pubmed IDs

  var ids = document.getElementsByTagName("dd");

  for (var index = 0; index < ids.length; index++) {
    var pubID = ids[index].innerText;
    //create a button
    var buttonNode = document.createElement("button");
    buttonNode.innerHTML = "&#x1F50E;";
    buttonNode.setAttribute("id", pubID);
    buttonNode.setAttribute("type", "button");
    buttonNode.setAttribute("style", "margin-left:5px");

    //put it after the id

    var referenceNode = ids[index];
    referenceNode.parentNode.insertBefore(
      buttonNode,
      referenceNode.nextSibling
    );

    //add an event listener

    document
      .getElementById(pubID)
      .addEventListener("click", ButtonClickAction, false);
  }

  function ButtonClickAction(buttonEvent) {
    pubID = buttonEvent.target.id;

    console.log(pubID);

    chrome.storage.sync.set({ pubID: pubID }, function () {
      window.open("https://sci-hub.tw/");
    });
  }
}

if (window.location.hostname === "sci-hub.tw") {
  chrome.storage.sync.get("pubID", function (data) {
    if (typeof data.pubID !== "undefined") {
      document.querySelector(
        "#input > form > input[type=textbox]:nth-child(2)"
      ).value = data.pubID;
      chrome.storage.sync.remove("pubID", function () {});
      document.forms[0].submit();
    }
  });
}

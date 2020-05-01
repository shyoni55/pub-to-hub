//if on pubmed

if (
  window.location.hostname === "www.ncbi.nlm.nih.gov" ||
  window.location.hostname === "pubmed.ncbi.nlm.nih.gov"
) {
  //find all pubmed IDs

  var ids = document.getElementsByTagName("dd");
  // if this is the old pubmed
  if (ids.length > 0) {
    for (var index = 0; index < ids.length; index++) {
      var pubID = ids[index].innerText;
      //check if this is a pubmed id
      prev_text = ids[index].previousElementSibling.innerHTML;
      if (prev_text === "PMID:") {
        //create a button
        var buttonNode = document.createElement("button");
        buttonNode.innerHTML = "&#x1F50E;";
        buttonNode.setAttribute("id", pubID);
        buttonNode.setAttribute("type", "button");
        buttonNode.setAttribute(
          "style",
          "margin:0px; padding:5px; border:none;background-color:white;"
        );

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
    }

    // If this is the new pubmed:
  } else if (ids.length === 0) {
    // var ids = document.getElementsByClassName("docsum-pmid");
    // var curr_id = document.getElementsByClassName("current-id")[0];
    // // If we're on a paper page
    // if (curr_id !== "undefined") {
    //   ids.unshift(curr_id);
    // }
    var ids = document.querySelectorAll(".docsum-pmid,.current-id");

    for (var index = 0; index < ids.length; index++) {
      var pubID = ids[index].innerHTML;

      var buttonNode = document.createElement("button");
      buttonNode.innerHTML = "&#x1F50E;";
      buttonNode.setAttribute("id", pubID);
      buttonNode.setAttribute("type", "button");
      buttonNode.setAttribute(
        "style",
        "margin:0px; padding:5px; border:none;background-color:white;"
      );

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
  }
}

function ButtonClickAction(buttonEvent) {
  pubID = buttonEvent.target.id;

  console.log(pubID);

  chrome.storage.sync.set({ pubID: pubID }, function () {
    window.open("https://sci-hub.tw/");
  });
}

//when tranferred to sci-hub

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

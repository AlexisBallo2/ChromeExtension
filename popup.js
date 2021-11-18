// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});


  // When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });

  chrome.storage.local.get(['key'], function(result) {
    console.log('Value:' + result.key);

  });
 
  chrome.storage.local.set({key: true}, function() {});

  function setPageBackgroundColor() {
    chrome.storage.sync.get(['key'], function(data){
        console.log(data.key);
        if(data.key == true){
           document.body.style.backgroundColor = "blue";//data.color; 
           chrome.storage.local.set({key: false}, function() {});
        } else {
            document.body.style.backgroundColor = "red"; 
            chrome.storage.local.set({key: true}, function() {});
        }
    });
  }
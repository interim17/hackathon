// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// let gray = document.getElementById("c")
// gray.addEventListener("click", setPageBackgroundColor());

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
    
    console.log("something")
    let sprite = document.createElement("img");
sprite.className = "sprite"
let file = 'images/sprite.gif';
let url = chrome.extension.getURL(file);
sprite.src = file;
sprite.innerHTML = "Hello there"
document.body.prepend(sprite)
console.log("something")
  });
}
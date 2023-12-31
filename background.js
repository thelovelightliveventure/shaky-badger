chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const all = 'https://'
const text = document.querySelectorAll('body')
const spaces = document.createElement("p");

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(all)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

  if (nextState === "ON") {
      // Insert the CSS file when the user turns the extension on
      await chrome.tabs.executeScript({
        file: "insert.js"
      });
    }
  }
});

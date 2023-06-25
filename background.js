chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'off'
  })
})

const urlRocketseat = 'https://app.rocketseat.com.br'

chrome.action.onClicked.addListener(async tab => {
  if (tab.url.startsWith(urlRocketseat)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
    // Next state will always be the opposite
    const nextState = prevState === 'on' ? 'off' : 'on'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    })

    if (nextState === 'on') {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id }
      })
    } else if (nextState === 'off') {
      // Remove the CSS file when the user turns the extension off
      await chrome.scripting.removeCSS({
        files: ['focus-mode.css'],
        target: { tabId: tab.id }
      })
    }
  }
})

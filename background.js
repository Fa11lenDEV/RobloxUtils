chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'open_index') {
        const url = chrome.runtime.getURL('index.html');
        chrome.tabs.create({ url });
    }
});
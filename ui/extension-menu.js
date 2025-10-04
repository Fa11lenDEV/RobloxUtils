const BUTTON_ID = "robloxutils-extensao-btn";
const LINK_TEXT = 'Roblox Utils';

function addExtensionMenuItem() {
    const menu = document.querySelector('#settings-popover-menu');
    if (!menu) return;

    if (document.getElementById(BUTTON_ID)) return;

    const menuItem = document.createElement("li");
    const a = document.createElement('a');
    a.id = BUTTON_ID; 
    a.innerText = LINK_TEXT;
    a.href = 'javascript:void(0)';
    a.style.cursor = 'pointer';
    
    a.addEventListener('click', (e) => {
        e.stopPropagation();
        chrome.runtime.sendMessage({ action: 'open_index' });
    });

    menuItem.appendChild(a);

    if (menu.firstChild) {
        menu.insertBefore(menuItem, menu.firstChild);
    } else {
        menu.appendChild(menuItem);
    }
}

function initializeExtensionMenu() {
    const observer = new MutationObserver(() => {
        addExtensionMenuItem();
    });

    observer.observe(document.body, { subtree: true, childList: true });
}

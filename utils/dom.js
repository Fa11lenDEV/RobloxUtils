function waitForElementToExist(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            subtree: true,
            childList: true,
        });
    });
}

function waitForElement(selector, targetClass, targetSelector, callbackClass, callbackElement) {
    const targetElement = document.querySelector(selector);

    if (targetElement && targetElement.classList.contains(targetClass)) {
        callbackClass();
        return;
    }

    const observer = new MutationObserver(() => {
        if (targetElement && targetElement.classList.contains(targetClass)) {
            observer.disconnect();
            callbackClass();
        } else if (document.querySelector(targetSelector)) {
            observer.disconnect();
            callbackElement();
        }
    });

    const config = { attributes: true, subtree: true };
    observer.observe(document.body, config);
}

function isSmallCard(card) {
    if (!card || typeof card.getBoundingClientRect !== 'function') return false;
    try {
        const w = card.getBoundingClientRect().width;
        return w > 0 && w < 200;
    } catch (e) {
        return false;
    }
}

function ensureCardId(card) {
    if (!card) return null;
    if (!card.dataset.robloxIncomeId) {
        card.dataset.robloxIncomeId = 'rbi-' + Math.random().toString(36).slice(2, 9);
    }
    return card.dataset.robloxIncomeId;
}

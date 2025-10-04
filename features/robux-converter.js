const DEVEX_RATE = 0.0035;
let lastRobux = null;

function updateRobuxUSD() {
    const robuxSpan = document.getElementById("nav-robux-amount");
    if (!robuxSpan) return;

    const robuxTotal = parseRobuxText(robuxSpan.textContent);

    if (robuxTotal === lastRobux) return;
    lastRobux = robuxTotal;

    const usdValue = (robuxTotal * DEVEX_RATE).toFixed(2);

    let usdSpan = document.getElementById("nav-robux-usd");
    if (!usdSpan) {
        usdSpan = document.createElement("span");
        usdSpan.id = "nav-robux-usd";
        usdSpan.style.marginLeft = "4px";
        usdSpan.style.fontWeight = "normal";
        usdSpan.style.fontSize = "12px";
        usdSpan.style.color = "#ccc";
        robuxSpan.parentNode.appendChild(usdSpan);
    }

    usdSpan.textContent = `(${usdValue} USD)`;
}

function observeRobuxChanges() {
    const robuxSpan = document.getElementById("nav-robux-amount");
    if (robuxSpan) {
        const observer = new MutationObserver(updateRobuxUSD);
        observer.observe(robuxSpan, { childList: true, subtree: true, characterData: true });

        setInterval(updateRobuxUSD, 1000);

        updateRobuxUSD();
    } else {
        setTimeout(observeRobuxChanges, 500);
    }
}

function initializeRobuxConverter() {
    observeRobuxChanges();
}

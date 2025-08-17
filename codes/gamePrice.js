const MIN_ARPU = 0.05;
const MAX_ARPU = 0.15;

function estimateIncome(players) {
    if (!players || isNaN(players)) return null;
    const low = Math.round(players * MIN_ARPU);
    const high = Math.round(players * MAX_ARPU);
    return `$${low.toLocaleString()} - $${high.toLocaleString()}`;
}

function parseNumeric(numericPart, isFromTitle) {
    if (isFromTitle) numericPart = numericPart.replace(/[^0-9]/g, '');
    else numericPart = numericPart.replace(/,/g, '');
    return parseInt(numericPart, 10);
}

function parsePlayersHighlights(text) {
    if (!text) return null;
    let s = String(text).replace(/\+/g, "").replace(/\u00A0/g, " ").trim().toUpperCase();
    s = s.replace(/[^0-9.,KMB\s]/g, "").replace(/\s+/g, "");
    if (!s) return null;
    const suffix = s.slice(-1);
    let multiplier = 1;
    if (suffix === "K") multiplier = 1e3;
    else if (suffix === "M") multiplier = 1e6;
    else if (suffix === "B") multiplier = 1e9;
    let numericPart = ["K","M","B"].includes(suffix) ? s.slice(0,-1) : s;
    const num = parseNumeric(numericPart, false);
    return isNaN(num) ? null : Math.round(num * multiplier);
}

function parsePlayersGamePage(el) {
    if (!el) return null;
    let text = el.getAttribute("title") || el.textContent;
    return parsePlayersHighlights(text);
}

function isSmallCard(card) {
    if (!card || typeof card.getBoundingClientRect !== 'function') return false;
    try { const w = card.getBoundingClientRect().width; return w > 0 && w < 200; } catch { return false; }
}

function ensureCardId(card) {
    if (!card) return null;
    if (!card.dataset.robloxIncomeId) card.dataset.robloxIncomeId = 'rbi-' + Math.random().toString(36).slice(2,9);
    return card.dataset.robloxIncomeId;
}

function removeExistingIncomeLabels(card) {
    if (!card) return;
    const nodes = card.querySelectorAll("[data-roblox-income-id], .income-estimate, .estimate-detail");
    nodes.forEach(n => n.remove());
}

function applyEstimateToCard(card) {
    if (!card) return;
    ensureCardId(card);
    let players = parsePlayersHighlights(card.textContent) || 0;
    if (!players || players < 5) return;

    removeExistingIncomeLabels(card);

    const small = isSmallCard(card);
    const textVal = estimateIncome(players);
    const textNoBreak = textVal.replace(' - ', '\u00A0-\u00A0');

    if (small) {
        const span = document.createElement("span");
        span.className = "income-estimate";
        span.setAttribute("data-roblox-income-id", card.dataset.robloxIncomeId);
        span.textContent = textNoBreak;
        span.style.whiteSpace = "nowrap";
        span.style.display = "inline-block";
        span.style.transform = "translateY(-25px)";
        card.appendChild(span);
    } else {
        const wrapper = document.createElement("div");
        wrapper.className = "info-label estimate-detail";
        wrapper.setAttribute("data-roblox-income-id", card.dataset.robloxIncomeId);
        wrapper.textContent = textVal;
        card.appendChild(wrapper);
    }
}

function scanHomepageCards() {
    const selectors = [".list-item.game-card", ".game-card", ".card-game", ".game-card-container", ".item-card", ".card"];
    const seen = new Set();
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(card => {
            if (!card || seen.has(card)) return;
            seen.add(card);
            try { applyEstimateToCard(card); } catch (e) { console.error(e); }
        });
    });
}

function startDynamicGamePage() {
    const statEl = document.querySelector(".game-stat:first-child .text-lead, .game-stats .stat:first-child .stat-value");
    if (!statEl) return;
    let lastPlayers = null;
    let stableCount = 0;

    const update = () => {
        const players = parsePlayersGamePage(statEl);
        if (!players) { setTimeout(update, 1000); return; }
        if (players === lastPlayers) stableCount++; else stableCount = 0;
        if (stableCount >= 2) {
            applyEstimateToCard(document.querySelector(".game-page") || document.querySelector(".game-title-container"));
            return;
        }
        lastPlayers = players;
        setTimeout(update, 1000);
    };
    update();
}

let lastURL = location.href;
setInterval(() => {
    if (location.href !== lastURL) {
        lastURL = location.href;
        scanHomepageCards();
        startDynamicGamePage();
    }
}, 1000);

const observer = new MutationObserver(() => {
    if (window.__robloxIncomeScanTimeout) clearTimeout(window.__robloxIncomeScanTimeout);
    window.__robloxIncomeScanTimeout = setTimeout(() => {
        scanHomepageCards();
        startDynamicGamePage();
    }, 200);
});
observer.observe(document.body, { childList: true, subtree: true });

scanHomepageCards();
startDynamicGamePage();
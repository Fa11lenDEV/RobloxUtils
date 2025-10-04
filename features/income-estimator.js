const MIN_ARPU = 0.08;
const MAX_ARPU = 0.15;

function estimateIncome(players, approvalRating) {
    if (!players || isNaN(players)) return null;

    let adjustedMinArpu = MIN_ARPU;
    let adjustedMaxArpu = MAX_ARPU;

    if (approvalRating && !isNaN(approvalRating)) {
        const arpuRange = MAX_ARPU - MIN_ARPU;
        const adjustment = ((approvalRating / 100) - 0.5) * arpuRange;

        adjustedMinArpu = MIN_ARPU + (adjustment / 2);
        adjustedMaxArpu = MAX_ARPU + (adjustment / 2);

        adjustedMinArpu = Math.max(MIN_ARPU, Math.min(adjustedMinArpu, MAX_ARPU));
        adjustedMaxArpu = Math.max(MIN_ARPU, Math.min(adjustedMaxArpu, MAX_ARPU));
    }

    const low = Math.round(players * adjustedMinArpu);
    const high = Math.round(players * adjustedMaxArpu);

    if (low === 0 && high === 0 && players > 0) return "$0 - $1";
    return `$${low.toLocaleString()} - $${high.toLocaleString()}`;
}

function getApprovalRating(card) {
    const approvalEl = card.querySelector(".vote-percentage-label, .game-card-meta .vote-percentage, .icon-like, .game-card-info-votes");
    if (!approvalEl) return null;

    const text = approvalEl.textContent;
    const match = text.match(/(\d+)%/);
    if (match) {
        return parseInt(match[1], 10);
    }
    return null;
}

function setVotePercentageColor(card, approvalRating) {
    if (approvalRating === null) {
        return;
    }

    const percentageElement = card.querySelector('.vote-percentage-label');
    if (!percentageElement) {
        return;
    }

    let color;
    if (approvalRating >= 75) {
        color = '#8BC48B';
    } else if (approvalRating >= 50) {
        color = '#FFD280';
    } else {
        color = '#FF9999';
    }

    percentageElement.style.color = color;
}

function applyEstimateToCard(card) {
    if (!card) return;

    const playersEl = card.querySelector(".playing-counts-label, .game-card-playing-count, .game-card-meta .playing");
    let players = playersEl ? parsePlayerCount(playersEl.textContent) : null;

    if (!players) {
        const infoEls = card.querySelectorAll(".info-label, .game-card-info, .card-meta, .card-footer, .card-subtitle");
        for (const el of infoEls) {
            const maybe = parsePlayerCount(el.textContent);
            if (maybe && maybe > (players || 0)) {
                players = maybe;
            }
        }
    }

    const isUnavailable = !players || players <= 0 ||
                          card.querySelector('.game-card-private-icon, .game-card-closed-icon');

    if (isUnavailable) {
        card.querySelectorAll(".income-estimate, .estimate-detail").forEach(n => n.remove());
        return;
    }

    ensureCardId(card);
    const lastKnownPlayers = parseInt(card.dataset.robloxIncomePlayers || '0', 10);

    if (players <= lastKnownPlayers) {
        return;
    }

    card.dataset.robloxIncomePlayers = players;

    const approvalRating = getApprovalRating(card);
    
    const textVal = estimateIncome(players, approvalRating);
    const small = isSmallCard(card);
    const textNoBreak = textVal.replace(' - ', '\u00A0-\u00A0') + ' USD';
    
    const uniqueId = card.dataset.robloxIncomeId;
    const existing = card.querySelector(`[data-roblox-income-id='${uniqueId}']`);

    if (existing) {
        if (small) {
            existing.textContent = textNoBreak;
        } else {
            const innerSpan = existing.querySelector('span');
            if(innerSpan) {
                innerSpan.textContent = textVal;
            } else {
                existing.textContent = textVal;
            }
        }
        return;
    }
    
    card.querySelectorAll(".income-estimate, .estimate-detail").forEach(n => n.remove());

    if (small) {
        const span = document.createElement("span");
        span.className = "income-estimate";
        span.setAttribute("data-roblox-income-id", uniqueId);
        span.textContent = textNoBreak;
        span.style.whiteSpace = "nowrap";
        span.style.display = "inline-block";
        span.style.transform = "translateY(20px)";

        const preferInfoArea = card.querySelector(".game-card-info, .item-card-info, .card-info, .card-body, .card-footer");
        const prefer = preferInfoArea ? preferInfoArea.querySelector(".info-label, .game-card-meta, .meta, .game-meta, .card-subtitle, .card-footer") : card.querySelector(".info-label");
        
        if (prefer) {
            prefer.appendChild(span);
        } else if (preferInfoArea) {
            preferInfoArea.appendChild(span);
        } else {
            card.appendChild(span);
        }

    } else {
        const titleContainer = card.querySelector(".game-title-container, .game-card-name, .item-card-name");
        const preferInfoArea = card.querySelector(".game-card-info, .item-card-details, .card-info");

        const wrapper = document.createElement("div");
        wrapper.className = "info-label estimate-detail";
        wrapper.setAttribute("data-roblox-income-id", uniqueId);

        const textNode = document.createElement("span");
        textNode.className = "estimate-detail";
        textNode.textContent = textVal;
        
        wrapper.appendChild(textNode);

        if (preferInfoArea) {
            preferInfoArea.appendChild(wrapper);
        } else if (titleContainer) {
            titleContainer.appendChild(wrapper);
        } else {
            card.appendChild(wrapper);
        }
    }
}

function scanPageForCards() {
    const selectors = [
        ".game-card-link",
        ".list-item.game-card", ".game-card", ".card-game", 
        ".game-card-container", ".item-card", ".card"
    ];
    const cards = document.querySelectorAll(selectors.join(', '));

    cards.forEach(card => {
        try {
            applyEstimateToCard(card);

            const approvalRating = getApprovalRating(card);
            setVotePercentageColor(card, approvalRating);

        } catch (e) {
            console.error("RBI Error:", e);
        }
    });
}

function initializeIncomeEstimator() {
    const observer = new MutationObserver(() => {
        if (window.__robloxIncomeScanTimeout) clearTimeout(window.__robloxIncomeScanTimeout);
        window.__robloxIncomeScanTimeout = setTimeout(scanPageForCards, 250);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    scanPageForCards();
}

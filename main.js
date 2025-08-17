//HI
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


async function setProfilePicture(imageElement){
    var avatarImage = await waitForElementToExist("#navigation .avatar img");
    imageElement.src = avatarImage?.src || "";
}

var greetings = {
    "id_id": "Halo",
    "de_de": "Hallo",
    "en_us": "Hello",
    "es_es": "Hola",
    "fr_fr": "Bonjour",
    "it_it": "Ciao",
    "pt_br": "Olá",
    "th_th": "สวัสดี",
    "zh_cn": "你好",
    "zh_tw": "你好",
    "ja_jp": "こんにちは",
    "ko_kr": "안녕하세요",
    "ms_my": "Helo",
    "nb_no": "Hei",
    "sr_rs": "Здраво",
    "da_dk": "Hej",
    "et_ee": "Tere",
    "fil_ph": "Kamusta",
    "hr_hr": "Bok",
    "lv_lv": "Sveiki",
    "lt_lt": "Sveiki",
    "hu_hu": "Helló",
    "nl_nl": "Hallo",
    "pl_pl": "Cześć",
    "ro_ro": "Salut",
    "sq_al": "Përshëndetje",
    "sl_sl": "Zdravo",
    "sk_sk": "Ahoj",
    "fi_fi": "Hei",
    "sv_se": "Hej",
    "vi_vn": "Xin chào",
    "tr_tr": "Merhaba",
    "uk_ua": "Привіт",
    "cs_cz": "Ahoj",
    "el_gr": "Γειά σας",
    "bs_ba": "Zdravo",
    "bg_bg": "Здравейте",
    "ru_ru": "Привет",
    "kk_kz": "Сәлеметсіздерге",
    "ar_001": "مرحبًا",
    "hi_in": "नमस्ते",
    "bn_bd": "হ্যালো",
    "si_lk": "හෙලෝ",
    "my_mm": "မင်္ဂလာ",
    "ka_ge": "გამარჯობა",
    "km_kh": "ជំរាប"
};


(async () => {
    try {
        var userDataMeta = document.querySelector('meta[name="user-data"');
        var userId = userDataMeta.getAttribute('data-userid') || '1';
        var name = userDataMeta.getAttribute('data-name') || 'Name';
        var displayName = userDataMeta.getAttribute('data-displayname') || 'DisplayName';
        var isUnder13 = userDataMeta.getAttribute('data-isunder13') === "true";
        var created = userDataMeta.getAttribute('data-created') || '1/1/2009 1:00:00 AM';
        var isPremiumUser = userDataMeta.getAttribute('data-ispremiumuser') === "true";
        var hasVerifiedBadge = userDataMeta.getAttribute('data-hasverifiedbadge') === "true";

        var userLocaleDataMeta = document.querySelector('meta[name="locale-data"]');
        var languageCode = userLocaleDataMeta.getAttribute('data-language-code') || 'en_us';
        var languageName = userLocaleDataMeta.getAttribute('data-language-name') || 'English';

        var greeting = greetings[languageCode] || "Hello";
        var createdYear = new Date(created).getFullYear();

        
        var oldAccountImg = hasVerifiedBadge 
            ? `<img src="data:image/svg+xml;charset=utf-8,
            %3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'%3E
            %3Cg clip-path='url(%23clip0_8_46)'%3E
            %3Crect x='5.88818' width='22.89' height='22.89' transform='rotate(15 5.88818 0)' fill='%230066FF'/%3E
            %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.543 8.7508L20.549 8.7568C21.15 9.3578 21.15 10.3318 20.549 10.9328L11.817 19.6648L7.45 15.2968C6.85 14.6958 6.85 13.7218 7.45 13.1218L7.457 13.1148C8.058 12.5138 9.031 12.5138 9.633 13.1148L11.817 15.2998L18.367 8.7508C18.968 8.1498 19.942 8.1498 20.543 8.7508Z' fill='white'/%3E
            %3C/g%3E
            %3Cdefs%3E%3CclipPath id='clip0_8_46'%3E%3Crect width='28' height='28' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E
            %3C/svg%3E" style="margin-left:10px;width:24px;height:24px;display:inline-block;vertical-align:middle;">`
            : "";

       
        var oldAccountImg1 = (createdYear < 2015) 
          ? `<img src="data:image/svg+xml;charset=utf-8,
          %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E
          %3Cpath d='M12 2L14.09 8.26L20.97 8.91L15.55 12.97L17.18 19.73L12 16.56L6.82 19.73L8.45 12.97L3.03 8.91L9.91 8.26L12 2Z' 
          fill='gold'/%3E%3C/svg%3E" 
          style="margin-left:10px;width:24px;height:24px;display:inline-block;vertical-align:middle;">`
          : "";

      
        document.querySelector("#HomeContainer > div.section > div").innerHTML = `
            <h1 style="display: flex; align-items: center;">
                <a class="avatar avatar-card-fullbody" style="margin-right:15px;width:128px;height:128px;" href="/users/${userId}/profile">
                    <span class="avatar-card-link friend-avatar icon-placeholder-avatar-headshot" style="width:128px;height:128px;">
                        <thumbnail-2d class="avatar-card-image">
                            <span id="avatar-image" class="thumbnail-2d-container">
                                <img style="background-color: #d4d4d4"></img>
                            </span>
                        </thumbnail-2d>
                    </span>
                </a>
                ${isPremiumUser ? '<span class="icon-premium-medium" style="margin-right: 10px;"></span>' : ""}
                <a href="/users/${userId}/profile" class="user-name-container" style="display: inline-flex; align-items: center;">
                    ${greeting}, ${displayName}! ${oldAccountImg} ${oldAccountImg1}
                </a>
            </h1>
        `;

        const avatarImage = document.getElementById("avatar-image");
        const avatarImageImg = avatarImage.querySelector('img');

        waitForElement('#navigation .avatar .avatar-card-image', 'icon-blocked', "#navigation .avatar img", () => {
            avatarImage.classList.add("icon-blocked");
            avatarImageImg.style.display = 'none';
        }, () => {
            setProfilePicture(avatarImageImg);
        });

    } catch (error) {
        console.error(error);
    }
})();



//GAME DOLAR VALUE
const MIN_ARPU = 0.05;
const MAX_ARPU = 0.15;

function estimateIncome(players) {
    if (!players || isNaN(players)) return null;
    const low = Math.round(players * MIN_ARPU);
    const high = Math.round(players * MAX_ARPU);
    return `$${low.toLocaleString()} - $${high.toLocaleString()}`;
}

function parseNumeric(numericPart, isFromTitle) {
    if (isFromTitle) {
        const cleaned = numericPart.replace(/[^0-9]/g, '');
        return parseInt(cleaned, 10);
    } else {
        const parsedStr = numericPart.replace(/,/g, '');
        return parseFloat(parsedStr);
    }
}

function parsePlayersHighlights(text) {
    if (!text) return null;
    let s = String(text).replace(/\+/g, "").replace(/\u00A0/g, " ").trim().toUpperCase();
    s = s.replace(/[^0-9.,KMB\s]/g, "").replace(/\s+/g, "");
    if (!s) return null;
    const suffix = s.slice(-1);
    let multiplier = 1;
    let numericPart = s;
    if (suffix === "K") multiplier = 1e3;
    else if (suffix === "M") multiplier = 1e6;
    else if (suffix === "B") multiplier = 1e9;
    if (["K","M","B"].includes(suffix)) numericPart = s.slice(0, -1);
    const num = parseNumeric(numericPart, false);
    return isNaN(num) ? null : Math.round(num * multiplier);
}

function parsePlayersGamePage(el) {
    if (!el) return null;
    const title = el.getAttribute("title");
    const textContent = el.textContent;
    let text = title || textContent;
    if (!text) return null;
    text = text.replace(/\+/g, "").replace(/\u00A0/g, " ").trim().toUpperCase();
    text = text.replace(/[^0-9.,KMB\s]/g, "").replace(/\s+/g, "");
    if (!text) return null;
    const suffix = text.slice(-1);
    let multiplier = 1;
    let numericPart = text;
    if (suffix === "K") multiplier = 1e3;
    else if (suffix === "M") multiplier = 1e6;
    else if (suffix === "B") multiplier = 1e9;
    if (["K","M","B"].includes(suffix)) numericPart = text.slice(0, -1);
    const num = parseNumeric(numericPart, !!title);
    return isNaN(num) ? null : Math.round(num * multiplier);
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
        card.dataset.robloxIncomeId = 'rbi-' + Math.random().toString(36).slice(2,9);
    }
    return card.dataset.robloxIncomeId;
}


function removeExistingIncomeLabels(card) {
    if (!card) return;
    const id = card.dataset && card.dataset.robloxIncomeId;

    const sel = [
        "[data-roblox-income-id]",
        ".income-estimate",
        ".estimate-detail"
    ].join(',');
    const nodes = card.querySelectorAll(sel);
    nodes.forEach(n => {

        if (n.dataset && n.dataset.robloxIncomeId) n.remove();
        else if (n.classList && (n.classList.contains('income-estimate') || n.classList.contains('estimate-detail'))) {

            n.remove();
        }
    });
}

function applyEstimateToCard(card) {
    if (!card) return;
    ensureCardId(card);

    const playersEl = card.querySelector(".playing-counts-label, .playing-counts, .online-count, .game-card-playing-count, .game-card-meta .playing");
    let players = playersEl ? parsePlayersHighlights(playersEl.textContent) : null;

    if (!players) {

        const infoEls = card.querySelectorAll(".info-label, .game-card-info .info-label, .game-card-meta, .game-card-info, .card-meta, .card-footer, .card-subtitle, .card-body");
        for (const el of infoEls) {
            const maybe = parsePlayersHighlights(el.textContent);
            if (maybe && maybe >= 1) { players = maybe; break; }
        }
    }

    if (!players) {
        const text = card.textContent || "";
        const candidates = text.match(/(\d[\d.,]*\s*[KMB]?)/ig) || [];
        for (const cand of candidates) {
            if (cand.includes("%")) continue;
            const parsed = parsePlayersHighlights(cand);
            if (parsed && parsed >= 1 && parsed < 1e10) { players = parsed; break; }
        }
    }

    if (!players || players < 5) {

        return;
    }

    const existing = card.querySelector("[data-roblox-income-id='" + card.dataset.robloxIncomeId + "']");
    const preferInfoArea = card.querySelector(".game-card-info, .card-meta, .game-card-details, .game-card-info .game-card-name, .card-footer, .card-body") || card;
    const titleContainer = card.querySelector(".game-title-container, .game-card-info, .game-card-name, .text") || preferInfoArea;
    const small = isSmallCard(card);
    const textVal = estimateIncome(players);
    const textNoBreak = textVal.replace(' - ', '\u00A0-\u00A0') + ' USD';

    if (existing) {

        if (existing.tagName === 'SPAN' || existing.querySelector && existing.querySelector('span')) {
            const span = existing.tagName === 'SPAN' ? existing : existing.querySelector('span') || existing;
            if (small) {
                span.textContent = textNoBreak;
                span.style.whiteSpace = "nowrap";
                span.style.display = "inline-block";
                span.style.transform = "translateY(10px)"; 
            } else {
                span.textContent = textVal;
                span.style.whiteSpace = "";
                span.style.display = "";
                span.style.transform = "";
            }
        } else {
            existing.textContent = small ? textNoBreak : textVal;
        }
        return;
    }

    const prev = card.querySelectorAll(".income-estimate, .estimate-detail");
    if (prev && prev.length > 0) {
        prev.forEach(n => n.remove());
    }


    if (small) {

        const span = document.createElement("span");
        span.className = "income-estimate";
        span.setAttribute("data-roblox-income-id", card.dataset.robloxIncomeId);
        span.textContent = textNoBreak;
        span.style.whiteSpace = "nowrap";
        span.style.display = "inline-block";
        span.style.transform = "translateY(20px)";

        const prefer = preferInfoArea.querySelector(".info-label, .game-card-meta, .meta, .game-meta, .card-subtitle, .card-footer");
        if (prefer) prefer.appendChild(span); else preferInfoArea.appendChild(span);
    } else {

        const wrapper = document.createElement("div");
        wrapper.className = "info-label estimate-detail";
        wrapper.setAttribute("data-roblox-income-id", card.dataset.robloxIncomeId);
        const textNode = document.createElement("span");
        textNode.className = "estimate-detail";
        textNode.textContent = textVal;
        wrapper.appendChild(textNode);
        titleContainer.appendChild(wrapper);
    }
}

function scanHomepageCards() {
    const selectors = [
        ".list-item.game-card",
        ".game-card",
        ".card-game",
        ".game-card-container",
        ".item-card",
        ".card"
    ];
    const seen = new Set();
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(card => {
            if (!card) return;
            if (seen.has(card)) return;
            seen.add(card);
            try {
                applyEstimateToCard(card);
            } catch (e) {

                console.error("rbi: applyEstimateToCard error", e);
            }
        });
    });
}

function startDynamicGamePage() {
    const statEl = document.querySelector(".game-stat:first-child .text-lead, .game-stats .stat:first-child .stat-value, .game-stat .text-lead");
    if (!statEl) return;
    let retryCount = 0;
    let lastPlayers = null;
    let stableCount = 0;
    const maxRetries = 10;
    let debounceTimer = null;
    const update = () => {
        const players = parsePlayersGamePage(statEl);
        const title = statEl.getAttribute("title") || '';
        const textClean = statEl.textContent.replace(/[^0-9]/g, '');
        const titleClean = title.replace(/[^0-9]/g, '');
        if (!players || players < 100 || (title && textClean !== titleClean)) {
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(update, 1000);
            }
            return;
        }
        if (players === lastPlayers) {
            stableCount++;
            if (stableCount >= 2) {
                const titleContainer = document.querySelector(".game-title-container");
                const playButtonParent = document.querySelector(".btn-play-game, .play-button-container")?.parentElement;
                if (titleContainer) {

                    const fakeCard = document.querySelector(".game-page"); 
                    applyEstimateToCard(fakeCard || titleContainer);
                }
                if (playButtonParent) applyEstimateToCard(playButtonParent);
                return;
            }
        } else {
            stableCount = 0;
        }
        lastPlayers = players;
        setTimeout(update, 1000);
    };
    const debouncedUpdate = () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            retryCount = 0;
            stableCount = 0;
            update();
        }, 500);
    };
    update();
    const mo = new MutationObserver(debouncedUpdate);
    mo.observe(statEl, { childList: true, subtree: true, characterData: true, attributes: true });
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


//CONFIG

(function() {
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

    const observer = new MutationObserver(() => {
        addExtensionMenuItem();
    });

    observer.observe(document.body, { subtree: true, childList: true });
})();

//CONECTIONS TO FRIENDS


//ROBUX FOR USD

(function() {
    const DEVEX_RATE = 0.0035; 
    let lastRobux = null;

    function parseRobuxText(text) {
        text = text.toLowerCase().replace(/,/g, '').trim();
        let multiplier = 1;

        if (text.endsWith('k')) {
            multiplier = 1000;
            text = text.slice(0, -1);
        } else if (text.endsWith('m')) {
            multiplier = 1000000;
            text = text.slice(0, -1);
        } else if (text.endsWith('b')) {
            multiplier = 1000000000;
            text = text.slice(0, -1);
        }

        const num = parseFloat(text);
        return isNaN(num) ? 0 : Math.round(num * multiplier);
    }

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

    observeRobuxChanges();
})();


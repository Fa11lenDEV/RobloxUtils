function parsePlayerCount(text) {
    if (!text) return null;
    let s = String(text).replace(/\+/g, "").replace(/\u00A0/g, " ").trim().toUpperCase();
    s = s.replace(/[^0-9.,KMB]/g, "");
    if (!s) return null;
    const suffix = s.slice(-1);
    let multiplier = 1;
    let numericPart = s;
    if (["K", "M", "B"].includes(suffix)) {
        numericPart = s.slice(0, -1);
        if (suffix === "K") multiplier = 1e3;
        else if (suffix === "M") multiplier = 1e6;
        else if (suffix === "B") multiplier = 1e9;
    }
    const num = parseFloat(numericPart.replace(/,/g, ''));
    return isNaN(num) ? null : Math.round(num * multiplier);
}

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

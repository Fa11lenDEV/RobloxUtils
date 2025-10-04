async function setProfilePicture(imageElement) {
    var avatarImage = await waitForElementToExist("#navigation .avatar img");
    imageElement.src = avatarImage?.src || "";
}

function createVerifiedBadgeSVG() {
    return `<img src="data:image/svg+xml;charset=utf-8,
        %3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28' fill='none'%3E
        %3Cg clip-path='url(%23clip0_8_46)'%3E
        %3Crect x='5.88818' width='22.89' height='22.89' transform='rotate(15 5.88818 0)' fill='%230066FF'/%3E
        %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M20.543 8.7508L20.549 8.7568C21.15 9.3578 21.15 10.3318 20.549 10.9328L11.817 19.6648L7.45 15.2968C6.85 14.6958 6.85 13.7218 7.45 13.1218L7.457 13.1148C8.058 12.5138 9.031 12.5138 9.633 13.1148L11.817 15.2998L18.367 8.7508C18.968 8.1498 19.942 8.1498 20.543 8.7508Z' fill='white'/%3E
        %3C/g%3E
        %3Cdefs%3E%3CclipPath id='clip0_8_46'%3E%3Crect width='28' height='28' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E
        %3C/svg%3E" style="margin-left:10px;width:24px;height:24px;display:inline-block;vertical-align:middle;">`;
}

function createOldAccountStarSVG() {
    return `<img src="data:image/svg+xml;charset=utf-8,
        %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E
        %3Cpath d='M12 2L14.09 8.26L20.97 8.91L15.55 12.97L17.18 19.73L12 16.56L6.82 19.73L8.45 12.97L3.03 8.91L9.91 8.26L12 2Z' 
        fill='gold'/%3E%3C/svg%3E" 
        style="margin-left:10px;width:24px;height:24px;display:inline-block;vertical-align:middle;">`;
}

async function customizeProfile() {
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

        var greeting = getGreeting(languageCode);
        var createdYear = new Date(created).getFullYear();

        var oldAccountImg = hasVerifiedBadge ? createVerifiedBadgeSVG() : "";
        var oldAccountImg1 = (createdYear < 2015) ? createOldAccountStarSVG() : "";

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
        console.error("Profile customization error:", error);
    }
}

function initializeProfileCustomizer() {
    customizeProfile();
}

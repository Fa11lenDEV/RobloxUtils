const GITHUB_API = "https://api.github.com/repos/Fa11lenDEV/RobloxUtils/releases"

function formatDate(dateString) {
  const date = new Date(dateString)
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
  return date.toLocaleDateString("en-US", options)
}

function parseMarkdown(text) {
  if (!text) return "<p>No description available.</p>"

  let html = text

  const emojiMap = new Map()
  let emojiCounter = 0
  html = html.replace(/([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu, (match) => {
    const placeholder = `__EMOJI_${emojiCounter}__`
    emojiMap.set(placeholder, match)
    emojiCounter++
    return placeholder
  })

  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  html = html.replace(/```([^`]*?)```/gs, "<pre><code>$1</code></pre>")

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>")

  html = html.replace(/^### (.+)$/gm, '<div class="changelog-separator"></div><h3 class="changelog-section">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<div class="changelog-separator"></div><h2 class="changelog-section">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 class="changelog-title">$1</h1>')

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")

  html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

  const lines = html.split("\n")
  const processedLines = []
  let inList = false
  let listLevel = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const bulletMatch = line.match(/^(\s*)[-*]\s+(.+)$/)

    if (bulletMatch) {
      const indent = bulletMatch[1].length
      const content = bulletMatch[2]
      const currentLevel = Math.floor(indent / 2)

      if (!inList) {
        processedLines.push('<ul class="changelog-list">')
        inList = true
        listLevel = currentLevel
      } else if (currentLevel > listLevel) {
        processedLines.push('<ul class="changelog-sublist">')
        listLevel = currentLevel
      } else if (currentLevel < listLevel) {
        for (let j = 0; j < listLevel - currentLevel; j++) {
          processedLines.push("</ul>")
        }
        listLevel = currentLevel
      }

      processedLines.push(`<li>${content}</li>`)
    } else {
      if (inList) {
        for (let j = 0; j <= listLevel; j++) {
          processedLines.push("</ul>")
        }
        inList = false
        listLevel = 0
      }
      if (line.trim()) {
        processedLines.push(line)
      }
    }
  }

  if (inList) {
    for (let j = 0; j <= listLevel; j++) {
      processedLines.push("</ul>")
    }
  }

  html = processedLines.join("\n")

  html = html.replace(/\n\n+/g, "</p><p>")
  html = `<p>${html}</p>`
  html = html.replace(/<p>\s*<\/p>/g, "")
  html = html.replace(/<p>\s*(<ul|<h[123]|<div)/g, "$1")
  html = html.replace(/(<\/ul>|<\/h[123]>|<\/div>)\s*<\/p>/g, "$1")

  emojiMap.forEach((emoji, placeholder) => {
    html = html.replace(new RegExp(placeholder, "g"), emoji)
  })

  html = html.replace(/^<div class="changelog-separator"><\/div>/, "")

  return html
}

function createUpdateCard(release, isLatest = false) {
  const card = document.createElement("div")
  card.className = `update-card ${isLatest ? "latest" : ""}`

  const body = parseMarkdown(release.body || "")

  card.innerHTML = `
        <div class="update-header">
            <span class="update-version">${release.tag_name || release.name}</span>
            <span class="update-date">${formatDate(release.published_at)}</span>
        </div>
        <div class="update-body">
            ${body}
        </div>
    `

  return card
}

async function loadReleases() {
  console.log("Starting to load releases...")

  const loadingEl = document.getElementById("loading")
  const containerEl = document.getElementById("updates-container")
  const versionEl = document.getElementById("latest-version")
  const versionHeroEl = document.getElementById("latest-version-hero")
  const downloadBtn = document.getElementById("download-btn")
  const releaseCount = document.getElementById("release-count")

  if (!loadingEl || !containerEl) {
    console.error("Required elements not found!")
    return
  }

  try {
    console.log("Fetching from:", GITHUB_API)
    const response = await fetch(GITHUB_API)

    if (!response.ok) {
      throw new Error(`Failed to fetch releases: ${response.status} ${response.statusText}`)
    }

    const releases = await response.json()
    console.log("Loaded releases:", releases.length)

    if (releases.length === 0) {
      containerEl.innerHTML = '<p style="text-align: center; color: #666;">No releases found.</p>'
      loadingEl.style.display = "none"
      return
    }

    if (releaseCount) {
      releaseCount.textContent = releases.length
    }

    const latestRelease = releases[0]
    const versionText = latestRelease.tag_name || latestRelease.name
    console.log("Latest version:", versionText)

    if (versionEl) versionEl.textContent = versionText
    if (versionHeroEl) versionHeroEl.textContent = versionText

    if (downloadBtn) {
      const downloadUrl =
        latestRelease.assets && latestRelease.assets.length > 0
          ? latestRelease.assets[0].browser_download_url
          : latestRelease.html_url
      downloadBtn.href = downloadUrl
      console.log("Download URL:", downloadUrl)
    }

    loadingEl.style.display = "none"

    releases.forEach((release, index) => {
      const card = createUpdateCard(release, index === 0)
      containerEl.appendChild(card)
    })

    console.log("Successfully loaded all releases")
  } catch (error) {
    console.error("Error loading releases:", error)
    loadingEl.innerHTML = `
            <p style="color: #e53e3e; text-align: center;">
                Error loading releases: ${error.message}<br>
                <a href="https://github.com/Fa11lenDEV/RobloxUtils/releases" 
                   target="_blank" 
                   style="color: #667eea; text-decoration: underline;">
                    View releases on GitHub
                </a>
            </p>
        `
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing...")
  loadReleases()
})

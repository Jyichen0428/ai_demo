---
name: wallpaper-downloader
description: "Skill for downloading high-resolution wallpapers from https://pvp.qq.com/web201605/wallpaper.shtml using a Node.js Puppeteer script. Includes summary, usage, and implementation notes."
---

# Wallpaper Downloader Skill

## What this skill does

- Summarizes the current experience with downloading wallpapers from the Tencent PVP wallpaper page.
- Provides the Node.js-based implementation approach used in this workspace.
- Documents the steps to run the downloader and filter for high-resolution images.

## Summary of experience

- The target page is dynamically rendered and does not expose all wallpaper URLs in static HTML.
- A browser automation approach using `puppeteer` was required to load the page and extract real image URLs.
- The project uses `axios` for downloading image files after URL extraction.
- The script was updated to avoid deprecated Puppeteer methods and to work with the installed Puppeteer version.
- High-resolution wallpaper images are selected by filtering URLs that contain `_sProdImgNo_7.jpg`, which corresponds to at least 1920x1080/resolution versions.

## Files involved

- `download-wallpapers.js` — main downloader script
- `package.json` — project dependencies and start script
- `run-download.bat` — Windows shortcut to run the downloader
- `wallpapers/` — destination directory for downloaded images

## How to use

1. Open a terminal in the workspace directory.
2. Ensure Node.js and npm are installed and accessible.
3. Run `npm install` once to install dependencies.
4. Run `npm start` or double-click `run-download.bat`.
5. The script will create a `wallpapers` folder and download only the 1920+ resolution images.

## Notes

- If the page changes, revalidate the selector and URL filter logic in `download-wallpapers.js`.
- The current script targets images from the `shp.qpic.cn/ishow` host and filters by the highest resolution pattern.
- The skill is meant for project-specific reference and should be stored in the workspace under `.github/skills/wallpaper-downloader`.

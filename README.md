# Wallpaper Downloader

This Node.js script downloads all wallpapers from the specified webpage: https://pvp.qq.com/web201605/wallpaper.shtml

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Install Node.js from https://nodejs.org/

2. Clone or download this project.

3. Navigate to the project directory and run:

   ```
   npm install
   ```

## Usage

Run the script:

```
npm start
```

or

```
node download-wallpapers.js
```

For one-click start on Windows, double-click `run-download.bat`.

The wallpapers will be downloaded to the `./wallpapers` directory.

## Troubleshooting

- If you encounter network errors, ensure you have internet access.
- If images fail to download, check the console for error messages.
- The script extracts image URLs from the webpage, so if the webpage structure changes, the script may need updates.
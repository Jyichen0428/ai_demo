const axios = require('axios');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const pageUrl = 'https://pvp.qq.com/web201605/wallpaper.shtml';
const downloadDir = path.resolve(__dirname, 'wallpapers');

async function downloadImage(url, filename) {
  try {
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        Referer: pageUrl
      }
    });

    await new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filename);
      response.data.pipe(stream);
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    console.log(`Downloaded ${filename}`);
  } catch (error) {
    console.error(`Failed to download ${url}: ${error.message}`);
  }
}

async function fetchWallpaperUrls() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');
  await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 60000 });

  await page.waitForSelector('#Work_List_Container_267733', { timeout: 60000 });
  await new Promise(resolve => setTimeout(resolve, 2000));

  const urls = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('a[href*="shp.qpic.cn/ishow"], img[src*="shp.qpic.cn/ishow"]'));
    return [...new Set(nodes.map(node => node.href || node.src))].filter(Boolean);
  });

  await browser.close();
  return urls;
}

async function main() {
  try {
    console.log('Loading wallpaper page in browser...');
    const urls = await fetchWallpaperUrls();
    if (!urls.length) {
      console.error('No wallpaper URLs found.');
      return;
    }

    console.log(`Found ${urls.length} wallpaper URLs.`);
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir, { recursive: true });
    }

    const uniqueUrls = [...new Set(urls)].filter(url => url.includes('_sProdImgNo_7.jpg'));
    for (const imageUrl of uniqueUrls) {
      try {
        const parsed = new URL(imageUrl);
        const parts = parsed.pathname.split('/').filter(Boolean);
        const filenamePart = parts[parts.length - 1] === '0' ? parts[parts.length - 2] : parts[parts.length - 1];
        const filename = path.join(downloadDir, filenamePart);
        await downloadImage(imageUrl, filename);
      } catch (error) {
        console.error(`Invalid image URL: ${imageUrl}`);
      }
    }

    console.log('All downloads completed.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
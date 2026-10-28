import https from 'https';

const INDEXNOW_KEY = '1953f9e8941ee7944f2543cb476201b8';
const HOST = 'www.aritro.cloud';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/aritrosaha`,
  `https://${HOST}/aritro-saha`,
  `https://${HOST}/about`,
  `https://${HOST}/gallery`,
  `https://${HOST}/play`,
  `https://${HOST}/play/typing-test`,
  `https://${HOST}/play/data-pipeline`,
  `https://${HOST}/play/snake`,
  `https://${HOST}/play/sudoku`,
  `https://${HOST}/play/space-invaders`,
  `https://${HOST}/play/flappy-bird`,
  `https://${HOST}/play/tictactoe`,
  `https://${HOST}/projects/byakugan-scan`,
  `https://${HOST}/projects/sutrakey`,
  `https://${HOST}/projects/openworld-portfolio`,
  `https://${HOST}/projects/quarantine`,
  `https://${HOST}/projects/structurify`,
  `https://${HOST}/projects/luffy-laser-dodge`,
  `https://${HOST}/projects/glide-connect`,
  `https://${HOST}/projects/pawsitive`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/ai.txt`
];

export async function pingIndexNow() {
  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log(`🚀 IndexNow: Successfully submitted ${URL_LIST.length} URLs to Bing & partner search engines (HTTP ${res.statusCode}).`);
        } else {
          console.log(`ℹ️  IndexNow response: HTTP ${res.statusCode} (Key validation will complete upon live deployment).`);
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      console.warn(`⚠️  IndexNow ping skipped (${err.message}).`);
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

// Allow running standalone via: node scripts/ping-indexnow.js
if (process.argv[1]?.endsWith('ping-indexnow.js')) {
  pingIndexNow();
}

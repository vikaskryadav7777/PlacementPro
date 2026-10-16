const https = require('https');
const fs = require('fs');

function download(fileId, outPath) {
    return new Promise((resolve, reject) => {
        const url = `https://drive.google.com/uc?export=download&id=${fileId}`;
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                console.log('Redirect to:', res.headers.location.slice(0, 100));
                https.get(res.headers.location, (res2) => {
                    const stream = fs.createWriteStream(outPath);
                    res2.pipe(stream);
                    stream.on('finish', () => {
                        console.log('Downloaded bytes:', fs.statSync(outPath).size);
                        resolve(true);
                    });
                });
            } else {
                const stream = fs.createWriteStream(outPath);
                res.pipe(stream);
                stream.on('finish', () => {
                    console.log('Downloaded bytes directly:', fs.statSync(outPath).size);
                    resolve(true);
                });
            }
        }).on('error', reject);
    });
}

download('1MbvKJorgY-jdb9m62sTOOoE_gjEKI9RE', 'test_pseudo.pdf');

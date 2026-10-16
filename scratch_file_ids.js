const https = require('https');

function listFolder(folderId, label) {
    https.get(`https://drive.google.com/drive/folders/${folderId}`, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            const regex = /AF_initDataCallback\(([\s\S]*?)\);/g;
            let m;
            while ((m = regex.exec(data)) !== null) {
                if (m[1].includes('ds:3')) {
                    const dataIndex = m[1].indexOf('data:');
                    const dataStr = m[1].slice(dataIndex + 5, m[1].lastIndexOf(', sideChannel:'));
                    const evalData = eval(dataStr);
                    const items = evalData[27][7][0][0];
                    console.log(`=== ${label} ===`);
                    items.forEach((item, idx) => {
                        const id = item[0][1];
                        const title = item[24][2][0][2][1][0][0][0];
                        if (title.toLowerCase().includes('comp') || title.toLowerCase().includes('prog') || title.toLowerCase().includes('quant') || title.toLowerCase().includes('logic')) {
                            console.log(`[${idx}] ${title} -> ID: ${id}`);
                        }
                    });
                }
            }
        });
    });
}

listFolder('16gkza8e294gPXdmejStqU7F_GwTsx76S', 'AMCAT');

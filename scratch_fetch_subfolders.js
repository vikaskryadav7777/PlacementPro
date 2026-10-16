const https = require('https');
const fs = require('fs');

function fetchFolder(id, name) {
    return new Promise((resolve) => {
        const url = `https://drive.google.com/drive/folders/${id}`;
        console.log(`Fetching ${name} (${url})...`);
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`Received ${data.length} bytes for ${name}`);
                // find strings in ds:3
                const regex = /AF_initDataCallback\(([\s\S]*?)\);/g;
                let m;
                const foundFiles = [];
                while ((m = regex.exec(data)) !== null) {
                    if (m[1].includes('ds:3')) {
                        const dataIndex = m[1].indexOf('data:');
                        const dataStr = m[1].slice(dataIndex + 5, m[1].lastIndexOf(', sideChannel:'));
                        try {
                            const evalData = eval(dataStr);
                            const strings = new Set();
                            function col(n) {
                                if (!n) return;
                                if (typeof n === 'string') strings.add(n);
                                else if (Array.isArray(n)) n.forEach(col);
                                else if (typeof n === 'object') Object.values(n).forEach(col);
                            }
                            col(evalData);
                            for (const s of strings) {
                                if (s.includes('.pdf') || s.includes('.doc') || s.includes('.txt') || s.includes('.ppt') || s.includes('.zip') || s.includes('Paper') || s.includes('Aptitude') || s.includes('Technical') || s.includes('Question')) {
                                    foundFiles.push(s);
                                }
                            }
                        } catch (e) {
                            console.error(`Eval error for ${name}:`, e.message);
                        }
                    }
                }
                resolve({ name, id, files: [...new Set(foundFiles)] });
            });
        }).on('error', (err) => {
            console.error(`Error fetching ${name}:`, err.message);
            resolve({ name, id, files: [] });
        });
    });
}

async function run() {
    const targets = [
        { name: 'AMCAT', id: '16gkza8e294gPXdmejStqU7F_GwTsx76S' },
        { name: 'COCUBES', id: '1jOYtJntH5pAZyLk7jI1EBoFbz-q5hUKE' },
        { name: 'ELITMUS', id: '1A-62aD5UyXv11Dw5vjQ2yXifIJpnG-by' },
        { name: 'PSEUDOCODE PAPERS', id: '1XrKqBOfucvT0WAuOSa9wMIor6eUDXzL5' },
        { name: 'TCS', id: '1nfADjHiKaMKhOChFAHHZIDGr66LJlmDZ' },
        { name: 'ACCENTURE', id: '14KY-N173ZGD3P-1PsceLAAl6mf0xplk_' },
        { name: 'INFOSYS', id: '16WWF8fq86ERYh7f4npFTGFVaxYM-ZFjh' }
    ];

    for (const target of targets) {
        const result = await fetchFolder(target.id, target.name);
        console.log(`=== ${result.name} Files ===`);
        console.log(result.files);
    }
}

run();

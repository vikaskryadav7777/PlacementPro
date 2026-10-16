const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\vikas\\.gemini\\antigravity-ide\\brain\\02323cc8-d609-48f5-a594-e638c84bd379\\.system_generated\\steps\\37\\content.md', 'utf8');

const regex = /AF_initDataCallback\(([\s\S]*?)\);/g;
let m;
while ((m = regex.exec(content)) !== null) {
    if (m[1].includes('ds:3')) {
        const dataIndex = m[1].indexOf('data:');
        const dataStr = m[1].slice(dataIndex + 5, m[1].lastIndexOf(', sideChannel:'));
        const data = eval(dataStr);
        
        const allStrings = new Set();
        function collect(n) {
            if (!n) return;
            if (typeof n === 'string') allStrings.add(n);
            else if (Array.isArray(n)) n.forEach(collect);
            else if (typeof n === 'object') Object.values(n).forEach(collect);
        }
        collect(data);
        console.log('All unique strings:');
        for (const s of allStrings) {
            if (s.length > 2 && !s.startsWith('http') && !s.includes('driveweb')) {
                console.log('-', s);
            }
        }
    }
}

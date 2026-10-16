const fs = require('fs');

const buf = fs.readFileSync('test_pseudo.pdf');
console.log('Buffer length:', buf.length);
console.log('PDF Header:', buf.slice(0, 10).toString('utf8'));

// Check for text streams / FlateDecode
const content = buf.toString('latin1');
const textMatches = content.match(/\(([^()]{3,})\)[\s]*Tj/g) || [];
console.log('Tj matches count:', textMatches.length);
if (textMatches.length > 0) {
    console.log('Sample text:', textMatches.slice(0, 20).join(' '));
}

// Check if zlib can inflate streams
const zlib = require('zlib');
const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
let match;
let extractedText = '';
let streamCount = 0;
while ((match = streamRegex.exec(content)) !== null) {
    streamCount++;
    try {
        const streamBuf = Buffer.from(match[1], 'latin1');
        const inflated = zlib.inflateSync(streamBuf);
        const inflatedStr = inflated.toString('utf8');
        const tjs = inflatedStr.match(/\(([^()]+)\)[\s]*Tj/g) || [];
        if (tjs.length > 0) {
            extractedText += tjs.map(t => t.replace(/[()]/g, '').replace(/Tj$/, '').trim()).join(' ') + '\n';
        }
    } catch (e) {
        // stream might not be raw zlib or could be compressed differently
    }
}
console.log('Streams found:', streamCount);
console.log('Extracted text length:', extractedText.length);
console.log('Snippet:\n', extractedText.slice(0, 1500));

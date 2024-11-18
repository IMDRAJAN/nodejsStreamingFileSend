const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/download', (req, res) => {
    const filePath = path.resolve(__dirname, 'Products.db');
    const stat = fs.statSync(filePath);

    res.setHeader('Content-Disposition', 'attachment; filename=Products.db');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', stat.size);

    // Stream file with larger buffer
    const readStream = fs.createReadStream(filePath, { highWaterMark: 6553 });

    readStream.pipe(res).on('close', () => {
        console.log('File streamed successfully.');
    });

    readStream.on('error', (err) => {
        console.error('Error streaming file:', err);
        res.status(500).send('Error streaming file.');
    });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));





















// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const cors = require('cors');

// const app = express();

// app.use(cors());

// app.get('/download', (req, res) => {
//     const filePath = path.resolve(__dirname, 'Products.db');
//     const stat = fs.statSync(filePath); // Get file size
//     const fileSize = stat.size;

//     // Set headers for streaming download
//     res.setHeader('Content-Disposition', 'attachment; filename=Products.db');
//     res.setHeader('Content-Type', 'application/octet-stream');
//     res.setHeader('Content-Length', fileSize);

//     // Create a read stream and pipe to the response
//     const readStream = fs.createReadStream(filePath);

//     readStream.pipe(res).on('close', () => {
//         console.log('File streamed successfully.');
//     });

//     readStream.on('error', (err) => {
//         console.error('Error streaming file:', err);
//         res.status(500).send('Error streaming file.');
//     });
// });

// app.listen(5000, () => console.log('Server running on http://localhost:5000'));

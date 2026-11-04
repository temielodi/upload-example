const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, 'uploads/images/');
 },
 filename: (req, file, cb) => {
   cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
 }
});

const upload = multer({ storage: storage });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', upload.single('showcase-image'), (req, res) => {
 const file = req.file;

 if (!file) {
   res.status(400).send('Please upload a file');
   return;
 }

 res.send(file);
});

app.listen(3000, () => console.log('Server started'));

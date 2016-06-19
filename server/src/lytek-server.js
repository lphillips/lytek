var express = require('express');
var bodyParser = require('body-parser');
var MrGoneSheetFiller = require('./mrgone-sheetfiller');
var pdfFiller = require('pdffiller');
var temp = require('temp');
var fs = require('fs');

app = express();

app.use(bodyParser.json()); // for parsing application/json

app.get('/', (req, res) => {
    res.send('');
});

app.post('/', (req, res) => {
    sheetFiller = new MrGoneSheetFiller(req.body);
    var tmpFile = temp.path({
        'suffix': 'pdf'
    });
    fillPdf('exalted3-mrgone.pdf', tmpFile, sheetFiller.dataMap, () => {
        var downloadFileName = sheetFiller.dataMap.name;
        if (downloadFileName == 'undefined' || downloadFileName.length == 0) {
            downloadFileName = 'character';
        }
        res.download(tmpFile, downloadFileName + '.pdf', (error) => {
            if (error) {
                throw error;
            } else {
                fs.unlink(tmpFile);
            }
        });
    });
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

function fillPdf(characterPdfUrl, outputPdfUrl, dataMap, callback) {
    pdfFiller.fillForm(characterPdfUrl, outputPdfUrl, dataMap, (error) => {
        if (error) {
            throw error;
        }
        console.log("Created PDF for character " + dataMap.name);
        callback();
    });
}
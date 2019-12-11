const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const imageDir = './public/images/';
const resultDir = './public/OCRresults/';
const editedResultsDir = './public/editedResults/';
// const finalResultsDir = './public/finalResults/';
const hostname = '127.0.0.1';
const port = 3000;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
let i = 0;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/editedResults', function(req, res) {
    var query = url.parse(req.url,true).query;
        result = query.text;
 
    if (typeof result === 'undefined') {
        getResults(editedResultsDir, function (err, files) {
            var resultLists = '<ul>';
            for (var i=0; i<files.length; i++) {
                resultLists += '<li><a href="/editedResults/?editedresult=' + files[i] + '">' + files[i] + '</li>';
            }
            resultLists += '</ul>';
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(resultLists);
        });
    } else {
        //read the image using fs and send the image content back in the response
        fs.readFile(editedResultsDir + result, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such text");    
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200,{'Content-type': 'text/json'});
                res.end(content);
            }
        });
    }
});

app.post('/editedResults', function(req, res) {
    res.send(req.body);

    getNameofImages(imageDir, function(err, files) {
        fs.writeFile( editedResultsDir + files[i]+'.json', JSON.stringify(req.body), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");

        });
        i += 1;
    })
});

app.get('/images', function(req, res) {
	// use the url to parse the requested url and get the image name
    var query = url.parse(req.url,true).query;
        pic = query.image;

    if (typeof pic === 'undefined') {
        getImages(imageDir, function (err, files) {
            var imageLists = '<ul>';
            for (var i=0; i<files.length; i++) {
                imageLists += '<li><a href="/images/?image=' + files[i] + '">' + files[i] + '</li>';
            }
            imageLists += '</ul>';
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(imageLists);
        });
    } else {
        //read the image using fs and send the image content back in the response
        fs.readFile(imageDir + pic, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such image");    
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200,{'Content-type': 'image/jpg'});
                res.end(content);
            }
        });
    }
});

app.get('/results', function(req, res) {
	var query = url.parse(req.url,true).query;
        result = query.text;
 
    if (typeof result === 'undefined') {
        getResults(resultDir, function (err, files) {
            var resultLists = '<ul>';
            for (var i=0; i<files.length; i++) {
                resultLists += '<li><a href="/results/?result=' + files[i] + '">' + files[i] + '</li>';
            }
            resultLists += '</ul>';
            res.writeHead(200, {'Content-type':'text/html'});
            res.end(resultLists);
        });
    } else {
        //read the image using fs and send the image content back in the response
        fs.readFile(resultDir + result, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such text");    
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200,{'Content-type': 'text/json'});
                res.end(content);
            }
        });
    }
});


app.listen(port, hostname, () => {
  console.log(`CORS-enabled web server running at http://${hostname}:${port}/`);
});

function getNameofImages(imageDir, callback) {
    var fileType = '.jpg',//| ',jpeg' | '.png',
        files = [], i;
    fs.readdir(imageDir, function (err, list) {
        for(i=0; i<list.length; i++) {
            if(path.extname(list[i]) === fileType) {
                var fileName = path.basename(list[i], '.jpg');
                files.push(fileName); //store the file name into the array files
            }
        }
        callback(err, files);
    });
}

 
//get the list of jpg files in the image dir
function getImages(imageDir, callback) {
    var fileType = '.jpg',//| ',jpeg' | '.png',
        files = [], i;
    fs.readdir(imageDir, function (err, list) {
        for(i=0; i<list.length; i++) {
            if(path.extname(list[i]) === fileType) {
                files.push(list[i]); //store the file name into the array files
            }
        }
        callback(err, files);
    });
}

function getResults(resultDir, callback) {
    var fileType = '.json',
        files = [], i;
    fs.readdir(resultDir, function (err, list) {
        for(i=0; i<list.length; i++) {
            if(path.extname(list[i]) === fileType) {
                files.push(list[i]); //store the file name into the array files
            }
        }
        callback(err, files);
    });
}

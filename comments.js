// Create web server
// Run: node comments.js
// Go to: http://localhost:3000/
// Note: This is a sample code for demo only, not for production use

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create web server
http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    // Route to appropriate request handler
    if (pathname == "/") {
        display_form(response);
    } else if (pathname == "/post_comment") {
        post_comment(request, response);
    } else if (pathname == "/get_comments") {
        get_comments(response);
    } else {
        display_404(pathname, response);
    }
}).listen(3000);

console.log("Server has started.");

// Display the form
function display_form(response) {
    fs.readFile('comment_form.html', 'utf-8', function (error, data) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(data);
    });
}

// Handle POST request
function post_comment(request, response) {
    var comment = '';
    request.on('data', function (chunk) {
        comment += chunk;
    });
    request.on('end', function () {
        comment = qs.parse(comment);
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end('Name: ' + comment['name'] + '\nComment: ' + comment['comment']);
    });
}

// Get comments
function get_comments(response) {
    fs.readFile('comments.txt', 'utf-8', function (error, data) {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(data);
    });
}

// Display 404 error
function display_404(pathname, response) {
    response.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    response.end('404 Not Found: ' + pathname);
}



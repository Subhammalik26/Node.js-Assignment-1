const http = require('http');   // Include the HTTP module.
const fs = require('fs');     // Include the File System module.
http.createServer((req, res) => {     // create an HTTP server.
  // Assigning the values of url & method of req object.
  const url = req.url;
  const method = req.method;
  // Home page with Greeting text.  
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`<head><title>Home Page</title></head>
    <h3>Welcome to the 1st Assignment of Node.js course.</h3>`); 
    res.end();  // end of response to this route.
  }
  // Create Page 
  if (url === '/create') {
    res.setHeader('Content-Type', 'text/html');
    res.write(`
    <head><title>Create Page</title></head>
    <form action="/add" method="POST">
    <label><b>userName:</b></label>
    <input type="text" name="userName">
    <button type="submit">Submit</button>
    </form>
    `);      // Show the form with "userName" input and submit button.
    res.end();
  }
  if (url === '/add' && method === 'POST') {    // Call POST request to "/add" and store user name in text file.
    const body = [];   // Declaring an array.
      req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);    // Push the chunks of data in to the array.
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];  // Split the string at the '=' character & retrieves the second element of the array     
      fs.appendFile('userName.txt', message + '\n', err => {     // Store username in a text file whatever the user has entered .
      res.statusCode = 302;
      res.setHeader('Location', '/create');   // Redirecting to the create route.
      res.end();  
      }); 
    });
  }
  // User page
  if (url === '/user') {
    fs.readFile('userName.txt', (err, data) => {    // read the data inside the text file.
      if (err) {
        res.statusCode = 302;
        res.setHeader('Location', '/create');  // Redirecting to the create route if there is no user.
        res.end();
      } else {   
      res.setHeader('Content-Type', 'text/html');
      res.write(data);     // Response back or show the data to the client or user.
      res.end();
    }
    });
  }
}).listen(3000);  // Spin Node.js server on port 3000.




  

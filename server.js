/**
 * Created by Darkstar on 11/30/2016.
 */

const path = require('path');
const http = require('http');
const Express = require('express');
const React = require('react');

const app = new Express();
const server = new http.Server(app);

app.use(Express.static(path.join(__dirname, 'public')));

app.use(function(req,res){
	res.sendFile('index.html',{root:'./public/'})
})

server.listen(process.env.PORT || 1440, (err) => {
    if (err) {
        return console.error(err);
    }
    console.info('Server running on http://localhost:' + ( process.env.PORT ? process.env.PORT : "1440" ));
});

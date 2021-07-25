const express = require('express');
const path = require('path');

function viewMiddleware(app) {
  // built-in middleware - express.static will serve every with an client as a static resource.
  // E.g. static resource for css and js files links in html file
  app.use(express.static(path.join(global.appRoot, '/client/public/')));

  // built-in middleware - specific static resource for bootstrap css file
  // If node can't find the css in /public set above, it will look for the css on this specific folder
  app.use(
    '/css',
    express.static(
      path.join(global.appRoot, '/node_modules/bootstrap/dist/css/')
    )
  );

  // built-in middleware - specific static resource for bootstrap js file.
  // If node can't find the js in /public set above, it will look for the js on this specific folder
  app.use(
    '/js',
    express.static(
      path.join(global.appRoot, '/node_modules/bootstrap/dist/js/')
    )
  );

  // built-in middleware - specific static resource for jquery js file.
  // If node can't find the js in /public set above, it will look for the js on this specific folder
  app.use(
    '/js',
    express.static(path.join(global.appRoot, '/node_modules/jquery/dist/'))
  );

  // view engine middleware for node html pages
  app.set('views', './client/src/views');
  app.set('view engine', 'ejs');

  // example of serving static html without using view engine
  /* app.get('/faq.html', (req, res) => {
    res.sendFile(path.join(global.appRoot, '/client/src/views/', '/faq.html'));
  }); */
}

module.exports = viewMiddleware;

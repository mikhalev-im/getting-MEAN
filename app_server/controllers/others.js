'use strict';


module.exports.about = function(req, res) {
  res.render('generic-text', {
    title: 'About us',
    content: 'Loc8r was created to help people find places to sit down' +
             ' and get bit of work done.\n\n Lorem ipsum dolor sit amet,' +
             ' consectetur adipisicing elit. Provident inventore beatae ' +
             'reiciendis, sapiente laudantium recusandae repudiandae ' +
             'fugit temporibus. Necessitatibus, alias.'
  });
};
'use strict';

const aD = require('./controllers/author');

exports.init = (router) => {
  router.route('/').get((req, res) => {
    res.status(200).send({message: 'Online Library Dashboard'});
  });

  router.route('/author').get(aD.authorDetails);
  router.route('/author/1').get(aD.authorValue);
};

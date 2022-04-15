'use strict';

exports.init = (router) => {
  router.route('/').get((req, res) => {
      console.log('test');
    res.status(200).send({message: 'Online Library Dashboard'});
  });
};

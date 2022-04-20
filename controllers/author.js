'use strict';

/**
 * Get Data
 * @param {object} req body.
 * @param {object} res body.
 */
async function authorDetails(req, res) {
  console.log('req ', req);
  if (req.body) {
    res.status(403).send({message: 'Forbidden!!!'});
  }
  if (req.query) {
    res.status(200).send({message: 'test'});
  }
  res.status(200).send({message: 'Done!!!'});
}

/**
 * Get Data
 * @param {object} req body.
 * @param {object} res body.
 */
async function authorValue(req, res) {
  console.log('req ', req);
  if (req.body) {
    res.status(403).send({message: 'Who cares'});
  }
  res.status(200).send({message: 'No one does'});
}

/**
 * Get Data
 * @param {object} req body.
 * @param {object} res body.
 */
async function authorValues(req, res) {
  console.log('req ', req);
  if (req.body) {
    res.status(403).send({message: 'Who cares'});
  }
  res.status(200).send({message: 'No one does'});
}

module.exports = {authorDetails, authorValue, authorValues};

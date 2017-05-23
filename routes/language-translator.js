'use strict';

var watson = require('watson-developer-cloud');
var config = require('../config');


var languageTranslator = watson.language_translator({
    url: config.watson.language_translator.url,
    username: config.watson.language_translator.username,
    password: config.watson.language_translator.password,
    version: config.watson.language_translator.version
});

module.exports.translate = function(req, res, next) {
  var params = {
    text: req.body.text,
    model_id: 'en-de'
  };
  languageTranslator.translate(params, function(error, result) {
    if (error)
      return next(error);
    else
      return res.json(result);
  });
};

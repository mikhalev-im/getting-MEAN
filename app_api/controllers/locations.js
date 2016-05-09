'use strict';

var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

var theEarth = (function() {
  const EARTH_RADIUS = 6371;
  
  function getDistanceFromRads(rads) {
    return parseFloat(rads * EARTH_RADIUS);
  }

  function getRadsFromDistance(distance) {
    return parseFloat(distance / EARTH_RADIUS);
  }

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  }
})();


module.exports.locationsListByDistance = function(req, res) {
  
  if (!req.query.lng || !req.query.lat) {
    sendJsonResponse(res, 404, { "message": "lng and lat query parameters are required" });
    return;
  }
  
  var lng = parseFloat(req.query.lng),
      lat = parseFloat(req.query.lat),
      point = {
        type: "Point",
        coordinates: [lng, lat]
      },
      geoOptions = {
        spherical: true,
        num: 10,
        maxDistance: 2000
      };

  Loc.geoNear(point, geoOptions, function(err, results, stats) {
    
    if (err) {
      sendJsonResponse(res, 404, err);
    } else {
      var locations = [];
      results.forEach(function(doc) {
        locations.push({
          distance: theEarth.getDistanceFromRads(doc.dis),
          name: doc.obj.name,
          address: doc.obj.address,
          rating: doc.obj.rating,
          facilities: doc.obj.facilities,
          _id: doc.obj._id
        });
      });
      sendJsonResponse(res, 200, locations);
    }
  });
};

module.exports.locationsCreate = function(req, res) {
  Loc.create({
    name: req.body.name,
    address: req.body.name,
    facilities: req.body.facilities.split(","),
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    openingTimes: [{
      days: req.body.days1,
      opening: req.body.opening1,
      closing: req.body.closing1,
      closed: req.body.closed1,
    }, {
      days: req.body.days2,
      opening: req.body.opening2,
      closing: req.body.closing2,
      closed: req.body.closed2
    }]
  }, function(err, location) {
    if (err) {
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, location);
    }
  });
};

module.exports.locationsReadOne = function(req, res) {
  if (req.params && req.params.locationid) {
    
    Loc
    .findById(req.params.locationid)
    .exec(function(err, location) {
      
      if (!location) {
        sendJsonResponse(res, 404, {"message": "locationid not found"});
        return;
      }
      else if (err) {
        sendJsonResponse(res, 404, err);
        return;
      }
      sendJsonResponse(res, 200, location);

    });

  }
  else {
    sendJsonResponse(res, 404, {"message": "No location in request"});
  }
  
};

module.exports.locationsUpdateOne = function(req, res) {

};

module.exports.locationsDeleteOne = function(req, res) {

};
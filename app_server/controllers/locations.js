'use strict';

var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://still-taiga-69739.herokuapp.com"
}

function renderHomepage(req, res, responseBody) {
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }

  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places" +
             "to work when out and about. Perhaps with coffee, cake or" +
             " a pint? Let Loc8r help you find the place you're looking for.",
    locations: responseBody,
    message: message
  });
}

function _formatDistance(distance) {
  var numDistance, unit;
  if (distance > 1000) {
    numDistance = parseFloat(distance).toFixed(1);
    unit = 'km';
  } else {
    numDistance = parseInt(distance);
    unit = 'm';
  }
  return numDistance + unit;
}

module.exports.homelist = function(req, res) {
  var requestOptions, path;
  path = '/api/locations';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {
      lng: 50.7906,
      lat: 61.6301,
      maxDistance: 20
    }
  };
  request(requestOptions, function(err, response, body) {
    var i, data = body;
    if (response.statusCode === 200 && data.length) {
      for (i = 0; i < data.length; i++) {
        data[i].distance = _formatDistance(data[i].distance);
      }
    }
    renderHomepage(req, res, data);
  });
  
};

module.exports.locationInfo = function(req, res) {
  res.render('location-info', {
    title: 'Location info',
    location: {
      name: 'Starcups',
      address: '125 High Street, Reading, RG6 1PS',
      rating: 3,
      facilities: ['Hot drinks', 'Food', 'Premium wifi'],
      distance: '100m',
      openingTimes: [
        {
          days: 'Monday-Friday',
          opening: '7:00am',
          closing: '7:00pm',
          closed: false
        },
        {
          days: 'Saturday',
          opening: '8:00am',
          closing: '5:00pm',
          closed: false
        },
        {
          days: 'Sunday',
          closed: true
        }
      ],
      mapSource: "http://maps.googleapis.com/maps/api/" +
                 "staticmap?center=51.455041,-0.9690884&zoom=17" +
                 "&size=400x350&sensor=false&markers=" +
                 "51.455041,-0.9690884&scale=2"
    },
    reviews: [
      {
        author: 'Simon Holmes',
        date: '16 July 2013',
        rating: 5,
        review: "Whar a great place. I can't say enough good things about it."
      },
      {
        author: 'Charlie Chaplin',
        date: '16 June 2013',
        rating: 3,
        review: "It was okay. Coffee wasn't great, but the wifi was fast."
      }
    ],
    sidebar: {
      context: "Simon's cafe is on Loc8r because it has accessible " +
            "wifi and space to sit down with your laptop and get" +
            " some work done.",
      callToAction: "If you've been and you like it - or if you don't - " +
             "please  leave a review to help other people just like you."
    }

  });
};

module.exports.addReview = function(req, res) {
  res.render('location-review-form', {
    title: 'Review Starcups on Loc8r',
    pageHeader: {
      title:'Review Starcups'
    }
  });
};
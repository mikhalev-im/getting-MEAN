'use strict';


module.exports.homelist = function(req, res) {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places" +
             "to work when out and about. Perhaps with coffee, cake or" +
             " a pint? Let Loc8r help you find the place you're looking for.",
    locations: [
      {
        name: 'Starcups',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 3,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '100m'
      },
      {
        name: 'Cafe Hero',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 4,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '200m'
      },
      {
        name: 'Burger Queen',
        address: '125 High Street, Reading, RG6 1PS',
        rating: 2,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        distance: '250m'
      }
    ]
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
'use strict'
// react
var React = require('react');
var ReactDOM = require('react-dom');

// react-router
var Router = require('react-router').Router
var Route = require('react-router').Route

// pages
var App = require("./components/app");
var StyleGuide = require("./components/style_guide");
var BeerShow = require("./components/beer_show");

// test pages
var Draggable = require("./components/tests/draggable");


ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="styleguide" component={StyleGuide} />
      <Route path="styleguide/beer-show" component={BeerShow} />
      <Route path="tests/draggable" component={Draggable} />
    </Route>
  </Router>
), document.getElementById('container'));

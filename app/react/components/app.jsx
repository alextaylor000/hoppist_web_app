'use strict'
var React = require('react');
var Footer = require('./footer');
var HeaderNavbar = require('./header_navbar');
var Uri = require('jsuri');
var Reqwest = require('reqwest')

module.exports = React.createClass({
  displayName: "App",

  API_ENDPOINT: '/api/v1',

  getInitialState() {
    return { signedIn: false, currentUser: {} }
  },

  componentWillMount() {
    var jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (jwt) { sessionStorage.setItem('jwt', jwt); }
  },

  componentDidMount() {
    if (sessionStorage.getItem('jwt')) {
      this.getCurrentUser();
    }
  },

  apiRequest(optionsObj) {
    var url     = optionsObj.url
    var method  = optionsObj.method
    var data    = optionsObj.data
    var success = optionsObj.success
    var error   = optionsObj.error ? optionsObj.error : (error)=>{ console.error(url, error['response']); location = '/';}

    // Handle relative and absolute URLs
    if(url[0] !== '/') {
      url = `${this.API_ENDPOINT}/${url}`;
    }

    /* TODO: when I add contentType: application/json to the Reqwest
      object, Rails complains 'Error occurred while parsing request parameters.'
      Am I somehow not encoding the JSON correctly with this request??  */
    Reqwest({
      url: url,
      method: method,
      type: 'json',
      data: data,
      headers: {'Authorization': sessionStorage.getItem('jwt') },
      success: success,
      error: error
    });
  },


  getCurrentUser() {
    this.apiRequest({
      url:     '/api/current_user',
      method:  'get',
      success: (user) => {
        this.setState({
          signedIn: true,
          currentUser: user
        })
      }
    })
  },


  render() {
    return (
      <div id="app">
        <HeaderNavbar
          signedIn={this.state.signedIn}
          currentUser={this.state.currentUser}/>
        {React.cloneElement(this.props.children,
          {apiRequest:  this.apiRequest,
           signedIn: this.state.signedIn,
           currentUser: this.state.currentUser}
        )}
        <Footer />
      </div>
    );
  },
});

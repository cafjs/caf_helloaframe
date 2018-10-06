"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var redux = require('redux');
var AppReducer = require('./reducers/AppReducer');
var AppActions = require('./actions/AppActions');
var AppSession = require('./session/AppSession');
var cE = React.createElement;
var MyApp = require('./components/MyApp');

var main = exports.main = function(data) {
    if (typeof window !== 'undefined') {
        var ctx =  {
            store: redux.createStore(AppReducer)
        };
        AppSession.connect(ctx, function(err, data) {
            err && console.log('Got error initializing: ' + err);
            ReactDOM.render(cE(MyApp, {ctx: ctx}),
                            document.getElementById('content'));
        });
    }
};

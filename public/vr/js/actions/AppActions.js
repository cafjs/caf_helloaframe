"use strict";

var AppConstants = require('../constants/AppConstants');
var json_rpc = require('caf_transport').json_rpc;
var caf_cli =  require('caf_cli');


var updateF = function(store, state) {
    var d = {
        type: AppConstants.APP_UPDATE,
        state: state
    };
    store.dispatch(d);
};

var errorF =  function(store, err) {
    var d = {
        type: AppConstants.APP_ERROR,
        error: err
    };
    store.dispatch(d);
};

var getNotifData = function(msg) {
    return json_rpc.getMethodArgs(msg)[0];
};

var notifyF = function(store, message) {
    var d = {
        type: AppConstants.APP_NOTIFICATION,
        state: getNotifData(message)
    };
    store.dispatch(d);
};

var wsStatusF =  function(store, isClosed) {
    var d = {
        type: AppConstants.WS_STATUS,
        isClosed: isClosed
    };
    store.dispatch(d);
};

var AppActions = {
    init(ctx, cb) {
        var tok =  caf_cli.extractTokenFromURL(window.location.href);
        var data = ctx.session.hello(ctx.session.getCacheKey(), tok,
                                     function(err, data) {
                                         if (err) {
                                             errorF(ctx.store, err);
                                         } else {
                                             updateF(ctx.store, data);
                                         }
                                         cb(err, data);
                                     });
    },
    message(ctx, msg) {
        notifyF(ctx.store, msg);
    },
    closing(ctx, err) {
        console.log('Closing:' + JSON.stringify(err));
        wsStatusF(ctx.store, true);
    },
    setLocalState(ctx, data) {
        updateF(ctx.store, data);
    },
    resetError(ctx) {
        errorF(ctx.store, null);
    },
    setError(ctx, err) {
        errorF(ctx.store, err);
    }
};


['setMarker', 'deleteMarker', 'getState'].forEach(function(x) {
    AppActions[x] = function() {
        var args = Array.prototype.slice.call(arguments);
        var ctx = args.shift();
        args.push(function(err, data) {
            if (err) {
                errorF(ctx.store, err);
            } else {
                updateF(ctx.store, data);
            }
        });
        ctx.session[x].apply(ctx.session, args);
    };
});

/*
 // Samsung Internet 4.X does not support async/await

['setMarker', 'deleteMarker', 'getState'].forEach(function(x) {
    AppActions[x] = async function() {
        try {
            var args = Array.prototype.slice.call(arguments);
            var ctx = args.shift();
            var data = await ctx.session[x].apply(ctx.session, args)
                    .getPromise();
            updateF(ctx.store, data);
        } catch (err) {
            errorF(ctx.store, err);
        }
    };
});
*/

module.exports = AppActions;

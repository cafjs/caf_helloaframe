var cli = require('caf_cli');
var AppActions = require('../actions/AppActions');


exports.connect = function(ctx, cb) {

    var session = new cli.Session(window.location.href, null,
                                  {timeoutMsec: 60000});

    session.onopen = function() {
        console.log('open session');
        AppActions.init(ctx, cb);
    };

    session.onmessage = function(msg) {
        AppActions.message(ctx, msg);
    };

    session.onclose = function(err) {
        console.log('Closing:' + JSON.stringify(err));
        AppActions.closing(ctx, err);
    };

    ctx.session = session;

    return session;
};


/*
   // Samsung Internet 4.X does not support async/await

exports.connect = function(ctx, cb) {
    return new Promise((resolve, reject) => {

        var session = new cli.Session(window.location.href, null,
                                      {timeoutMsec: 60000});

        session.onopen = async function() {
            console.log('open session');
            try {
                resolve(await AppActions.init(ctx));
            } catch (err) {
                reject(err);
            }
        };

        session.onmessage = function(msg) {
            //        console.log('message:' + JSON.stringify(msg));
            AppActions.message(ctx, msg);
        };

        session.onclose = function(err) {
            console.log('Closing:' + JSON.stringify(err));
            AppActions.closing(ctx, err);
            err && reject(err); // no-op if session already opened
        };

        ctx.session = session;
    });
};

*/

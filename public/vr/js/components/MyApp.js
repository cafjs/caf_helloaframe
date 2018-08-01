
var React = require('react');
var aframe = require('aframe');
var aframeR = require('aframe-react');
var Entity = aframeR.Entity;
var Scene = aframeR.Scene;

var cE = React.createElement;
var AppActions = require('../actions/AppActions');

/*
var Splash = require('./Splash');
var Markers = require('./Markers');
var InfoPanel = require('./InfoPanel');
var HumanModel = require('./HumanModel');
var AppStatus = require('./AppStatus');
var Controller = require('./Controller');
 */


var MyApp = {
    getInitialState() {
        return this.props.ctx.store.getState();
    },
    componentDidMount() {
        if (!this.unsubscribe) {
            this.unsubscribe = this.props.ctx.store
                .subscribe(this._onChange.bind(this));
            this._onChange();
        }
    },
    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    },
    _onChange() {
        if (this.unsubscribe) {
            this.setState(this.props.ctx.store.getState());
        }
    },
    render: function() {
        this.state = this.state || {};
        return cE(Scene, null,
                  cE('a-assets', null,
                     cE('img', {
                         id: 'backgroundImg',
                         src: '../../../assets/chess-world.jpg'
                     }),
                     cE('a-asset-item', {
                         id: 'human-obj',
                         src: '../../../assets/char1.obj'
                     }),
                     cE('a-asset-item', {
                         id: 'human-mtl',
                         src: '../../../assets/char1.mtl'
                     })
                    ),
                  cE(Entity, {
                      'obj-model': 'obj: #human-obj; mtl: #human-mtl',
                      position: {x: 0, y: 0, z: -4.5},
                      scale: '0.2 0.2 0.2'
                  }),
                  cE(Entity, {
                      primitive: 'a-sky',
                      'phi-start': 90,
                      src: '#backgroundImg'
                  }),
                  cE(Entity, {
                      light: 'type: ambient; intensity: 0.4'
                  }),
                  cE(Entity, {
                      light: 'type: directional; intensity:0.6',
                      position: '0 1 1'
                  }),
                  cE(Entity, {
                      'laser-controls' : 'hand: left',
                      raycaster: 'showLine: true; far: 50',
                      line:'color: red; opacity: 0.75'
                  })
                 );
/*
        if (this.state.loading) {
            return cE(Splash, null);
        } else {
            return cE(rVR.View, null,
                      cE(AppStatus, {
                          isClosed: this.state.isClosed
                      }),
                      cE(Controller, {
                          selectedDevice: this.state.selectedDevice
                      }),
                      cE(rVR.AmbientLight, {intensity: 0.6}),
                      cE(rVR.DirectionalLight, {position:[0,1,1]}),
                      cE(rVR.Pano, {source: rVR.asset('chess-world.jpg')}),
                      cE(InfoPanel, {
                          ctx: ctx,
                          deviceInfo: this.state.deviceInfo,
                          markers: this.state.markers
                      }),
                      cE(Markers, {
                          ctx: ctx,
                          offset: [0, -1, -3],
                          markers: this.state.markers,
                          selectedDevice: this.state.selectedDevice
                      }),
                      cE(HumanModel, {rotation: this.state.rotation})
                     );
        }
 */
    }
};

module.exports = React.createClass(MyApp);

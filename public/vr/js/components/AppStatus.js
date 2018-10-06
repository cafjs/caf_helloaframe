var React = require('react');
var cE = React.createElement;
var aframeR = require('aframe-react');
var Entity = aframeR.Entity;


class AppStatus extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (this.props.isClosed ?
                cE(Entity, {},
                   cE(Entity, {
                       geometry : {primitive: 'box', width: 6, height: 1,
                                   depth:0.1},
                       material: {color: 'yellow'},
                       position: {x: 0, y: 2, z: -4.1}

                   }),
                   cE(Entity, {
                       text: {
                           value: 'Please reload',
                           align: 'center',
                           color: 'red',
                           width: 20.0
                       },
                       position:{x: 0, y: 2, z: -4}
                   })
                  ) :
                cE(Entity, null));
    }
}

module.exports = AppStatus;

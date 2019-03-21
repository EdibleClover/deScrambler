import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import MyButton from './MyButton.js'


export default class Controls extends Component {
    render() {
        const decoders = this.props.decoders 
            const buttons = Object.keys(decoders).map((decoder) =>
                <MyButton
                    key={decoder}
                    value={decoder}
                    handleClick={(e)=>this.props.handleClick(e)}
                    isActive={decoders[decoder]}
                />
            );
        return (
            <ButtonToolbar>
                {buttons}
            </ButtonToolbar>
        );
    }
}


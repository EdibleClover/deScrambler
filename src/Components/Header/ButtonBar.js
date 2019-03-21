import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

import MyButton from './MyButton.js'


export default class Controls extends Component {
   
    render() {
        const decoders = this.props.decoders 
        ///Object.values(controls).slice(2)
       console.warn(decoders)
            
            const buttons = decoders.map((decoder,i) =>
            
                <MyButton
                    key={decoder[i]}
                    value={decoder.value}
                    handleClick={(e)=>this.props.handleClick(e)}
                    isActive={decoder.value}
                />
            );

        return (
            <ButtonToolbar>
                {buttons}
            </ButtonToolbar>
        );
    }
}


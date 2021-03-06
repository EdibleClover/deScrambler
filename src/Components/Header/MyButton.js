import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';


export default class Controls extends Component {

    render(props) {
        const isActive = (this.props.isActive) ? '' : 'outline-'
        const variant = (this.props.isActive) ? 'success' : 'dark'
        return (
                <Button
                    className="button"
                    variant={isActive + variant}
                    onClick={(e)=>this.props.handleClick(e)}
                    value={this.props.value}
                >
                {this.props.value}
                </Button>
        );
    }
}
import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { ButtonBar } from './index.js'


export default class Decoder extends Component {


//NEED TO TURN DECODERS NAMES INTO A BIG ARRAY AND USE THAT TO PASS TEH DATA DOWN INTO EVERYTHING
    constructor(props) {
        super(props)
        this.state = {
            value: 'Decode Me!',
            decoded: '',
            decoders:[{"hex": true}, {"fromChar": true}, {"fixConcats": true}, {"removeBadChars": true}, {"base64Decode": true}, {"Format": false}]
        }
    
    
    
    }
    HandleTextChange = (e) => {
        this.setState({ value: e.target.value, decoded: e.target.value })
    }



    handleClick = (e) => {
        const target = e.target.value
        this.setState((state)=>{
            return {[target]:!state[target]}
        });
        console.log(Object.values(this.state))
    }



    render() {
        let controls = this.state
        //pass on controls without uneeded extra state
        //seems more same to strip it and send it down to components
        return (
            <div>
                <div className="Controls">
                    <ButtonBar
                        handleClick={(e) => {this.handleClick(e)}}
                        decoders={this.state.decoders}
                    />
                </div>





                <SplitterLayout>
                    <div className="Input">
                        <textarea
                            className="Input"
                            value={this.state.value}
                            onChange={(e) => { this.HandleTextChange(e) }}
                        />
                    </div>
                    <div>{this.state.decoded}</div>
                </SplitterLayout>
            </div>
        );
    }
}





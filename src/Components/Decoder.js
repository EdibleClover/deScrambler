import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { ButtonBar, UnTangler } from './index.js'


export default class Decoder extends Component {


    constructor(props) {
        super(props)
        this.state = {
            value: 'Decode Me!',
            decoded: '',
            decoders: {"hex": true, "fromChar": true, "fixConcats": true, "removeBadChars": true, "base64Decode": true, "Format": false}
        }
    }
    HandleTextChange = (e) => {
        this.setState({ value: e.target.value, decoded: e.target.value })
    }
    handleClick = (e) => {
        const target = e.target.value
        const decoders = {...this.state.decoders}
        this.setState(prevState => ({
            decoders: {
                ...prevState.decoders,
                [target]:!prevState.decoders[target]
            }
        }))
    }
    unTangle = (code) => {
        const unTangler = new UnTangler()
        
        Object.keys(this.state.decoders).forEach((decoder,i)=> {
            if (this.state.decoders.decoder){
                code = unTangler[decoder](code)
            }
            return code
        })
    }
    render() {
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





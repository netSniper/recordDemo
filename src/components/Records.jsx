import React, { Component } from 'react';
import Record from './Record.jsx';
// import axios from 'axios';
import * as RecordsApi from '../utils/RecordsApi.jsx';
import RecordForm from './RecordForm.jsx';
class Records extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            records: []
        }
    }
    // https://5a7bb0aefb0574001285055a.mockapi.io/record
    componentDidMount(){
        RecordsApi.getAll().then(
            response => this.setState({
                records: response.data,
                isLoaded: true
              })        
            ).catch(
            error =>this.setState({
                isLoaded:true,
                error
            })
        )

    }
    render() {
        const { error, isLoaded, records } = this.state;
        let recordsCoponent;
        if(error){
            recordsCoponent = <div>error:{error.message}</div>
        }else if(!isLoaded){
            recordsCoponent = <div>loading....</div>
        }else{
            recordsCoponent = (
                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => <Record key={record.id} {...record} />)}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div>
                <h2>Records</h2>
                <RecordForm/>
                {recordsCoponent}
            </div>
        )
    }
}
export default Records;
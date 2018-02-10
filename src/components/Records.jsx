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
    addRecord(record){
        console.log(record);
        this.setState({
            error: null,
            isLoaded: true,
            records: [
                ...this.state.records,
                record
            ]
        })
    }
    updateRecord(record, data) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.map( (item, index) => {
        if(index !== recordIndex) {
            // This isn't the item we care about - keep it as-is
            return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...data
        };
        });
        this.setState({
        records: newRecords
        });
  }
  deleteRecord(record){
    const recordIndex = this.state.records.indexOf(record);
    const newRecords = this.state.records.filter( (item, index) => index !== recordIndex);
    this.setState({
      records: newRecords
    });
    console.log(record);
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => <Record key={record.id}
                             record = {record}
                              handleEditRecord={this.updateRecord.bind(this)}
                              handleDeleteRecord={this.deleteRecord.bind(this)} />)}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div>
                <h2>Records</h2>
                <RecordForm onHandleNewRecord={this.addRecord.bind(this)}/>
                {recordsCoponent}
            </div>
        )
    }
}
export default Records;
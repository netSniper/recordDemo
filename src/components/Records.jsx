import React, { Component } from 'react';
import Record from './Record.jsx';
import axios from 'axios';
class Records extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            records: []
        }
    }
    componentDidMount(){
        axios.get("https://5a7bb0aefb0574001285055a.mockapi.io/record").then(
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
        if(error){
            return <div>error:{error.message}</div>
        }else if(!isLoaded){
           return <div>loading....</div>
        }else{
            return (
                <div>
                    <h2>Records</h2>
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

    }
}
export default Records;
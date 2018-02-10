import React,{Component} from 'react';
// import PropTypes from 'prop-types';
import * as RecordsApi  from '../utils/RecordsApi.jsx';
export default class RecordForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:"",
            title:"",
            amount:""
        }
    }
    valid(){
        return this.state.date&&this.state.title&&this.state.amount;
    }
    handleChange(event){
        const {name, value} = event.target;
        this.setState({[name]: value})
    }
    handleSubmit(event){
        event.preventDefault();
        RecordsApi.create(this.state).then(
            response =>{
                this.props.onHandleNewRecord(response.data);
                this.setState({
                    date:"",
                    title:"",
                    amount:""
                })
            }
        ).catch(
            error =>console.log(error.message)
        )
    }
    render(){
        return(
            <form action="" className="form-inline" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="date" name="date" value={this.state.date}/>
                </div>
                <div className="form-group">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="title" name="title"  value={this.state.title}/>
                </div>
                <div className="form-group">
                    <input type="text" onChange={this.handleChange.bind(this)} className="form-control" placeholder="amount" name="amount"  value={this.state.amount}/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
            </form>
        )
    }
}

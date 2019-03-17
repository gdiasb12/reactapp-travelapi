import React from 'react';

class Form extends React.Component {
    render(){
        return ( 
        <form className="col-12" onSubmit={this.props.getList}>
            <div className="d-flex flex-row">
                <div className="col-6">
                    <label>Date From:</label>
                    <input type="date" className="form-control" name="datefrom" />    
                </div>
                <div className="col-6">
                    <label>Date To:</label>
                    <input type="date" className="form-control" name="dateto"/>    
                </div>
            </div>
            <br/>
            <div className="col text-center">
                <button className="btn btn-primary">Search</button>
            </div>
        </form>
        );
    }
}

export default Form;

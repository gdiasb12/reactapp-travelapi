import React from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';


const RAW_DATA_TOKEN = 'private-info';
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const API_DOMAIN = PROXY_URL+"private-domain";

class App extends React.Component {
  state = {
    token_auth: undefined,
    error: false,
    isLoading: false,
    items: []
  }

  getTokenAuth = async () => {
    const api_token_call = await fetch(`${API_DOMAIN}/Token`,
    {
      method: 'post',
      body: RAW_DATA_TOKEN,
      mode: 'cors'
    });

    const token_auth = await api_token_call.json();

    this.setState({
      token_auth: token_auth.access_token
    });
  }

  getList = async (e) => {
    e.preventDefault();
    const token = this.state.token_auth;

    var dateFrom = e.target.elements.datefrom.value;
    var dateTo = e.target.elements.dateto.value;

    if(dateFrom && dateTo){

    this.setState({'isLoading': true, 'error': false});

    dateFrom = new Date(dateFrom).toLocaleDateString("en-US");
    dateTo = new Date(dateTo).toLocaleDateString("en-US");

    const payloader = {
      "Language": "ENG",
      "Currency": "USD",
      "destination": "MCO",
      "DateFrom": dateFrom,
      "DateTO": dateTo,
      "Occupancy": {
                    "AdultCount": "1",
                    "ChildCount": "1",
                    "ChildAges": ["10"]
      }

    }


    await fetch(`${API_DOMAIN}/api/Ticket/Search`,
      {
      method: 'POST',
      body: JSON.stringify(payloader),
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(result.Message){
          this.setState({
            isLoading: false,
            error: result.Message,
            items: []
          });
        } else {
          this.setState({
            isLoading: false,
            items: result.Result,
            error: false
          });
        }
      },
      (error) => {
        this.setState({
          isLoading: false,
          error: 'Error!'
        });
      }
      );
    }
  }

  componentDidMount() {
    this.getTokenAuth();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <Form getList={this.getList} />
              <List
              error={this.state.error}
              isLoading={this.state.isLoading}
              items={this.state.items}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

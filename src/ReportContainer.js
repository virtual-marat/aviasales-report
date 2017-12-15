import React, { Component } from 'react';
import Report from './Report';

const API_URL = 'http://backoffice.aviasales.ru/api/statistics?from=2017-10-27&to=2017-11-02&interval=1h';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJpYXQiOjE1MDkzNDEzNzgsImFsZyI6IkhTMjU2IiwiZXhwIjoxNTQwNDQ1Mzc4fQ.eyJpZCI6MTI2NiwicGVybWlzc2lvbnMiOlsiQmFzaWMgUmVwb3J0cyJdLCJnYXRlX2lkIjotMTQzLCJleHAiOiIyMDE4LTEwLTI1IDA1OjI5OjM4In0.dD_So803EIkRM86ARm1RxPy85lzNse2hNaPMjndkPpg'
};

class ReportContainer extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch(API_URL, { headers: API_HEADERS })
      .then((response) => response.json())
      .then((responseObj) => {
        this.setState({ data: responseObj.data });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <Report data={ this.state.data } />
    );
  }

}

export default ReportContainer;

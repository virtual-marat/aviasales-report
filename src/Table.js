import React, { Component } from 'react';

import $ from 'jquery';

import DataTable from 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';

import './Table.css';

$.DataTable = DataTable;

let self;

class Table extends Component {
  constructor() {
    super();
    self = this;
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {
    this.refreshTable(props.data)
  }

  refreshTable(data) {
    $('#' + self.props.id).DataTable({
      data: data,
      searching: false,
      columns: [
        { title: "Date", data: 'time' },
        { title: "Searches", data: 'searches' },
        { title: "Clicks", data: 'clicks' },
        { title: "Unq. Clicks", data: 'unique_clicks' },
        { title: "CTR", data: 'ctr' },
        { title: 'Bookings', data: 'bookings' },
        { title: "Sales", data: 'sales' },
        { title: "BTR", data: 'btr' },
        { title: "STR", data: 'str' },
        { title: "Success %", data: 'success' },
        { title: "Errors %", data: 'errors' },
        { title: "Zeros %", data: 'zeros' },
        { title: "Duration", data: 'duration' },
        { title: "Timeouts", data: 'timeouts' }
      ],
    });
  }

  render() {
    return (
      <table id={ self.props.id } className='display'>
      </table>
    );
  }

}

export default Table;

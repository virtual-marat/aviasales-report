import React, { Component } from 'react';
import Table from './Table';
import Chart from './Chart';

class Report extends Component {
  constructor() {
    super();
    this.chart = {
      data: [],
      graphs: [{
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "bulletSize": 5,
          "useLineColorForBulletBorder": true,
          "type": "line",
          "valueField": "clicks",
          "lineColor": "#00881a",
          "title": "current"
        },{
          "bullet": "round",
          "bulletBorderAlpha": 1,
          "bulletColor": "#FFFFFF",
          "bulletSize": 5,
          "useLineColorForBulletBorder": true,
          "type": "line",
          "valueField": "prevClicks",
          "lineColor": "#d50514",
          "title": "previous"
      }]
    };
  }

  prepareChartData(data) {
    let _data = [];
    Object.assign(_data, data);

    _data.reverse();

    let endDay = new Date(_data[_data.length - 1].time);
    let endDayStartHour = new Date(
      new Date(endDay.valueOf()).setHours(0,0,0,0)
    );
    let dataByEndDay = _data.filter((item) => {
      let itemDate = new Date(item.time);
      return itemDate <= endDay && itemDate >= endDayStartHour;
    });

    let startDay = new Date(
      endDay.getUTCFullYear(),
      endDay.getUTCMonth(),
      endDay.getUTCDate() -1
    );
    let startDayLastHour = new Date(
      new Date(startDay.valueOf()).setHours(23,0,0,0)
    );
    let dataByStartDay = _data.filter((item) => {
      let itemDate = new Date(item.time);
      return itemDate >= startDay && itemDate <= startDayLastHour;
    });

    let dataMergeByTwoDays = []
    for (let itemOfEndDay of dataByEndDay) {
      let dateItemOfEndDay = new Date(itemOfEndDay.time);
      for (let itemOfStartDay of dataByStartDay) {
        let dateItemOfStartDay = new Date(itemOfStartDay.time);
        if (dateItemOfEndDay.getUTCHours() === dateItemOfStartDay.getUTCHours()) {
          dataMergeByTwoDays.push(
            Object.assign(itemOfEndDay, { prevClicks: itemOfStartDay.clicks})
          );
        }
      }
    }

    return dataMergeByTwoDays;
  }

  componentWillReceiveProps(props) {
    this.chart.data = this.prepareChartData(props.data);
  }

  render() {
    return(
      <div>
        <Table id={ "report-table" } data={ this.props.data }/>
        <Chart id={ "report-chart" } data={ this.chart.data } graphs={ this.chart.graphs }/>
      </div>
    );
  }

}

export default Report;

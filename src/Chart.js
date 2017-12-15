import React, { Component } from 'react';

import 'amcharts3';
import 'amcharts3/amcharts/serial';
import 'amcharts3/amcharts/themes/light';

let self;

class Chart extends Component {
  constructor() {
    super();
    self = this;
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {
    self.updateChart(props.data, props.graphs);
  }

  updateChart(data, graphs) {
    window.AmCharts.makeChart(self.props.id, {
      "pathToImages": "//www.amcharts.com/lib/3/images/",
      "dataDateFormat": "YYYY-MM-DD JJ:NN",
      "type": "serial",
      "theme": "light",
      "marginRight": 0,
      "marginLeft": 0,
      "autoMarginOffset": 0,
      "graphs": graphs,
      "chartCursor": {
        "categoryBalloonDateFormat": "JJ:NN",
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "cursorColor":"#258cbb",
      },
      "categoryField": "time",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true,
        "minPeriod": "1hh",
      },
      "legend": {
        "align": "center",
        "useGraphSettings": true,
      },
      "dataProvider": data
    });
  }

  render() {
    let styles = {
      header: {
        textAlign:'center'
      },
      wrapper: {
        height: '600px'
      }
    };

    return (
      <div>
        <h3 style={ styles.header }>Chart</h3>
        <div id={ self.props.id } style={ styles.wrapper }></div>
      </div>
    );
  }

}

export default Chart;

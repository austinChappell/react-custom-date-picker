import React, { Component } from 'react';
import DatePicker from '../lib';

class App extends Component {
  state = {
    date: new Date(2018, 7, 17),
    // endDate: new Date(2018, 7, 19),
  }

  // use this for single date
  handleDateChange = (date) => {
    this.setState({ date });
  }

  // use this for range dates
  // handleDateChange = ([date, endDate]) => {
  //   this.setState({
  //     date,
  //     endDate,
  //   });
  // }

  render() {
    return (
      <div className="App" style={{ padding: 20 }}>
        <DatePicker
          // color="#ff0000"
          date={this.state.date}
          // endDate={this.state.endDate}
          // errorColor="#00ff00"
          // errorMessage="This is the error message"
          // forceError
          handleDateChange={this.handleDateChange}
          // hoverWeek
          inputStyle={{
            borderRadius: 0,
          }}
          // keepOpen
          lightHeader
          // maxDate="2018-04-18"
          // minDate="2018-04-17"
          modal
          placeholder="Select Date"
          // range
          required
          // startOfWeek={1}
        />
      </div>
    );
  }
}

export default App;

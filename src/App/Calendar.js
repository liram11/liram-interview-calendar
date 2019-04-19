import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import moment from 'moment';

import { GlobalStyle } from './theme/globalStyle';

import Header from './Header';
import Nav from './Nav';
import Week from './Week';
import ControlsBottom from './ControlsBottom';

import { defaultTheme } from './theme/defaultTheme';

const CalendarWrapper = styled.div`
  text-align: center;
  max-width: 740px;
  background-color: ${props => props.theme.calendar_bg};
  margin: auto;
  position: relative;
`;

const CalendarNav = styled.div`
  background-color: ${props => props.theme.calendar_control_bg};
  border-top: 2px solid ${props => props.theme.calendar_border};
  border-bottom: 2px solid ${props => props.theme.calendar_border};
  position: fixed;
  z-index: 99;
  top: 130px;
  max-width: 740px;
  width: 100%;
`;

const CalendarMain = styled.div`
  margin-top: 140px;
  margin-bottom: 70px;
`;

const CalendarBottom = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 740px;
  height: 80px;
  z-index: 99;
  background-color: ${props => props.theme.calendar_control_bg};
`;

class Calendar extends Component {
  constructor(props) {
    super(props);
    let date = moment();

    this.state = {
      date: date,
      event_dates: {},
      selected_start_date: null,
      selected_active: false
    };
  }

  changeDay = event => {
    this.setState({
      date: moment(event.currentTarget.getAttribute('data-date'))
    });
  };

  prevWeek = () => {
    this.setState({
      date: this.state.date.subtract(1, 'weeks')
    });
  };

  nextWeek = () => {
    this.setState({
      date: this.state.date.add(1, 'weeks')
    });
  };

  handleSelect = event => {
    this.setState({
      selected_start_date: moment(
        event.currentTarget.getAttribute('data-start-date')
      ),
      selected_active: event.currentTarget.getAttribute('data-active')
    });
  };

  createEvent = () => {
    let input_string = window.prompt('Enter event time: YYYY-MM-DD HH:mm:ss');

    let new_event = moment(input_string, 'YYYY-MM-DD HH:mm:ss', true);

    if (new_event.isValid()) {
      let new_event_str = new_event.format('YYYY-MM-DD');
      this.setState(prevState => ({
        event_dates: {
          ...prevState.event_dates,
          [new_event_str]:
            new_event_str in prevState.event_dates
              ? [new_event, ...prevState.event_dates[new_event_str]]
              : [new_event]
        }
      }));
    } else {
      alert('Date is invalid');
    }
  };

  handleTodayClick = () => {
    this.setState({
      date: moment()
    });
  };

  handleDelete = () => {
    if (this.state.selected_start_date && this.state.selected_active) {
      const date_str = moment(this.state.selected_start_date).format(
        'YYYY-MM-DD'
      );
      const events = [];
      for (let date of this.state.event_dates[date_str]) {
        const difference_from_start = this.state.selected_start_date.diff(
          date,
          'minutes'
        );

        if (difference_from_start > 0 || difference_from_start <= -60) {
          events.push(date);
        }
      }

      let new_event_dates = { ...this.state.new_event_dates };
      new_event_dates[date_str] = events;
      this.setState({
        event_dates: new_event_dates,
        selected_start_date: null,
        selected_active: false
      });
    }
  };

  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CalendarWrapper>
          <GlobalStyle />
          <Header createEvent={this.createEvent} />
          <CalendarNav>
            <Nav
              changeDay={this.changeDay}
              prevWeek={this.prevWeek}
              nextWeek={this.nextWeek}
              date={this.state.date}
            />
          </CalendarNav>

          <CalendarMain>
            <Week
              event_dates={this.state.event_dates}
              date={this.state.date}
              handleSelect={this.handleSelect}
              selected_start_date={this.state.selected_start_date}
            />
          </CalendarMain>
          <CalendarBottom>
            <ControlsBottom
              handleTodayClick={this.handleTodayClick}
              deletable={this.state.selected_active}
              handleDelete={this.handleDelete}
            />
          </CalendarBottom>
        </CalendarWrapper>
      </ThemeProvider>
    );
  }
}

export default Calendar;

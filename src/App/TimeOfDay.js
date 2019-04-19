import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Td } from './shared/Table';

const TdEvent = styled(Td)`
  border: 2px solid ${props => props.theme.calendar_border};

  ${({ selected }) =>
    selected &&
    `
    
    background-color:#b3b7ff ;
  `}
`;

const TdEventActive = styled(TdEvent)`
  background-color: #ebecff;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    `
    
    background-color:#b3b7ff ;
  `}
`;

class TimeOfDay extends Component {
  render() {
    const start_date = moment(this.props.date).subtract(1, 'hours');
    const start_date_compare = moment(this.props.date)
      .subtract(1, 'hours')
      .subtract(1, 'seconds');
    const end_date = this.props.date;

    for (let cur_event of this.props.event_dates) {
      if (moment(cur_event).isBetween(start_date_compare, end_date)) {
        return (
          <TdEventActive
            onClick={e => this.props.handleSelect(e)}
            data-start-date={moment(start_date).toISOString(true)}
            selected={moment(this.props.selected_start_date).isSame(start_date)}
            data-active={true}
          />
        );
      }
    }

    return (
      <TdEvent
        onClick={e => this.props.handleSelect(e)}
        data-start-date={moment(start_date).toISOString(true)}
        selected={moment(this.props.selected_start_date).isSame(start_date)}
        data-active={false}
      >
        {this.props.week_day}
      </TdEvent>
    );
  }
}

export default TimeOfDay;

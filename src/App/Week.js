import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import TimeOfDay from './TimeOfDay';

import { Table, Tbody, Tr, Td } from './shared/Table';

const start_hour = 8;
const end_hour = 21;

const TdTimeLabel = styled(Td)`
  border: 2px solid transparent;
  position: relative;
`;

const TdTimeLabelText = styled.div`
  position: absolute;
  bottom: -12px;
  right: 10px;
  z-index: 1;
  color: ${props => props.theme.calendar_time_color};
  font-size: 18px;
`;

class Week extends Component {
  render() {
    const startOfWeek = moment(this.props.date).startOf('isoWeek');

    const TimesOfDays = [];
    for (let cur_hour = start_hour + 1; cur_hour <= end_hour; cur_hour++) {
      let row = [];

      row.push(
        <TdTimeLabel key={-1}>
          {' '}
          <TdTimeLabelText>
            {cur_hour !== start_hour && cur_hour !== end_hour
              ? cur_hour.toString().padStart(2, '0') + ':00'
              : ''}
          </TdTimeLabelText>
        </TdTimeLabel>
      );

      for (let week_day = 0; week_day < 7; week_day++) {
        let date = moment(startOfWeek)
          .add(week_day, 'days')
          .add(cur_hour, 'hours');

        let date_str = date.format('YYYY-MM-DD');
        row.push(
          <TimeOfDay
            key={week_day}
            event_dates={
              date_str in this.props.event_dates
                ? this.props.event_dates[date_str]
                : []
            }
            date={date}
            handleSelect={this.props.handleSelect}
            selected_start_date={this.props.selected_start_date}
          />
        );
      }
      TimesOfDays.push([row]);
    }

    return (
      <Table>
        <Tbody>
          {TimesOfDays.map((row, i) => (
            <Tr key={i}>{row}</Tr>
          ))}
        </Tbody>
      </Table>
    );
  }
}

export default Week;

import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Table, Tbody, Tr, Td } from './shared/Table';

import arrow from './img/svg/arrow.svg';

const NavDay = styled(Td)`
  cursor: pointer;
`;

const NavDayName = styled.div`
  text-align: center;
  padding: 10px 0;
  font-size: 20px;
  font-weight: bold;
`;

const NavDayValue = styled.div`
  text-align: center;
  width: 50px;
  height: 50px;
  margin: auto;
  line-height: 50px;
  font-weight: bold;
  font-size: 30px;

  ${({ active }) =>
    active &&
    `
    border-radius:25px;
    background-color:red;
    color: #fff;
  `}
`;

const NavCurrentMonth = styled.td`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const NextWeek = styled.div`
  background-image: url(${arrow});
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: 50%;
  width: 40px;
  height: 40px;
  margin: auto;
  cursor: pointer;
`;

const PrevWeek = styled(NextWeek)`
  transform: rotate(180deg);
`;

class Nav extends Component {
  render() {
    let startOfWeek = moment(this.props.date).startOf('isoWeek');
    let endOfWeek = moment(this.props.date).endOf('isoWeek');

    const days = [];
    let day = startOfWeek;

    while (day <= endOfWeek) {
      days.push(
        <NavDay
          onClick={e => this.props.changeDay(e)}
          key={day}
          data-date={day.toISOString()}
        >
          <NavDayName>{day.format('dd')[0]}</NavDayName>
          <NavDayValue active={moment().isSame(day, 'day')}>
            {day.date()}
          </NavDayValue>
        </NavDay>
      );

      day = day.clone().add(1, 'd');
    }

    return (
      <Table>
        <Tbody>
          <Tr>
            <Td />
            {days}
          </Tr>
          <Tr>
            <Td />
            <Td>
              <PrevWeek onClick={() => this.props.prevWeek()} />
            </Td>
            <NavCurrentMonth colSpan="5">
              {this.props.date.format('MMMM YYYY')}
            </NavCurrentMonth>
            <Td>
              <NextWeek onClick={() => this.props.nextWeek()} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    );
  }
}

export default Nav;

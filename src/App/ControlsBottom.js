import React, { Component } from 'react';
import styled from 'styled-components';

import { Table, Tbody, Tr, Td } from './shared/Table';

const ControlsTd = styled(Td)`
  width: 50%;
  font-size: 28px;
  color: red;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Today = styled.div`
  text-align: left;
  padding-left: 50px;
  padding-top: 25px;
`;

const TodayText = styled.span`
  cursor: pointer;
`;

const Delete = styled.div`
  text-align: right;
  padding-right: 50px;
  padding-top: 25px;
`;

const DeleteText = styled.span`
  cursor: pointer;
`;
class ControlsBottom extends Component {
  renderDelete = () => {
    if (this.props.deletable === 'true') {
      return (
        <Delete>
          <DeleteText onClick={() => this.props.handleDelete()}>
            Delete
          </DeleteText>
        </Delete>
      );
    } else {
      return <div />;
    }
  };
  render() {
    return (
      <Table>
        <Tbody>
          <Tr>
            <ControlsTd>
              <Today>
                <TodayText onClick={() => this.props.handleTodayClick()}>
                  Today
                </TodayText>
              </Today>
            </ControlsTd>
            <ControlsTd>{this.renderDelete()}</ControlsTd>
          </Tr>
        </Tbody>
      </Table>
    );
  }
}

export default ControlsBottom;

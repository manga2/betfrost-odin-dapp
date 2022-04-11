import React, {useState} from 'react';

import {
  refreshAccount,
  sendTransactions,
  useGetAccountInfo,
  useGetNetworkConfig,
  useGetPendingTransactions,
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  ProxyProvider,
  TypedValue,
  BytesValue,
  Egld,
  BigUIntValue,
  ArgSerializer,
  TransactionPayload,
  GasLimit,
  DefaultSmartContractController,
} from '@elrondnetwork/erdjs';

import axios from 'axios';
import Modal from 'react-modal';
import { Container, Row, Col, Dropdown, Form, Table } from 'react-bootstrap';
import './index.scss';

import {
  SECOND_IN_MILLI,
  TIMEOUT,
  convertWeiToEgld,
  convertTimestampToDateTime,
  convertSecondsToDays,
  IContractInteractor,
} from '../../utils';
import DarkAsgardImage from '../../assets/img/dark-asgard-1.png';

const OdinsFate = () => {
    return (
        <div className='fate-container'>
          <div className='fate-part-1'>
            <Container className='fate-inner-container'>
              <div className='fate-title'>Odin&apos;s Fate</div>
              <div className='fate-text'>
                <p>Who shall rise, who shall fall</p>
                <p>Who will you cheer for...</p>
              </div>

              <div className='fate-card-container'>
                <div className='fate-card'>
                  <div className='fate-card-odin' />
                  <div className='fate-card-hover fate-card-hover-odin disabled' />
                  <div className='fate-card-name'>Odin</div>
                </div>
                <div className='fate-card'>
                  <div className='fate-card-loki' />
                  <div className='fate-card-hover fate-card-hover-loki' />
                  <div className='fate-card-name'>Loki</div>
                </div>
                <div className='fate-card-vs' />
              </div>

              <div className='fate-balance-container'>
                <span className='fate-balance-text'>
                  <span className='text1'>You have&nbsp;</span>
                  <span className='text2'>19</span>
                  .
                  <span className='text3'>354</span>
                </span>
                <Dropdown>
                  <Dropdown.Toggle className='token-id-toggle' id="token-id">
                    EGLD
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='token-id-menu'>
                    <Dropdown.Item>EGLD</Dropdown.Item>
                    <Dropdown.Item>ODIN</Dropdown.Item>
                    <Dropdown.Item>MEX</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <span className='fate-balance-fee'>(7% fee)</span>
              </div>
            </Container>
          </div>

          <div className='fate-part-2'>
            <Container className='fate-inner-container'>
              <Row className='fate-token-amount-button-container'>
                <Col sm={6}>
                  <button className='fate-token-amount-button'>0.05 EGLD</button>
                </Col>
                <Col sm={6}>
                  <button className='fate-token-amount-button'>0.10 EGLD</button>
                </Col>
                <Col sm={6}>
                  <button className='fate-token-amount-button'>0.25 EGLD</button>
                </Col>
                <Col sm={6}>
                  <button className='fate-token-amount-button'>0.50 EGLD</button>
                </Col>
                <Col sm={6}>
                  <button className='fate-token-amount-button'>1.00 EGLD</button>
                </Col>
                <Col sm={6}>
                  <button className='fate-token-amount-button'>2.00 EGLD</button>
                </Col>
              </Row>

              <div>
                <button className='fate-flip-button gradient-button'>I Shall Choose</button>
              </div>

              <div className='fate-history-container'>
                <Row className='fate-history-row'>
                  <Col sm={8} className='fate-history-text'>erd1234123423443... wisely earned 0.1 EGLD</Col>
                  <Col sm={4} className='fate-history-tx'><a>View Transaction</a></Col>
                </Row>
                <Row className='fate-history-row'>
                  <Col sm={8} className='fate-history-text'>erd1234123423443... wisely earned 0.1 EGLD</Col>
                  <Col sm={4} className='fate-history-tx'><a>View Transaction</a></Col>
                </Row>
                <Row className='fate-history-row'>
                  <Col sm={8} className='fate-history-text'>erd1234123423443... wisely earned 0.1 EGLD</Col>
                  <Col sm={4} className='fate-history-tx'><a>View Transaction</a></Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
    );
};

export default OdinsFate;

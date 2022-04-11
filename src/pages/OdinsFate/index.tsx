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
import { Container, Row, Col } from 'react-bootstrap';
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
          </Container>
        </div>
    );
};

export default OdinsFate;

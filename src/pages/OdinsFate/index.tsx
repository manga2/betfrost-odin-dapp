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
  convertWeiToEsdt,
  getBalanceOfToken,
  IContractInteractor,
  IFlipPack,
} from 'utils';
import {
  FLIP_CONTRACT_ADDRESS,
  FLIP_CONTRACT_ABI_URL,
  FLIP_CONTRACT_NAME,
  FLIP_PACK_COUNT,
} from 'config';
import {
  TOKENS
} from 'data';
import DarkAsgardImage from '../../assets/img/dark-asgard-1.png';
import FlipResultModal from 'components/FlipResultModal';

function printNumber(v) {
  const integral = Math.floor(v);
  let fractional = Math.floor((v - integral) * 100).toString();
  if (fractional.length == 1) fractional = '0' + fractional;
  else if (fractional.length == 0) fractional = '00';

  return (
      <>
          <span className='text2'>{integral.toLocaleString()}</span>
          .
          <span className='text3'>{fractional}</span>
      </>
  );
}

const OdinsFate = () => {
  // modal
  const [flipResultModalShow, setFlipResultModalShow] = React.useState<boolean>(false);
  const [flipResult, setFlipResult] = React.useState<boolean>(false);

  function onFlip() {
    setFlipResultModalShow(true);
  }
  
  //
  const { account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const provider = new ProxyProvider(network.apiAddress, { timeout: TIMEOUT });

  // load smart contract abi and parse it to SmartContract object for tx
  const [contractInteractor, setContractInteractor] = React.useState<IContractInteractor | undefined>();
  React.useEffect(() => {
    async function loadContract() {
        const registry = await AbiRegistry.load({ urls: [FLIP_CONTRACT_ABI_URL] });
        const abi = new SmartContractAbi(registry, [FLIP_CONTRACT_NAME]);
        const contract = new SmartContract({ address: new Address(FLIP_CONTRACT_ADDRESS), abi: abi });
        const controller = new DefaultSmartContractController(abi, provider);

        setContractInteractor({
            contract,
            controller,
        });
    }

    loadContract();
  }, []); // [] makes useEffect run once

  const [flipPacks, setFlipPacks] = React.useState<any>();
  React.useEffect(() => {
      (async () => {
          if (!contractInteractor || !account.address) return;
          const interaction = contractInteractor.contract.methods.getFlipPacks();
          const res = await contractInteractor.controller.query(interaction);

          if (!res || !res.returnCode.isSuccess()) return;
          const items = res.firstValue?.valueOf();
          console.log('getFlipPacks', items);

          const flipPacks = {};
          for (const [_, item] of items) {
            const token_id = item.token_id.toString();
            const lp_fee = item.lp_fee.toNumber();
            const treasury_fee = item.treasury_fee.toNumber();
            const fee = (lp_fee + treasury_fee) / 100;

            const amounts = [];
            for (const amount of item.amounts) {
              amounts.push(convertWeiToEsdt(amount, TOKENS[token_id].decimals));
            }

            const flipPack = {
              token_id,
              ticker: TOKENS[token_id].ticker,
              fee,
              amounts,
            };

            flipPacks[flipPack.token_id] = flipPack;
          }
          console.log('flipPacks', flipPacks);
          setFlipPacks(flipPacks);
      })();
    }, [contractInteractor]);

    //
    const [selectedTokenId, setSelectedTokenId] = React.useState<string | undefined>();
    function onTokenIdMenuSelect(token_id){
      console.log('token_id', token_id);
      setSelectedTokenId(token_id);
    }

    // if flipPacks are changed, select the first tokens as selectedTokenId
    React.useEffect(() => {
      if (flipPacks) {
        for (const [key, value] of Object.entries(flipPacks)) {
          setSelectedTokenId(key);
          return;
        }
      }
    }, [flipPacks]);

    //
    const [selectedTokenBalance, setSelectedTokenBalance] = React.useState<number | undefined>();
    React.useEffect(() => {
      if (account.address && selectedTokenId) {
        getBalanceOfToken(network.apiAddress, account, selectedTokenId).then((v) => {
          setSelectedTokenBalance(v);
        });
      }
    }, [selectedTokenId]);

    return (
        <div className='fate-container'>
          <div className='fate-part-1'>
            <Container className='fate-inner-container fate-inner-top-container'>
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
                  {selectedTokenBalance ? printNumber(selectedTokenBalance) : '-'}
                </span>
                <Dropdown onSelect={onTokenIdMenuSelect} drop='end'>
                  <Dropdown.Toggle className='token-id-toggle' id="token-id">
                    {selectedTokenId && TOKENS[selectedTokenId] && TOKENS[selectedTokenId].ticker}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className='token-id-menu'>
                    {
                      flipPacks && Object.keys(flipPacks).map((key, index) => 
                      (<Dropdown.Item eventKey={key} key={`token-id-menu-item-${key}`}>{flipPacks[key].ticker}</Dropdown.Item>))
                    }
                  </Dropdown.Menu>
                </Dropdown>
                <span className='fate-balance-fee'>({selectedTokenId ? flipPacks[selectedTokenId].fee : '-'}% fee)</span>
              </div>
            </Container>
          </div>

          <div className='fate-part-2'>
            <Container className='fate-inner-container'>
              <Row className='fate-token-amount-button-container'>
                <Col xs={6}>
                  <button className='fate-token-amount-button'>0.05 EGLD</button>
                </Col>
                <Col xs={6}>
                  <button className='fate-token-amount-button'>0.10 EGLD</button>
                </Col>
                <Col xs={6}>
                  <button className='fate-token-amount-button'>0.25 EGLD</button>
                </Col>
                <Col xs={6}>
                  <button className='fate-token-amount-button'>0.50 EGLD</button>
                </Col>
                <Col xs={6}>
                  <button className='fate-token-amount-button'>1.00 EGLD</button>
                </Col>
                <Col xs={6}>
                  <button className='fate-token-amount-button'>2.00 EGLD</button>
                </Col>
              </Row>

              <div>
                <button
                  className='fate-flip-button gradient-button'
                  onClick={onFlip}
                  >
                    I Shall Choose
                </button>
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

          <FlipResultModal
            show={flipResultModalShow}
            onHide={() => setFlipResultModalShow(false)}
            data={ {flipResult} }
          />
        </div>
    );
};

export default OdinsFate;

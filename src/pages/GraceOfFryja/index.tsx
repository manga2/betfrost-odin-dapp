import React, { useState } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';

import './index.scss';
import buyTicketImg from 'assets/img/Grace of Fryja/Buy Ticket.svg';
import buyTicketsButImg from 'assets/img/Grace of Fryja/Buy Tickets But.svg';
import girl1Img from 'assets/img/Grace of Fryja/girl1.svg';
import titleImg from 'assets/img/Grace of Fryja/title.svg';
import whowill from 'assets/img/Grace of Fryja/whowill.svg';
import winingCreteria from 'assets/img/Grace of Fryja/Wining Criteria.svg';
import CountDown from './CountDown';

import * as data from './data';

const GraceOfFryja = () => {
    const [tabValue, setTabValue] = useState('1');
    const [CurrentRoundID, setCurrentRoundID] = useState<number>(0); // for finished rounds

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };


    /** for finished rounds */
    const handleDecCurrentRoundID = () => {
        if (CurrentRoundID > 0) {
            setCurrentRoundID(CurrentRoundID - 1);
        }
    };

    const handleIncCurrentRoundID = () => {
        if (CurrentRoundID < data.rounds.length - 1) {
            setCurrentRoundID(CurrentRoundID + 1);
        }
    };

    const handleFirstCurrentRoundID = () => {
        setCurrentRoundID(0);
    };

    const handleLastCurrentRoundID = () => {
        setCurrentRoundID(data.rounds.length - 1);
    };


    const [selectedTokenId, setSelectedTokenId] = useState<number | undefined>(0);
    const handleSelectTokenId = (token_id) => {
        setSelectedTokenId(token_id);
    };

    return (
        <>
            <div style={{ background: "#121212" }}>
                {/** first part : Lottery Home */}
                <div className='fryja-first-part'>
                    <Container className='fryja-inner-container text-center' style={{ paddingTop: "100px" }}>
                        <img className="fryja-title" src={titleImg} alt="Grace of Fryja" />
                        <CountDown />
                        <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                            <a href="#buyTickets">
                                <div className="buy-ticket-button" >
                                    <img className="but-title" src={buyTicketImg} />
                                </div>
                            </a>
                        </div>
                    </Container>
                </div>

                {/** second part : Control Lottery */}
                <div className='fryja-second-part' id="buyTickets">
                    <Container style={{ paddingTop: "80px" }}>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={tabValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                                        <Tab label="Current" value="1" />
                                        <Tab label="Past" value="2" />
                                    </TabList>
                                </Box>

                                {/** tab for current lottery */}
                                <TabPanel value="1">
                                    <Row>
                                        <Col md="5" style={{ marginTop: "20px" }}>
                                            <div className="Buy-Ticket-Box" >
                                                <Dropdown onSelect={handleSelectTokenId} drop='down'>
                                                    <Dropdown.Toggle className='token-id-toggle' id="token-id">
                                                        {
                                                            <>
                                                                <span>{data.tokens[selectedTokenId].ticker}</span>
                                                                <img src={data.tokens[selectedTokenId].url} />
                                                            </>
                                                        }
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className='token-id-menu'>
                                                        {
                                                            data.tokens.map((token, index) => (
                                                                <Dropdown.Item eventKey={index} key={`token-id-menu-item-${token.identifier}`}>
                                                                    <span>{token.ticker}</span>
                                                                    <img src={token.url} />
                                                                </Dropdown.Item>
                                                            ))
                                                        }
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                                <input className="custom-input" type='number' placeholder='Number of Tickets' />

                                                <div className="fryja-center">
                                                    <div style={{ justifyContent: "space-between", display: "flex", width: "100px" }}>
                                                        <div className="control-but">-</div>
                                                        <div className="control-but">+</div>
                                                    </div>

                                                </div>
                                                <div className="text-center" style={{ color: "rgba(165, 165, 165, 1)", fontSize: "12x" }}>
                                                    <span>Balance: 35 egld</span>
                                                    <span style={{ paddingLeft: "20px" }}>Cost: 2 egld</span>
                                                </div>
                                                <div className="buy-tickets-but">
                                                    <img src={buyTicketsButImg} style={{ width: "100%" }} />
                                                </div>
                                            </div>
                                        </Col>

                                        <Col md="7" style={{ marginTop: "20px" }}>
                                            <Row>
                                                <Col sm='7'>
                                                    <div className="Comment-Box">
                                                        <p className="Next-Draw">Next Draw is on &nbsp;<span style={{ color: "#EEC98A" }}>Apr 18 2022, 11:39AM</span></p>
                                                        <p className="Comment">She is waiting for your prayers, buy tickets with caution. Good luck</p>
                                                    </div>
                                                </Col>
                                                <Col sm="5">
                                                    <img src={girl1Img} style={{ marginTop: "-80px" }} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <div className="fryja-rounds fryja-center">
                                        <div style={{ color: "white" }}>
                                            <p style={{ fontFamily: "IM FELL English SC", fontSize: "18px" }}>Draw: {data.rounds[CurrentRoundID].date} </p>

                                            <div className="fryja-center" style={{ display: "flex", gap: "20px" }}>
                                                {
                                                    data.rounds[CurrentRoundID].result.map((roundResult, index) => {
                                                        return (
                                                            <div className="lottery-small-number-card" key={index}>
                                                                <span className="lottery-number">{roundResult}</span>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>

                                            <div className="fryja-center" style={{ display: "flex", gap: "20px", marginTop: "20px", marginBottom: "30px" }}>
                                                <div className="circle-but" onClick={handleFirstCurrentRoundID}>
                                                    <span>{"<<"}</span>
                                                </div>
                                                <div className="circle-but" onClick={handleDecCurrentRoundID}>
                                                    <span>{"<"}</span>
                                                </div>
                                                <div className="circle-but" onClick={handleIncCurrentRoundID}>
                                                    <span>{">"}</span>
                                                </div>
                                                <div className="circle-but" onClick={handleLastCurrentRoundID}>
                                                    <span>{">>"}</span>
                                                </div>
                                            </div>

                                            <p style={{ fontFamily: "IM FELL English SC", fontSize: "18px", color: "#BDBDBD", marginBottom: "30px" }}>Finished Round: #{CurrentRoundID + 1} </p>

                                            <img src={whowill} style={{ width: "100%" }} alt="who will recieve the grace of fryja" />
                                        </div>
                                    </div>

                                </TabPanel>

                                {/** tab for lottery histories */}
                                <TabPanel value="2">
                                    <p>{"If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool."}</p>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Container>
                </div>

                {/** Third Part : How to play */}
                <div className='fryja-third-part pb-5'>
                    <Container style={{ paddingTop: "60px" }}>
                        <div className="text-center">
                            <p style={{ color: "#616161" }}>{"If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool."}</p>
                        </div>

                        <div className="info-box">
                            <Row>
                                <Col sm="4">
                                    <p className="step-info-title">Buy Tickets</p>
                                    <p className="step-info-description">{"Prices are set when the round starts, equal to 50 USD in Odin per ticket."}</p>
                                </Col>

                                <Col sm="4">
                                    <p className="step-info-title">Wait for the Draw</p>
                                    <p className="step-info-description">{"There is one draw every day alternating between 0 AM UTC and 12 PM UTC."}</p>
                                </Col>

                                <Col sm="4">
                                    <p className="step-info-title">Check for Prizes</p>
                                    <p className="step-info-description">{"Once the round’s over, come back to the page and check to see if you’ve won!"}</p>
                                </Col>
                            </Row>
                        </div>

                        <div className="info-box mt-5">
                            <Row style={{ alignItems: "center" }}>
                                <Col sm="8">
                                    <p className="step-info-title" style={{ fontWeight: "700" }}>Winning Criteria</p>
                                    <p className="step-info-title" style={{ fontWeight: "500", fontSize: "17px" }}>{"The digits on your ticket must match in the correct order to win."}</p>
                                    <p className="step-info-description">
                                        {"Here’s an example lottery draw, with two tickets, A and B."} <br />
                                        {"- Ticket A: The first 2 digits and the last 1 digit match, but the 3th digit is wrong, so this ticket only wins a “Match first 2” prize"} <br />
                                        {"- Ticket B: Even though the last 3 digits match, the first digit is wrong, so this ticket doesn’t win a prize."} <br />
                                        {"Prize brackets don’t ‘stack’: if you match the first 3 digits in order, you’ll only win prizes from the ‘Match 3’ bracket, and not from ‘Match 1’ and ‘Match 2’."}</p>
                                </Col>

                                <Col sm="4">
                                    <div className='fryja-center'>
                                        <img className="w-100" src={winingCreteria} alt="wining creteria" />
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="info-box mt-5">
                            <p className="step-info-title" style={{ fontWeight: "700" }}>Prize Funds</p>
                            <p className="step-info-description">{"The prizes for each lottery round come from three sources:"}</p>

                            <span className="step-info-title" style={{ fontWeight: "500", fontSize: "17px" }}>{"Ticket Purchases"}</span>
                            <p className="step-info-description">{"- 100% of the CAKE paid by people buying tickets that round goes back into the prize pools."}</p>

                            <span className="step-info-title" style={{ fontWeight: "500", fontSize: "17px" }}>{"Rollover Prizes"}</span>
                            <p className="step-info-description">{"- After every round, if nobody wins in one of the prize brackets, the unclaimed CAKE for that bracket rolls over into the next round and are redistributed among the prize pools."}</p>

                            <span className="step-info-title" style={{ fontWeight: "500", fontSize: "17px" }}>{"CAKE Injections"}</span>
                            <p className="step-info-description">{"- An average total of 35,000 CAKE from the treasury is added to lottery rounds over the course of a week. This CAKE is of course also included in rollovers! Read more in our guide to CAKE Tokenomics"}</p>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default GraceOfFryja;
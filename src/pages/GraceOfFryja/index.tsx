import React, { useState, useRef } from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Modal from 'react-modal';
import ReactPinField from "react-pin-field";

import './index.scss';
import buyTicketImg from 'assets/img/Grace of Fryja/Buy Ticket.svg';
import buyTicketsButImg from 'assets/img/Grace of Fryja/Buy Tickets But.svg';
import girl1Img from 'assets/img/Grace of Fryja/girl1.png';
import girl2Img from 'assets/img/Grace of Fryja/girl2.png';
import titleImg from 'assets/img/Grace of Fryja/title.svg';
import whowill from 'assets/img/Grace of Fryja/whowill.svg';
import winingCreteria from 'assets/img/Grace of Fryja/Wining Criteria.svg';
import winlost from 'assets/img/Grace of Fryja/winlost.svg';
import CountDown from './CountDown';

import * as data from './data';

const GraceOfFryja = () => {
    /** for tab changes */
    const [tabValue, setTabValue] = useState('1');
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    /** for finished rounds */
    const [CurrentRoundID, setCurrentRoundID] = useState<number>(0); // for finished rounds
    const handleSetCurrentRoundID = (curID) => {
        if (curID >= 0 && curID < data.rounds.length) {
            setCurrentRoundID(curID);
        }
    };

    /** for select tokens */
    const [selectedTokenId, setSelectedTokenId] = useState<number | undefined>(0);
    const handleSelectTokenId = (token_id) => {
        setSelectedTokenId(token_id);
    };

    /** for select my lottery round */
    const [selectedMylotteryId, setSelectedMylotteryId] = useState<number | undefined>(0);
    const handleSelectMylotteryId = (lottery_id) => {
        setSelectedMylotteryId(lottery_id);
    };


    /** for number of tickets */
    const [ticketAmount, setTicketAmount] = useState<number | undefined>(0);
    const handleSetTicketAmount = (amount) => {
        if (amount >= 0 && amount < 10000) {
            setTicketAmount(amount);
        }
    };

    /** for buy ticket modal */
    const [showModal, setShowModal] = useState(false);
    const handleBuyTicket = () => {
        if (!(ticketAmount > 0 && ticketAmount < 10000)) {
            console.log("invalid ticket amounts.");
            return;
        }

        setShowModal(true);
    };

    const handleModalOk = () => {
        setShowModal(false);
    };

    const handleModalCancel = () => {
        setMyTickets([]);
        setShowModal(false);
    };

    /** for generate tickets */
    const pinfieldRef = useRef(null);

    const [myTickets, setMyTickets] = useState<any>([]);
    const handleGenerateMyTickets = (newTicket) => {
        setMyTickets((prevTickets) => [
            ...prevTickets,
            newTicket
        ]);
    };

    const handleAddMyTicket = () => {
        const value1 = pinfieldRef.current.inputs[0].value;
        const value2 = pinfieldRef.current.inputs[1].value;
        const value3 = pinfieldRef.current.inputs[2].value;
        const value4 = pinfieldRef.current.inputs[3].value;

        if (value1 == '' || value2 == '' || value3 == '' || value4 == '') {
            console.log("invalid number input");
            return;
        }

        if (ticketAmount == myTickets.length) {
            console.log("can't buy tickets more.");
            return;
        }

        for (let i = 0; i < myTickets.length; i++) {
            if (myTickets[i][0] == value1 && myTickets[i][1] == value2 && myTickets[i][2] == value3 && myTickets[i][3] == value4) {
                console.log("duplicated number");
                return;
            }
        }

        handleGenerateMyTickets([value1, value2, value3, value4]);
    };

    const handleRemoveTicket = (index) => {
        setMyTickets(myTickets.filter((_, i) => index !== i));
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
                                        <Tab label="History" value="2" />
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

                                                <input className="custom-input" type='number' placeholder='Number of Tickets' value={ticketAmount ? ticketAmount : ''} onChange={(e) => handleSetTicketAmount(Number(e.target.value))} />

                                                <div className="fryja-center">
                                                    <div style={{ justifyContent: "space-between", display: "flex", width: "100px" }}>
                                                        <div className="control-but" onClick={() => handleSetTicketAmount(ticketAmount - 1)}>-</div>
                                                        <div className="control-but" onClick={() => handleSetTicketAmount(ticketAmount + 1)}>+</div>
                                                    </div>

                                                </div>
                                                <div className="text-center" style={{ color: "rgba(165, 165, 165, 1)", fontSize: "12x" }}>
                                                    <span>Balance: 35 egld</span>
                                                    <span style={{ paddingLeft: "20px" }}>Cost: 2 egld</span>
                                                </div>

                                                <div className="buy-tickets-but" onClick={handleBuyTicket}>
                                                    <img src={buyTicketsButImg} style={{ width: "100%" }} />
                                                </div>

                                                <div className="text-center" style={{ color: '#dac374' }}>
                                                    {"You got " + myTickets.length + " tickets."}
                                                </div>
                                            </div>
                                        </Col>

                                        <Col md="7" style={{ marginTop: "20px" }}>
                                            <Row>
                                                <Col sm='7'>
                                                    <div className="Comment-Box">
                                                        <p className="Next-Draw">Next Draw is on &nbsp;<span style={{ color: "#EEC98A" }}>Apr 18 2022, 11:39AM</span></p>
                                                        <p className="Comment">She is waiting for your prayers, buy tickets with caution. Good luck</p>

                                                        <p className="Next-Draw"># Prize Pool &nbsp;<span style={{ color: "#EEC98A" }}>{"$15225"}</span></p>
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
                                                <div className="circle-but" onClick={() => handleSetCurrentRoundID(0)}>
                                                    <span>{"<<"}</span>
                                                </div>
                                                <div className="circle-but" onClick={() => handleSetCurrentRoundID(CurrentRoundID - 1)}>
                                                    <span>{"<"}</span>
                                                </div>
                                                <div className="circle-but" onClick={() => handleSetCurrentRoundID(CurrentRoundID + 1)}>
                                                    <span>{">"}</span>
                                                </div>
                                                <div className="circle-but" onClick={() => handleSetCurrentRoundID(data.rounds.length - 1)}>
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

                                    <Row>
                                        <Col className="mt-2" lg="6">
                                            <Row>
                                                <Col sm="5">
                                                    <img src={girl2Img} style={{ marginTop: "-30px", marginLeft: "-80px" }} />
                                                </Col>
                                                <Col sm="7">
                                                    <div className="Comment-Box text-center">
                                                        <p className="Next-Draw"><span style={{ color: "#EEC98A" }}>Welcome!</span></p>
                                                        <p className="Comment">Choose date for grace of fryja.</p>
                                                    </div>

                                                    <div className="mt-2">
                                                        <Dropdown onSelect={handleSelectMylotteryId} drop='down'>
                                                            <Dropdown.Toggle className='token-id-toggle' id="token-id">
                                                                {
                                                                    <>
                                                                        <span>#{data.MyLotteries[selectedMylotteryId].round_id}</span>
                                                                        <span>{data.rounds[data.MyLotteries[selectedMylotteryId].round_id - 1].date}</span>
                                                                    </>
                                                                }
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu className='token-id-menu'>
                                                                {
                                                                    data.MyLotteries.map((myLottery, index) => (
                                                                        <Dropdown.Item eventKey={index} key={`MyLottery-id-menu-item-${index}`}>
                                                                            <span>{data.rounds[myLottery.round_id - 1].date}</span>
                                                                        </Dropdown.Item>
                                                                    ))
                                                                }
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>

                                                    <div className='mt-2'>
                                                        <div className="Comment-Box" style={{ background: "rgba(18,18,18,0.3)" }}>
                                                            <div className="fryja-center" style={{ display: "flex", gap: "20px" }}>
                                                                {
                                                                    data.rounds[data.MyLotteries[selectedMylotteryId].round_id - 1].result.map((roundResult, index) => {
                                                                        return (
                                                                            <div className="lottery-small-number-card" key={index}>
                                                                                <span className="lottery-number" style={{ fontFamily: "Arial", fontSize: "23px" }}>{roundResult}</span>
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col className="mt-2" lg="6">
                                            <div className="Comment-Box p-0" style={{ background: "rgba(18,18,18,0.3)" }}>
                                                <div className='text-center pl-5 pr-5 pt-5'>
                                                    <img src={winlost} alt="win lost" style={{ width: "90%" }} />
                                                </div>
                                                <div className="custom-scroll-bar pl-5 pr-5" style={{ overflowY: "auto", height: "520px" }}>
                                                    <Row>
                                                        {
                                                            data.MyLotteries[selectedMylotteryId].tickets.map((ticket, index) => {
                                                                const flag = ticket.match > 2 ? "win" : "lost";

                                                                return (
                                                                    <Col className="mt-4" sm="6" key={index}>
                                                                        <div className={`ticket-box-${flag}`}>
                                                                            <div className="ticket-medal ml-3">
                                                                                <div className="ticket-medal-inner-box" >
                                                                                    <span>{ticket.match}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-center ml-3" >
                                                                                <span className="ml-2">{ticket.number[0]}</span>
                                                                                <span className="ml-2">{ticket.number[1]}</span>
                                                                                <span className="ml-2">{ticket.number[2]}</span>
                                                                                <span className="ml-2">{ticket.number[3]}</span>
                                                                            </div>
                                                                        </div>
                                                                    </Col>
                                                                );
                                                            })
                                                        }
                                                    </Row>
                                                </div>

                                            </div>
                                        </Col>
                                    </Row>
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


                <Modal
                    isOpen={showModal}
                    ariaHideApp={false}
                    className='modalcard box-shadow'
                >
                    <div className='modaldiv'>
                        <h3 className='modalHeader'>Buy Your Tickets </h3>
                    </div>
                    <div className='modal-divider' />
                    <p className="mt-1 mb-1">{"Generating: "} {ticketAmount - myTickets.length}</p>

                    <div className="fryja-but mt-2">Generate Random</div>
                    <div className="d-flex justify-content-center">
                        <ReactPinField ref={pinfieldRef} className="pin-field" length={4} validate="0123456789" inputMode="numeric" />
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="control-but text-center" onClick={handleAddMyTicket}>+</div>
                    </div>

                    <div className='modal-divider mt-2' />
                    <p className="mt-1">{"Generated: "} {myTickets.length}</p>


                    <div className="custom-scroll-bar" style={{ overflowY: "auto" }}>
                        <Row className="text-center ml-0 mr-0">
                            {
                                myTickets.map((ticket, index) => {
                                    return (
                                        <div className="normal-ticket m-2" key={index} style={{ alignItems: "center" }} onClick={() => handleRemoveTicket(index)}>
                                            <span>{ticket[0]}</span>
                                            <span className="ml-1">{ticket[1]}</span>
                                            <span className="ml-1">{ticket[2]}</span>
                                            <span className="ml-1">{ticket[3]}</span>
                                            <div className=" ml-2 close-but">X</div>
                                        </div>
                                    );
                                })
                            }
                        </Row>
                    </div>

                    <Row className="mt-2">
                        <Col xs="6">
                            <div className="fryja-but mt-2" onClick={handleModalOk}>ok</div>
                        </Col>
                        <Col xs="6">
                            <div className="fryja-but mt-2" onClick={handleModalCancel}>cancel</div>
                        </Col>
                    </Row>

                </Modal>
            </div>
        </>
    );
};

export default GraceOfFryja;
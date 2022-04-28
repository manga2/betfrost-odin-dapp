import React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Container, Row, Col } from 'react-bootstrap';

import './index.scss';
import buyTicketImg from 'assets/img/Grace of Fryja/Buy Ticket.svg';
import buyTicketsButImg from 'assets/img/Grace of Fryja/Buy Tickets But.svg';
import girl1Img from 'assets/img/Grace of Fryja/girl1.svg';
import titleImg from 'assets/img/Grace of Fryja/title.svg';
import whowill from 'assets/img/Grace of Fryja/whowill.svg';
import CountDown from './CountDown';

const GraceOfFryja = () => {
    const [tabValue, setValue] = React.useState('1');

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <div style={{ background: "#121212" }}>
                {/** first part */}
                <div className='fryja-first-part'>
                    <Container className='fryja-inner-container text-center' style={{ paddingTop: "100px" }}>
                        <img className="fryja-title" src={titleImg} alt="Grace of Fryja"/>
                        <CountDown />
                        <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                            <div className="buy-ticket-button" >
                                <img className="but-title" src={buyTicketImg} />
                            </div>
                        </div>
                    </Container>
                </div>

                {/** second part */}
                <div className='fryja-second-part'>
                    <Container style={{ paddingTop: "30px" }}>
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
                                                <input className="custom-input" type='number' placeholder='Select Token' />
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
                                            <p style={{ fontFamily: "IM FELL English SC", fontSize: "18px" }}>Draw: {"Apr 17 2022, 11:38 AM"} </p>

                                            <div className="fryja-center" style={{ display: "flex", gap: "20px" }}>
                                                <div className="lottery-small-number-card">
                                                    <span className="lottery-number">{"5"}</span>
                                                </div>

                                                <div className="lottery-small-number-card">
                                                    <span className="lottery-number">{"2"}</span>
                                                </div>

                                                <div className="lottery-small-number-card">
                                                    <span className="lottery-number">{"3"}</span>
                                                </div>

                                                <div className="lottery-small-number-card">
                                                    <span className="lottery-number">{"7"}</span>
                                                </div>
                                            </div>

                                            <div className="fryja-center" style={{ display: "flex", gap: "20px", marginTop: "20px", marginBottom: "30px" }}>
                                                <div className="circle-but">
                                                    <span>{"<<"}</span>
                                                </div>
                                                <div className="circle-but">
                                                    <span>{"<"}</span>
                                                </div>
                                                <div className="circle-but">
                                                    <span>{">"}</span>
                                                </div>
                                                <div className="circle-but">
                                                    <span>{">>"}</span>
                                                </div>
                                            </div>

                                            <p style={{ fontFamily: "IM FELL English SC", fontSize: "18px", color: "#BDBDBD", marginBottom: "30px" }}>Finished Round: {"#2"} </p>

                                            <img src={whowill} style={{ width: "100%" }} alt="who will recieve the grace of fryja"/>
                                        </div>
                                    </div>

                                </TabPanel>

                                {/** tab for lottery histories */}
                                <TabPanel value="2">Item Two</TabPanel>
                            </TabContext>
                        </Box>
                    </Container>
                </div>

                <div className='fryja-third-part'>
                    <Container style={{ paddingTop: "30px" }}>

                    </Container>
                </div>
            </div>
        </>
    );
};

export default GraceOfFryja;
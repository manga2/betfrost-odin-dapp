import React from 'react';
import { Container } from 'react-bootstrap';
import './index.scss';
import buyTicketImg from 'assets/img/Grace of Fryja/Buy Ticket.svg';
import titleImg from 'assets/img/Grace of Fryja/title.svg';
import CountDown from './CountDown';

const GraceOfFryja = () => {
    return (
        <>
            <div>
                <div className='fryja-first-part'>
                    <Container className='fryja-inner-container text-center' style={{ paddingTop: "100px" }}>
                        <img className="fryja-title" src={titleImg} />
                        <CountDown />
                        <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                            <div className="buy-ticket-button" >
                                <img className="but-title" src={buyTicketImg} />
                            </div>
                        </div>
                    </Container>
                </div>

                <div className='fryja-second-part'>
                    <Container style={{ paddingTop: "30px" }}>
                        <img className="fryja-title" src={titleImg} />
                        <CountDown />
                        <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
                            <div className="buy-ticket-button" >
                                <img className="but-title" src={buyTicketImg} />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default GraceOfFryja;
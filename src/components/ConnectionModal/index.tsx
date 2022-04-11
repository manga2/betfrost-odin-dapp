import React from 'react';
import {Modal as BsModal, Col} from 'react-bootstrap';
import { DappUI, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import './index.scss';

const ConnectionModal = (props) => {
    const data = props.data;

    const {
        ExtensionLoginButton,
        WebWalletLoginButton,
        LedgerLoginButton,
        WalletConnectLoginButton
    } = DappUI;

    const colSizes = {
        lg: 2,
        md: 5,
        sm: 12,
    };

    // if wallet connected, close modal
    const { address } = useGetAccountInfo();
    React.useEffect(() => {
        if (address) {
            props.onHide();
        }
    }, [address]);

    return (
        <BsModal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='custom-auth-modal-container'
            >
            <BsModal.Body className='row'>
                <Col {...colSizes}>
                    <ExtensionLoginButton
                    callbackRoute={props.loginRoute}
                    loginButtonText={'Extension'}
                    />
                </Col>
                <Col {...colSizes}>
                    <WebWalletLoginButton
                    callbackRoute={props.loginRoute}
                    loginButtonText={'Web wallet'}
                    />
                </Col>
                <Col {...colSizes}>
                    <LedgerLoginButton
                    loginButtonText={'Ledger'}
                    callbackRoute={props.loginRoute}
                    className={'test-class_name'}
                    />
                </Col>
                <Col {...colSizes}>
                    <WalletConnectLoginButton
                    callbackRoute={props.loginRoute}
                    loginButtonText={'Maiar'}
                    />
                </Col>
            </BsModal.Body>
        </BsModal>
    );
};

export default ConnectionModal;
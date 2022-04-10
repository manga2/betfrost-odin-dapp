import {
    SmartContract,
    DefaultSmartContractController, 
} from '@elrondnetwork/erdjs';

export interface IContractInteractor {
    contract: SmartContract;
    controller: DefaultSmartContractController;
}

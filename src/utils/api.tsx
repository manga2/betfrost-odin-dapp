import axios from "axios";
import { convertWeiToEsdt } from './convert';

export async function getBalanceOfToken(apiAddress, account, token_id) {
    try {
        if (token_id == 'EGLD') {
            return convertWeiToEsdt(account.balance);
        }

        const res = await axios.get(`${apiAddress}/accounts/${account.address.toString()}/tokens?identifier=${token_id}`);
        console.log('res', res);
        if (res.data?.length > 0) {
            const token = res.data[0];
            return convertWeiToEsdt(token.balance, token.decimals);
        }
    } catch(e) {
        console.log('getBalanceOfToken error', e);
    }

    return 0;
}
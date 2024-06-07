import {ethers} from "ethers";
import abi from "./abi.json"

async function SaveToBlockChain(paymentId, amount) {
    const contractABI = abi; // Your contract ABI
    const contractAddress = '0x72D66265f2bA731fb31AF741Dc402F5d5194F217';
    const {ethereum} = window;
    const account = await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const transaction = await contract.contribute(paymentId, amount);
    await transaction.wait();
    console.log(transaction)
    console.log(amount, paymentId)
    // console log the transaction logs
    return transaction;
}

export default SaveToBlockChain;

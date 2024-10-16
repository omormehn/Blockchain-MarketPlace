import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../contracts/contract';

export const connectWallet = async() => {
    if (!window.ethereum) return alert ("Metamask not Installed");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const account = await provider.send("eth_requestAccounts", []);
    return account;
}
export const connectWallet2 = async () => {
  if (!window.ethereum) return alert("Metamask not Installed");
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider;
};
export const connectWallet3 = async () => {
  if (!window.ethereum) return alert("Metamask not Installed");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return signer;
};

export const connectWallet4 = async () => {
  if (!window.ethereum) return alert("Metamask not Installed");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAbi, contractAddress, signer);
  return contract;
};
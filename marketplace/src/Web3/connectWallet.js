import { ethers } from 'ethers';

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
import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [connectedAddress, setConnectedAddress] = useState(null);

  const connectWallet = async () => {
    try {
      // Connect to the injected Web3 provider (MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Request access to the user's accounts
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Get the first connected address
      const connectedAddress = accounts[0];
      setConnectedAddress(connectedAddress);

      console.log('Connected address:', connectedAddress);

      // Use the provider for further interactions (e.g., contract calls)
      console.log('Provider:', provider);
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
    }
  };

  const connectMetamask = async () => {
    try {
      const contractAddress = '0x5631F0E30c73D68efc01cc6f8b1fE6D175115AcB'; // Replace with your contract address
      window.contract = contractAddress
      const ABI =  [
	{
		"inputs": [],
		"name": "mycity",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]     
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      window.contract = contract

      
      document.getElementById("contractArea").innerHTML = "connected"

 // Iterate through the function fragments in the ABI
      

     
      // // Call a function on the contract
      // const contractGreeting = await contract.greeting();

      // console.log('Greeting from contract:', contractGreeting);
    } catch (error) {
      console.error('Error interacting with contract:', error.message);
    }
  };
//read data from contract



const getBalance = async () => {
 
  const mod = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/14250c3eb2a94d70a1f8f8e298d0baaa")
  const ERC20_ABI = [
    "function name() view returns (string)"
  ] 
  const address="0x6B175474E89094C44Da98b954EedeAC495271d0F"
 
 const contract =  new ethers.Contract(address,ERC20_ABI,mod)
     const balance = await mod.getBalance(window.contract)

      document.getElementById("contractArea").innerHTML =  await contract.name()
        console.log(balance)
 
};


  return (
    <div>
      <h1>Wallet Connection Example</h1>
      {connectedAddress ? (
        <>
          <p>Connected Address: {connectedAddress}</p>
          <button onClick={connectMetamask}>connectContract</button>
          <div id="contractArea">
          </div>

          <button onClick={getBalance}>getBalance</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;

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
      const contractAddress = '0xa9214993899ED318940d1999C2135ADF0Cea74Eb'; // Replace with your contract address from remix
      window.contract = contractAddress
      const ABI = [
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
      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/e592f43a141242cab421c43726b436b4"); // we got to make this provider url match the network from metamask and use the contravt address then make a contravt insytance 
     
      const contract = new ethers.Contract(contractAddress, ABI, provider);
      window.contract = contract

      
      document.getElementById("contractArea").innerHTML = await contract.mycity() // we reading the method from the contract

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
 
  const mod = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/e592f43a141242cab421c43726b436b4")
//   const ERC20_ABI = [
//     "function name() view returns (string)"
//   ] 
  const address="0x00533d59596D8B5d4CE9F126b14C96934E39b733"
 
//  const contract =  new ethers.Contract(address,ERC20_ABI,mod)
     const balance = await mod.getBalance(address)

      document.getElementById("balance").innerHTML =  ethers.formatEther(balance);
        console.log(balance)
        console.log()
 
};

const makeATransaction = async() => {
  //now we got to write a contract 
  try {
     const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/e592f43a141242cab421c43726b436b4"); // we got to make this provider url match the network from metamask and use the contravt address then make a contravt insytance 
     const acct1 = "0x00533d59596D8B5d4CE9F126b14C96934E39b733"; // okay so the state stays becayse we still in the app scope 
     const acct2 = "0x9b8cC73cec00f88D0a6B4C0353b72Cd84a5c3099"
     const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786"
     const Wallet =  new ethers.Wallet(privateKey,provider)
    
     const sender1Balanceb4 = await provider.getBalance(acct1);
     const sender2Balanceb4 = await provider.getBalance(acct2);
     console.log(ethers.formatEther(sender1Balanceb4))
     console.log(ethers.formatEther(sender2Balanceb4))
    
    
               //sending the ether
           const tx = await Wallet.sendTransaction({to:acct2,value:ethers.parseEther("0.025")})
    
    // the balance after the transaction 
     const sender1Balanceaf = await provider.getBalance(acct1);
     const sender2Balanceaf = await provider.getBalance(acct2);
     console.log(ethers.formatEther(sender1Balanceaf))
     console.log(ethers.formatEther(sender2Balanceaf))
         //wait for it to be mined 
           
          const receipt = await tx.wait()
           console.log(tx)
    
           if (receipt.status === 1) {
       console.log("Transaction successful!");
     } else {
       console.log("Transaction failed. Check the receipt for more details.");
     }
      
    } catch (error) {
      console.log(error)
    }
    
    
  }
  const writ = async() =>{
     const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/e592f43a141242cab421c43726b436b4"); // we got to make this provider url match the network from metamask and use the contravt address then make a contravt insytance 
    const acct1 = "0x00533d59596D8B5d4CE9F126b14C96934E39b733"; // okay so the state stays becayse we still in the app scope 
    const acct2 = "0x4675C7e5BaAFBFFbca748158bEcBA61ef3b0a263"
    const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786"
    const Wallet =  new ethers.Wallet(privateKey,provider)
    const contractAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789" // actuall tranaction hash address
    const ERC20_ABI = [
      "function balanceOf(address) view returns (uint)",
      "function transfer(address to, uint amount) returns (bool)"
    ];
    const contract = new ethers.Contract(contractAddress,ERC20_ABI,provider)
    
        const balance = await contract.balanceOf(acct1)


      const contractWithWallet = contract.connect(Wallet);
         const tx =  await contractWithWallet.transfer(acct2,balance)
        await tx.wait()

        console.log(tx)
      
  }
  

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
          <div id="balance"></div>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
        )}
        <button onClick={makeATransaction}>make a Transaction</button>
        <button onClick={writ}> write contract</button>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './SendTokensForm.css';

const SendTokensForm = () => {
  const [addressInput, setAddressInput] = useState(''); // Separate state for input
  const [connectedAddress, setConnectedAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setIsConnected(true);
      setConnectedAddress(window.ethereum.selectedAddress);
      setAddressInput(''); // Clear the input field when connected
    } else {
      setIsConnected(false);
      setConnectedAddress('');
    }
  };

  const handleConnectWallet = async () => {
    try {
      await window.ethereum.enable();
      checkConnection();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  const handleAddressChange = (e) => {
    setAddressInput(e.target.value);
  };

  const handleTokenAmountChange = (e) => {
    setTokenAmount(e.target.value);
  };

  const handleSendTokens = () => {
    // Use `addressInput` instead of `connectedAddress` for sending tokens
    console.log(`Sending ${tokenAmount} tokens to ${addressInput}`);
    // You can send this data to your backend or perform any other necessary actions
  };

  return (
    <div className='container'>
      {!isConnected ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Wallet: {connectedAddress}</p>
          <label>
            Address:
            <input type="text" value={addressInput} onChange={handleAddressChange} />
          </label>
          <br />
          <label>
            Token Amount:
            <input type="text" value={tokenAmount} onChange={handleTokenAmountChange} />
          </label>
          <br />
          <button onClick={handleSendTokens}>Send Tokens</button>
        </div>
      )}
    </div>
  );
};

export default SendTokensForm;

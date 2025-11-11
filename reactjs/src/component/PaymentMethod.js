import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: sans-serif;
  color: white;
`;

const PaymentOptions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const PaymentButton = styled.button`
  background-color: ${props => props.active ? '#4CAF50' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : 'black'};
  border: 1px solid #ddd;
  padding: 1rem 2rem;
  margin: 0 1rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #ddd;
  }

  i {
    margin-right: 0.5rem;
  }
`;

const PaymentDetails = styled.div`
  border: 1px solid #ddd;
  padding: 2rem;
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
  background-color: #333;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100px;
    margin-right: 1rem;
  }
`;

const Detail = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const Warning = styled.p`
    color: red;
    font-weight: bold;
`

const PaymentMethod = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedMethod = searchParams.get('method') || 'esewa';

  const handleMethodChange = (method) => {
    setSearchParams({ method });
  };

  const renderDetails = () => {
    switch (selectedMethod) {
      case 'esewa':
        return (
          <PaymentDetails>
            <Title>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQobMXYNheAlDT6Ukz4smf2K33xv3hZ7ELrqA&s" alt="eSewa" />
              eSewa Payment
            </Title>
            <Detail><Strong>Name:</Strong> Bijesh Kumar Kushwaha</Detail>
            <Detail><Strong>Number:</Strong> 9800858635</Detail>
            <Detail><Strong>Amount:</Strong> Rs</Detail>
            <Detail><Strong>How to send❔</Strong></Detail>
            <Detail>✅ Use "Send Money" feature</Detail>
            <Detail>✅ Purpose: Personal Use</Detail>
            <Detail>✅ Remarks: Your Name ONLY</Detail>
            <Warning>❌ Do not send top-up/recharge</Warning>
            <Detail>⚠️ send screenshot after successful payment</Detail>
          </PaymentDetails>
        );
      case 'khalti':
        return (
          <PaymentDetails>
            <Title>
              <img src="https://cdn.aptoide.com/imgs/b/2/c/b2c3c82e2890203b7a4b0cfb188b3f71_icon.png" alt="Khalti" />
              Khalti Payment
            </Title>
            <Detail><Strong>Name:</Strong> Brijesh Kushwaha</Detail>
            <Detail><Strong>Number:</Strong> 9800858635</Detail>
            <Detail>⚠️ send screenshot after successful payment</Detail>
          </PaymentDetails>
        );
      case 'bank':
        return (
          <PaymentDetails>
            <Title>Direct Bank Transfer</Title>
            <Detail>For direct bank transfer, please contact admin.</Detail>
          </PaymentDetails>
        );
      default:
        return null;
    }
  };

  return (
    <PaymentContainer>
      <PaymentOptions>
        <PaymentButton active={selectedMethod === 'esewa'} onClick={() => handleMethodChange('esewa')}>
          <i className="fas fa-wallet"></i>
          eSewa
        </PaymentButton>
        <PaymentButton active={selectedMethod === 'khalti'} onClick={() => handleMethodChange('khalti')}>
          <i className="fas fa-mobile-alt"></i>
          Khalti
        </PaymentButton>
        <PaymentButton active={selectedMethod === 'bank'} onClick={() => handleMethodChange('bank')}>
          <i className="fas fa-university"></i>
          Bank Transfer
        </PaymentButton>
      </PaymentOptions>
      {renderDetails()}
    </PaymentContainer>
  );
};

export default PaymentMethod;

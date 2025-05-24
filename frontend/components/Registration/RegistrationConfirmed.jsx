import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
  text-align: center;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h1`
  color: #28a745;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const RegistrationConfirmed = () => {
  return (
    <Container>
      <Card>
        <Title>Registration Successful!</Title>
        <Message>
          Thank you for registering. Please check your email to verify your account.
          You will need to verify your email before you can log in.
        </Message>
        <Button to="/login">Go to Login</Button>
      </Card>
    </Container>
  );
}; 
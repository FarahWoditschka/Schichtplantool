import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

export const Dashboard = () => {
  return (
    <Container>
      <Title>Dashboard</Title>
      {/* Dashboard content will be added here */}
    </Container>
  );
}; 
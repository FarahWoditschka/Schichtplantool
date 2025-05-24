import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`;

export const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: #f8d7da;
  border-radius: 4px;
`;

export const Button = styled(Link)`
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
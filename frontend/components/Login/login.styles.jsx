import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${props => props.disabled ? '#ccc' : '#0056b3'};
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: #f8d7da;
  border-radius: 4px;
`;

export const RegisterLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`; 
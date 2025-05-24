import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Title,
  Message,
  Button,
  ErrorMessage
} from './emailVerification.styles';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/verify-email/${token}`, {
          method: 'GET'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Verification failed');
        }

        // Erfolgreiche Verifizierung
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (err) {
        setError(err.message || 'An error occurred during verification');
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  if (isLoading) {
    return (
      <Container>
        <Card>
          <Title>Verifying your email...</Title>
          <Message>Please wait while we verify your email address.</Message>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card>
          <Title>Verification Failed</Title>
          <ErrorMessage>{error}</ErrorMessage>
          <Button to="/login">Return to Login</Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Title>Email Verified!</Title>
        <Message>
          Your email has been successfully verified. You will be redirected to the login page in a few seconds.
        </Message>
      </Card>
    </Container>
  );
};

export default EmailVerification; 
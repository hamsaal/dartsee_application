import { Container, Alert } from '@mui/material'

interface ErrorAlertProps {
  message: string
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Alert severity="error">{message}</Alert>
    </Container>
  )
}

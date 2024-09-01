import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useSocialContractClient } from '../hooks/socialContract';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 8px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  background-color: #F7F9FA;
  padding: 24px;
`;

const StyledDialogContent = styled(DialogContent)`
  padding: 24px;
`;

const StyledDialogActions = styled(DialogActions)`
  padding: 24px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  text-transform: none;
  padding: 8px 16px;
`;

function LoanPopup({ open, onClose }) {
  const [amount, setAmount] = useState('');
  const socialContractClient = useSocialContractClient();

  const handleClose = () => { console.log('close'); onClose(); }

  const handleSubmit = async () => {
    try {
      await socialContractClient.requestLoan(parseFloat(amount));
      handleClose();
      // Adicione aqui uma notificação de sucesso, se desejar
    } catch (error) {
      console.error('Erro ao solicitar empréstimo:', error);
      // Adicione aqui uma notificação de erro, se desejar
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Solicitar Empréstimo</StyledDialogTitle>
      <StyledDialogContent>
        <StyledTextField
          autoFocus
          margin="dense"
          id="amount"
          label="Valor do Empréstimo"
          type="number"
          fullWidth
          variant="outlined"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton onClick={handleClose} variant="outlined">Cancelar</StyledButton>
        <StyledButton onClick={handleSubmit} variant="contained" color="primary">Solicitar</StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
}

export default LoanPopup;

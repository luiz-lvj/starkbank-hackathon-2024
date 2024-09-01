import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useApiClient } from '../../hooks/api';
import styled from 'styled-components';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 8px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
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

const StyledUploadButton = styled(Button)`
  margin-top: 16px;
`;

function LoanPopup({ open, onClose }) {
  const [amount, setAmount] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useApiClient();

  const handleClose = () => { console.log('close'); onClose(); }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Por favor, selecione um arquivo PDF válido.');
    }
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      alert('Por favor, faça o upload de um PDF antes de solicitar o empréstimo.');
      return;
    }

    setIsLoading(true);

    try {
      // Upload do arquivo para o Firebase Storage
      const storage = getStorage();
      const fileRef = ref(storage, `social_contracts/${uuidv4()}_${pdfFile.name}`);
      await uploadBytes(fileRef, pdfFile);
      const downloadURL = await getDownloadURL(fileRef);

      // Solicitar empréstimo com o URL do arquivo
      await apiClient.requestLoan(parseFloat(amount), downloadURL);
      
      handleClose();
      alert('Empréstimo solicitado com sucesso!');
    } catch (error) {
      console.error('Erro ao solicitar empréstimo:', error);
      alert('Ocorreu um erro ao solicitar o empréstimo. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
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
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Faça o upload do contrato social para garantir melhor aprovação do seu empréstimo.
        </Typography>
        <input
          accept="application/pdf"
          style={{ display: 'none' }}
          id="pdf-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="pdf-upload">
          <StyledUploadButton variant="outlined" component="span">
            {pdfFile ? 'PDF selecionado' : 'Selecionar PDF'}
          </StyledUploadButton>
        </label>
        {pdfFile && (
          <Typography variant="body2" color="textSecondary" style={{ marginTop: 8 }}>
            Arquivo selecionado: {pdfFile.name}
          </Typography>
        )}
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton onClick={handleClose} variant="outlined" disabled={isLoading}>Cancelar</StyledButton>
        <StyledButton 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary" 
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Solicitar'}
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
}

export default LoanPopup;

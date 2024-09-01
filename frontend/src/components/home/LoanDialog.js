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
  const [loadingMessage, setLoadingMessage] = useState('');
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
    setIsLoading(true);

    try {
      // Upload do arquivo para o Firebase Storage
      let fileRef;

      if (pdfFile) {
        const storage = getStorage();
        fileRef = ref(storage, `social_contracts/${uuidv4()}_${pdfFile.name}`);
        await uploadBytes(fileRef, pdfFile);

        const uploadPromise = uploadBytes(fileRef, pdfFile);

        const simulateLoadingMessages = async () => {
          const messages = [
            'Validando seu score...',
            'Analisando o documento...',
            'Procurando melhores alternativas...'
          ];

          for (const message of messages) {
            setLoadingMessage(message);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula tempo de carregamento
          }
        };

        await Promise.all([uploadPromise, simulateLoadingMessages()]);
      }

      // Solicitar empréstimo com o URL do arquivo
      await apiClient.requestLoan(parseFloat(amount), fileRef);
      
      handleClose();
      alert('Empréstimo solicitado com sucesso!');
    } catch (error) {
      console.error('Erro ao solicitar empréstimo:', error);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Solicitar Empréstimo</StyledDialogTitle>
      <StyledDialogContent>
        {isLoading ? (
          <Typography variant="body2" color="textSecondary">
            {loadingMessage}
          </Typography>
        ) : (
          <>
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
          </>
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

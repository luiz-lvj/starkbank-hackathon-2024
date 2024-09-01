import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useApiClient } from '../../hooks/api';
import styled from 'styled-components';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
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
  const [resultMessage, setResultMessage] = useState('');
  const [requestFailed, setRequestFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const apiClient = useApiClient();

  const handleClose = () => { 
    console.log('close'); 
    onClose(); 
    setResultMessage(''); // Limpar mensagem ao fechar
    setRequestFailed(false); // Resetar estado de falha ao fechar
    setSuccess(false);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      setResultMessage('Por favor, selecione um arquivo PDF válido.');
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setResultMessage('');
    setRequestFailed(false);

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
      const result = await apiClient.requestLoan(parseFloat(amount), `gs://${fileRef.bucket}/${fileRef.fullPath}`);

      if (!result.hasLoanMatch) {
        setResultMessage('Infelizm ente não temos como fornecer esse empréstimo no momento, mas entraremos em contato caso surja uma oportunidade!');
      } else {
        setSuccess(true);
        setResultMessage([
          `Empréstimo solicitado com sucesso!`, 
          `Você solicitou um adiantamento de recebíveis para capital de giro no valor de R$ ${result.loanAmount.toFixed(2)}.`,
          `A taxa de juros é de ${result.loanInterestRate} ao mês, com um prazo de ${result.loanTerm} meses para pagamento.`,
          `Agradecemos pela sua confiança!`
        ].join('\n')
        );
        await apiClient.saveLoan(result);
      }

      // Mostrar resultado para o cliente
      console.log('Resultado da solicitação:', result);
    } catch (error) {
      console.error('Erro ao solicitar empréstimo:', error);
      setResultMessage('Erro ao solicitar empréstimo. Por favor, tente novamente.');
      setRequestFailed(true);
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
        ) : resultMessage ? (
          <Typography
            variant="body2"
            color={success ? "success.main" : "error.main"}
            style={{ marginTop: 8 }}
          >
            {resultMessage}
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
            {requestFailed && (
              <Typography variant="body2" color="error" style={{ marginTop: 8 }}>
                Não foi possível processar sua solicitação. Por favor, tente novamente.
              </Typography>
            )}
          </>
        )}
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton onClick={handleClose} variant="outlined" disabled={isLoading}>Fechar</StyledButton>
        {!resultMessage && (
          <StyledButton 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary" 
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Solicitar'}
          </StyledButton>
        )}
      </StyledDialogActions>
    </StyledDialog>
  );
}

export default LoanPopup;

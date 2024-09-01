import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useSocialContractClient } from '../hooks/api';

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
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Solicitar Empréstimo</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="amount"
                    label="Valor do Empréstimo"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit}>Solicitar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LoanPopup;

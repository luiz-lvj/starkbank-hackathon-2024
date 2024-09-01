import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, Chip, InputLabel, FormControl, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import { useApiClient } from '../../hooks/api';

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  paddingLeft: '300px',
});

const ChipContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

const RuleSubmissionForm = () => {
  const [filters, setFilters] = useState({
    segment: ['Agronegócio', 'Saúde', 'Tratamento de dados'],
    minimumTpv: '',
    maximumTpv: '',
    minimumInvestmentValue: '',
    maximumInvestmentValue: '',
    socialCapital: '', // Remover esta linha
    minimumStarkScore: '',
    type: '',
    noLiability: false,
  });

  const [open, setOpen] = useState(false); // Estado para controlar o popup

  const { saveFilter } = useApiClient(); // Adiciona o hook da API

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setOpen(false);
    try {
      await saveFilter(filters); // Salva os filtros usando a API
      console.log('Filtros salvos com sucesso:', filters);
    } catch (error) {
      console.error('Erro ao salvar filtros:', error);
    }
  };

  const handleMarketDelete = (marketToDelete) => () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      segment: prevFilters.segment.filter((market) => market !== marketToDelete),
    }));
  };

  const handleLocationDelete = (locationToDelete) => () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      locations: prevFilters.locations.filter((location) => location !== locationToDelete),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await saveFilter(filters); // Salva os filtros usando a API
      console.log('Filtros salvos com sucesso:', filters);
    } catch (error) {
      console.error('Erro ao salvar filtros:', error);
    }
  };

  return (
    <Form onSubmit={(e) => { e.preventDefault(); handleClickOpen(); }}>
      <h2>Regras para concessão de Crédito</h2>
      <TextField
        label="Limite de Valor Emitido (mín.)"
        type="number"
        value={filters.minimumTpv}
        onChange={(e) => setFilters({ ...filters, minimumTpv: parseFloat(e.target.value) || '' })}
        fullWidth
      />
      <TextField
        label="Limite de Valor Emitido (máx.)"
        type="number"
        value={filters.maximumTpv}
        onChange={(e) => setFilters({ ...filters, maximumTpv: parseFloat(e.target.value) || '' })}
        fullWidth
      />
      <TextField
        label="StarkScore (mín. 0 - máx. 1000)"
        type="number"
        value={filters.minimumStarkScore}
        onChange={(e) => setFilters({ ...filters, minimumStarkScore: parseFloat(e.target.value) || '' })}
        fullWidth
      />
      <FormControl fullWidth>
        <ChipContainer>
          {filters.segment.map((market) => (
            <Chip
              key={market}
              label={market}
              onDelete={handleMarketDelete(market)}
            />
          ))}
        </ChipContainer>
      </FormControl>
      <FormControl fullWidth>
        <FormControl fullWidth>
          <InputLabel>Tipo de Empresa</InputLabel>
          <Select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <MenuItem value="SA">SA</MenuItem>
            <MenuItem value="LTDA">LTDA</MenuItem>
            <MenuItem value="MEI">MEI</MenuItem>
          </Select>
        </FormControl>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={filters.noLiability}
            onChange={(e) => setFilters({ ...filters, noLiability: e.target.checked })}
          />
        }
        label="Sócios sem Passivos Judiciais"
      />
      <Button type="submit" variant="contained" color="primary">
        Aplicar regras
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Criação de Regras</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você confirma a criação dessas regras?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Form>
  );
};

export default RuleSubmissionForm;

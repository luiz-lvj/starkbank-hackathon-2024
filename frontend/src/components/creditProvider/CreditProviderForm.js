import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, Chip, InputLabel, FormControl, Box } from '@mui/material';
import { styled } from '@mui/system';

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
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [starkScore, setStarkScore] = useState('');
  const [capitalSocial, setCapitalSocial] = useState('');
  const [markets, setMarkets] = useState(['Agronegócio', 'Saúde', 'Tecnologia']);
  const [locations, setLocations] = useState(['São Paulo', 'Acre', 'Fortaleza']);
  const [companyType, setCompanyType] = useState('');
  const [noJudicialPassives, setNoJudicialPassives] = useState(false);

  const handleMarketDelete = (marketToDelete) => () => {
    setMarkets((markets) => markets.filter((market) => market !== marketToDelete));
  };

  const handleLocationDelete = (locationToDelete) => () => {
    setLocations((locations) => locations.filter((location) => location !== locationToDelete));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para aplicar as regras
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>FORMULÁRIO DE SUBMISSÃO DE REGRAS</h2>
      <TextField
        label="Limite de Valor Emitido (mín.)"
        type="number"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
        fullWidth
      />
      <TextField
        label="Limite de Valor Emitido (máx.)"
        type="number"
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
        fullWidth
      />
      <TextField
        label="StarkScore (0-1000)"
        type="number"
        value={starkScore}
        onChange={(e) => setStarkScore(e.target.value)}
        fullWidth
      />
      <TextField
        label="Capital Social"
        type="number"
        value={capitalSocial}
        onChange={(e) => setCapitalSocial(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Mercado da Empresa</InputLabel>
        <ChipContainer>
          {markets.map((market) => (
            <Chip
              key={market}
              label={market}
              onDelete={handleMarketDelete(market)}
            />
          ))}
        </ChipContainer>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Localidade da Empresa</InputLabel>
        <ChipContainer>
          {locations.map((location) => (
            <Chip
              key={location}
              label={location}
              onDelete={handleLocationDelete(location)}
            />
          ))}
        </ChipContainer>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Tipo de Empresa</InputLabel>
        <Select
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
        >
          <MenuItem value="SA">SA</MenuItem>
          <MenuItem value="LTDA">LTDA</MenuItem>
          <MenuItem value="MEI">MEI</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={noJudicialPassives}
            onChange={(e) => setNoJudicialPassives(e.target.checked)}
          />
        }
        label="Sócios sem Passivos Judiciais"
      />
      <Button type="submit" variant="contained" color="primary">
        Aplicar regras
      </Button>
    </Form>
  );
};

export default RuleSubmissionForm;

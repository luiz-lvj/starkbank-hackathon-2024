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
  const [filters, setFilters] = useState({
    segment: ['Agronegócio', 'Saúde', 'Tecnologia'],
    minimumTpv: '',
    maximumTpv: '',
    minimumInvestmentValue: '',
    maximumInvestmentValue: '',
    socialCapital: '',
    minimumStarkScore: '',
    type: '',
    noLiability: false,
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para aplicar as regras com base em filters
    console.log(filters);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Formulário de Regras</h2>
      <TextField
        label="Limite de Valor Emitido (mín.)"
        type="number"
        value={filters.minimumTpv}
        onChange={(e) => setFilters({ ...filters, minimumTpv: e.target.value })}
        fullWidth
      />
      <TextField
        label="Limite de Valor Emitido (máx.)"
        type="number"
        value={filters.maximumTpv}
        onChange={(e) => setFilters({ ...filters, maximumTpv: e.target.value })}
        fullWidth
      />
      <TextField
        label="StarkScore (mín. 0 - máx. 1000)"
        type="number"
        value={filters.minimumStarkScore}
        onChange={(e) => setFilters({ ...filters, minimumStarkScore: e.target.value })}
        fullWidth
      />
      <TextField
        label="Capital Social"
        type="number"
        value={filters.socialCapital}
        onChange={(e) => setFilters({ ...filters, socialCapital: e.target.value })}
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
        <Select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <MenuItem value="SA">SA</MenuItem>
          <MenuItem value="LTDA">LTDA</MenuItem>
          <MenuItem value="MEI">MEI</MenuItem>
        </Select>
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
    </Form>
  );
};

export default RuleSubmissionForm;

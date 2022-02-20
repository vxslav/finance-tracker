import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import styled from 'styled-components';

export default function BasicDatePicker(props) {
  return (
    <StyledDate>
     <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={props.label}
        value={props.value}
        onChange={date => props.onChange(date)}
        renderInput={(params) => <TextField {...params} />}
        maxDate={new Date()}
      />
    </LocalizationProvider>
    </StyledDate>
   
  );
}

const StyledDate = styled.div`
  margin-top: 8px;
`
import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'
import { useDispatch, useSelector } from 'react-redux';
import delay from './../util';
import { applyAccountFilter, applyCategoryFilter, applyFromDateFilter, applyRangeFilter, applyToDateFilter } from '../redux/actions/filtersActions';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import BasicDatePicker from './DatePicker';

export const ChartDateRangeFilter = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const dispatch = useDispatch();
    return (
        <>
            <BasicDatePicker label="From... " value={startDate} selected={startDate} 
                onChange={date => {
                    dispatch(applyFromDateFilter(date))
                }} />
            <BasicDatePicker label="To..." value={endDate} selected={endDate} 
                onChange={date => {
                    dispatch(applyToDateFilter(date))
                }} />
        </>
    )
}
export const ChartAccountFilter = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [selectedAccount, setSelectedAccount] = useState([]);
    const dispatch = useDispatch();
    const accounts = useSelector(state => state.userData.user.accounts);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedAccount(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        dispatch(applyAccountFilter(selectedAccount));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Filter by Account</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedAccount}
                    onChange={handleChange}
                    input={<OutlinedInput label="Account" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {accounts.map((acc) => (
                        <MenuItem key={acc.name} value={acc.name}>
                            <Checkbox checked={selectedAccount.indexOf(acc.name) > -1} />
                            <ListItemText primary={acc.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );

}
export const ChartCategoryFilter = () => {
    //multiple categories possibl
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const [selectedCategory, setSelectedCategory] = useState([]);
    const dispatch = useDispatch();
    const incomeCategories = useSelector(state => state.userData.user.incomeCategories)
    const expenseCategories = useSelector(state => state.userData.user.expenseCategories);
    const allCategories = [...incomeCategories, ...expenseCategories];

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        dispatch(applyCategoryFilter(selectedCategory));
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Filter By Category</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedCategory}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {allCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                            <Checkbox checked={selectedCategory.indexOf(category) > -1} />
                            <ListItemText primary={category} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );


}

export const ChartRangeFilter = () => {
    //set a range of min-max expense/income

    const [filteredIncomes, setFilteredIncomes] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const dispatch = useDispatch();

    function valuetext(value) {
        return `BGN ${value}`;
    }
    let incomes = useSelector(state => state.userData.user.accounts.map(account => account.incomes));
    let expenses = useSelector(state => state.userData.user.accounts.map(account => account.expenses));
    let amountsIncome = incomes.flat().map(e => Number(e.amount));
    let amountsExpense = expenses.flat().map(e => Number(e.amount));
    const maxI = Math.max(...amountsIncome);
    const maxE = Math.max(...amountsExpense);
    let max = Math.max(maxI, maxE);

    const [value, setValue] = useState([0, max]);
    //a step behing in console log? to be fixed
    const handleChange = (event, newValue) => {
        setValue(newValue);
        let tempArr = incomes.filter(obj => obj.amount >= newValue[0] && obj.amount <= newValue[1]);
        console.log(newValue[0], newValue[1])
        setFilteredIncomes([...tempArr])
        dispatch(applyRangeFilter(newValue[0], newValue[1]));
    }
    const delayedChange = delay(handleChange, 500);
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Amount range'}
                value={value}
                onChange={delayedChange}
                valueLabelDisplay="auto"
                max={max}
                getAriaValueText={valuetext}
            />
        </Box>
    );
}


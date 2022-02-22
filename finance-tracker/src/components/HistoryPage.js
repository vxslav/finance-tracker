import styles from "./styles/pages.module.css";
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import styled from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import { RangeFilter, CategoryFilter, AccountFilter, DateRangeFilter, TypeFilter } from "./chartFilters";
import AddButtons from "./AddButtons";
import { clearFilters } from "../redux/actions/filtersActions";
import SelectInput from "./SelectInput";
import FormDialog from "./FormDialog";
import { removeIncomeExpense } from "../redux/actions/userActions";


export default function HistoryPage() {
    const dispatch = useDispatch();
    const [isFiltered, setIsFiltered] = useState(false);
    const [selectedAccounts, setSelectedAccounts] = useState([]);

    const userAccounts = useSelector(state => state.userData.user.accounts);
    const allIncomes = userAccounts.map(account => account.incomes).flat();
    const allExpenses = userAccounts.map(account => account.expenses).flat();
    const allTransactions = [...allIncomes, ...allExpenses];
    const rangeFilter = useSelector(state => state.filters.range);
    const startDateFilter = useSelector(state => state.filters.from_date);
    const endDateFilter = useSelector(state => state.filters.to_date);
    const categoryFiltered = useSelector(state => state.filters.category);
    const accountFilter = useSelector(state => state.filters.account);
    const typeFilter = useSelector(state => state.filters.type);
    const categoryFilter = categoryFiltered.map(e => e.toLowerCase());
    useEffect(() => {
        let selected = userAccounts.filter(acc => accountFilter.indexOf(acc.name) > -1)
        setSelectedAccounts([...selected])
    }, [accountFilter])
    function filterAll(array) {
        return array.filter(e => categoryFilter.length > 0 ? (categoryFiltered.indexOf(e.category) > -1) : e)
        .filter(e => Number(e.amount) >= rangeFilter[0] && Number(e.amount) <= rangeFilter[1])
        .filter(item => {
            if (startDateFilter) {
            const start = (new Date(startDateFilter)).getTime()
            const end = (new Date(endDateFilter)).getTime()
            const current = (new Date(item.date)).getTime()
            if (start && end) return current >= start && current <= end;
            else return current >= start && current <= (new Date()).getTime();  
        } else return item
        });
    }
   

    const filteredIncomes = filterAll(selectedAccounts.length > 0 ? selectedAccounts.map(acc => acc.incomes) : allIncomes)
    const filteredExpenses = filterAll(selectedAccounts.length > 0 ? selectedAccounts.map(acc => acc.expenses) : allExpenses)
    //console.log(filtered)
    const getTimeString = (timeStamp) => {
        const dateTime = JSON.stringify(timeStamp);
        const dateArr = dateTime.split("T");
        const date = dateArr[0].slice(1);
        const time = dateArr[1].slice(0, 5);
        return `${date} / ${time}`;
    }
    const [description, setDescription] = useState("");

    const confirmChange = (date, descr) => {
        // dispatch(updateItem(description))
        console.log(date, descr)
        setDescription("")
    }
    // const handleDelete = (ident) => {
    //     // dispatch(deleteItem(ident))
    //     console.log(ident)
    // }
    const user = useSelector(state => state.userData.user);
    const [currentAccounts, setCurrenctAccounts] = React.useState([]);

    const handleChange = (accountNames) => {
        setCurrenctAccounts(accountNames);
    }

    let accounts = [];
    // currentAccounts.forEach(accName => {
    //     user.accounts.forEach(acc => {
    //         if (acc.name === accName) {
    //             userAccounts.push(acc);
    //         }
    //     });
    // })

    const handleClick = (id, accountName, isExpense) => {
        dispatch(removeIncomeExpense(user, id, accountName, isExpense));
    }

    return (
        <StyledPage>
            <h2>Transaction history</h2>

            <div>
                <StyledFilters>
                    <h6>Set amount range: </h6>
                    <RangeFilter />

                    <Row>
                        <Column>
                            <CategoryFilter disabled={false} />
                            <TypeFilter />
                            <AccountFilter />
                            <StyledButton onClick={() => {
                                setIsFiltered(true)
                            }}>Filter List
                            </StyledButton>
                        </Column>
                        <Column >
                            <DateRangeFilter />
                            <StyledButton onClick={() => {
                                setIsFiltered(false)
                                dispatch(clearFilters)
                            }}>Clear Filters
                            </StyledButton>
                        </Column>
                    </Row>

                </StyledFilters>

                <table>
                    <thead>
                        <tr key="thead">
                            <th key='amount'>Amount</th>
                            <th key='type'>Type</th>
                            <th key='category'>Category</th>
                            <th key='descr'>Description</th>
                            <th key='date'>Date/Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <div className={styles.page}>
         <h1>HistoryPage</h1>
         <AddButtons/>

         <SelectInput handleChange={handleChange} accounts={user.accounts}/>
         <div>
             {accounts.map(acc => {
                return acc.expenses.map(exp => {
                     return (
                        <>
                            <h1>Expense: {exp.description} {exp.amount}</h1>
                            <FormDialog operation="edit" value="Expense" prevAccountName={acc.name} expenseID={exp.id}/>
                            <button onClick={() => handleClick(exp.id, acc.name, true)}> Remove </button>
                        </>
                     ); 
                 })
                 
             })}

            {accounts.map(acc => {
                return acc.incomes.map(inc => {
                    return (
                        <>
                            <h1>Incomes: {inc.description} {inc.amount}</h1>
                            <FormDialog operation="edit" value="Income" prevAccountName={acc.name} incomeID={inc.id}/>
                            <button onClick={() => handleClick(inc.id, acc.name, false)}> Remove </button>
                        </>
                    );
                })
             })} */}

                    {(selectedAccounts.length > 0 ? selectedAccounts : userAccounts).map(account => {
                        return (
                            <>
                                <tr key={account.name} className={styles.accountName}><td colSpan="6">{account.name}</td></tr>
                                {(typeFilter.indexOf("Income") > -1) &&
                                    (isFiltered ? filteredIncomes : account.incomes).map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td key={item.amount+item.id}>{item.amount}</td>
                                            <td key={item.id+"income"}>Income</td>
                                            <td key={item.category+item.id}>{item.category}</td>
                                            <td key={item.description+item.id}><StyledInput
                                                name="description"
                                                defaultValue={item.description}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        confirmChange(item.date, description)
                                                    }
                                                }}
                                                onChange={(e) => setDescription(e.target.value)} />
                                            </td>
                                            <td key={item.date+item.id}>{item.date}</td>
                                        </tr>
                                    )
                                })
                                } 
                                {(typeFilter.indexOf("Expense") > -1) &&
                                 (isFiltered ? filteredExpenses : account.expenses).map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td key={item.amount+item.id}>{item.amount}</td>
                                            <td key={item.id+"expense"}>Expense</td>
                                            <td key={item.category+item.id}>{item.category}</td>
                                            <td key={item.description+item.id}><StyledInput
                                                name="description"
                                                defaultValue={item.description}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        confirmChange(item.date, description)
                                                    }
                                                }}
                                                onChange={(e) => setDescription(e.target.value)} />
                                            </td>
                                            <td key={item.date+item.id}>{item.date}</td>
                                        </tr>
                                    )
                                })   
                                }
                            </>
                        )
                    })}
                    </tbody>
                </table>
            </div >
        </StyledPage>
    );
}
export const StyledPage = styled.div`
    width: 70%;
    margin: -60px auto 30px ;
    text-align: center;
`
export const Column = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
`
export const Row = styled.div`
    display: flex;
    flex-flow : row wrap;
    justify-content : space-between;
    gap: 20px;
`
export const StyledFilters = styled.div`
    margin-top: 40px;
    display: flex;
    flex-flow : column wrap;
    justify-content: space-evenely;
    align-items: center;    
`

export const StyledButton = styled.button`
    width: 100%;
    margin: 10px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px 0;
    color: #0267CD;
    background-color : white;
    border: 1px solid #0267CD;
    &:hover {
        background-color : #0268cd10;
    }
`

const StyledInput = styled.input`
    border : none;
    outline : none;
    background-color: transparent;
    width: 400px;

`

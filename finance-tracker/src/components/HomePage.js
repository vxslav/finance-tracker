import React from "react";
import AddButtons from "./AddButtons";
import AddCategoryBTN from './AddCategoryBTN';
import AddGoalButton from './AddGoalButton';
import AddAccountBTN from './AddAccountBTN'
import styled from 'styled-components';
import styles from './styles/total_box.module.css';
import TotalBox from "./TotalBox";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Button from '@mui/material/Button';
import LegendField from "./LegendField";
import { getColor } from "../utils/util";
import RecentHistoryTable from "./RecentHistoryTable";
import TotalBoxTest from "./TotalBoxTest";
import { Heading, StyledPage } from "./HistoryPage";
import FormDialog from './FormDialog';
import { Account } from './AccountItem';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
    //true -> incomes / false -> expenses
    const user = useSelector(state => state.userData.user);
    const [toggle, setToggle] = React.useState(true);
    const dataMap = new Map();

    const handleClick = () => {
        setToggle(prev => !prev);
    }

    if(toggle){
        //in case of incomes
        user.accounts.forEach(acc => {
            acc.incomes.forEach(inc => {
                if(dataMap.has(inc.category)){
                    dataMap.set(inc.category, {...dataMap.get(inc.category), amount: dataMap.get(inc.category) + Number(inc.amount)});
                }
                else{
                    dataMap.set(inc.category, {amount: Number(inc.amount), color: getColor(user, inc.category, "income")});
                }
            })
        })
    } 
    else{
        //in case of expenses
        user.accounts.forEach(acc => {
            acc.expenses.forEach(exp => {
                if(dataMap.has(exp.category)){
                    dataMap.set(exp.category, {...dataMap.get(exp.category), amount: dataMap.get(exp.category) + Number(exp.amount)});
                }
                else{
                    dataMap.set(exp.category, {amount: Number(exp.amount), color: getColor(user, exp.category, "expense")});
                }
            })
        })
    }
    let labels = Array.from(dataMap.keys());
    let data = Array.from(dataMap.values()).map(data => data.amount);
    let colors = Array.from(dataMap.values()).map(data => data.color);
    const metaData = {
        labels,
        datasets: [
          {
            label: toggle ? "Income Chart" : "Expense Chart",
            data,
            backgroundColor: colors,
          }
        ],
      };
    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    }
    let br = 0;
    return (
        <StyledPage>
            <Heading>Welcome, {user.firstName}</Heading>
            <Row>
                <ColumnWrapper>
                    <TotalBoxTest/>
                    <RecentHistoryTable/>
                </ColumnWrapper>

                <ColumnWrapper>
                <Widget>

                    <ChartWrapper onClick={handleClick}>
                        <Pie data={metaData} options={options} />
                    </ChartWrapper>
                </Widget>
                <Widget>
                    {colors.map(color => {
                            return (<LegendField key={br} label={labels[br++]} color={color}/>);
                        })}
                </Widget>
                <Widget>
                    <ButtonsWrapper>
                        <AddButtons />
                        <AddCategoryBTN />
                        <AddGoalButton sx={{ backgroundColor : 'purple' }} title="Add Goal" />
                        <AddAccountBTN />
                        <FormDialog value="Budget" title="Add Budget" />
                    </ButtonsWrapper>
                    
                    </Widget>
           
          
            </ColumnWrapper>
              
                <div className={styles.legendContainer}>
                    {/* <Button className="w-200" onClick={handleClick} variant="contained" color={!toggle ? "success" : "error"}>{!toggle ? "Check Incomes" : "Check Expenses"}</Button> */}
                </div>
        </Row>
        </StyledPage> 
    )
}

const Widget = styled(Account)`
    margin: 0;
    padding: 20px;
    border-radius: 5px;
`
const Row = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content : space-between;
`
const ColumnWrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
`
const ButtonsWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content : flex-start;
    gap :10px;
`
const TableWrapper = styled.div`
`
const ChartWrapper = styled.div`
    height: 300px;
    width:300px;
    margin-left: auto;
    margin-right: auto;
`
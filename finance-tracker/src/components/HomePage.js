import React from "react";
import AddButtons from "./AddButtons";
import styled from 'styled-components';
import styles from './styles/total_box.module.css';
import TotalBox from "./TotalBox";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { randomColor } from "randomcolor"; 
import LegendField from "./LegendField";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
    //true -> incomes / false -> expenses
    const user = useSelector(state => state.userData.user);
    const [toggle, setToggle] = React.useState(true);
    const dataMap = new Map();
    
    if(toggle){
        //in case of incomes
        user.accounts.forEach(acc => {
            acc.incomes.forEach(inc => {
                if(dataMap.has(inc.category)){
                    dataMap.set(inc.category, dataMap.get(inc.category) + Number(inc.amount))
                }
                else{
                    dataMap.set(inc.category, Number(inc.amount));
                }
            })
        })
    } 
    else{
        //in case of expenses
        user.accounts.forEach(acc => {
            acc.expenses.forEach(exp => {
                if(dataMap.has(exp.category)){
                    dataMap.set(exp.category, dataMap.get(exp.category) + Number(exp.amount))
                }
                else{
                    dataMap.set(exp.category, Number(exp.amount));
                }
            })
        })
    }

    const labels = Array.from(dataMap.keys());
    const data = Array.from(dataMap.values())
    const colors = Array.from(data.values()).map(el => randomColor());

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
        <HomePage>
            
            <div className={styles.overAllContainer}>
                <div className={styles.containerBoxAll}>
                    <div className={styles.containerBoxTwo}>
                        <TotalBox name="balance"/>
                        <TotalBox name="transactions"/>               
                    </div>
                    <div className={styles.containerBoxTwo}>
                        <TotalBox name="incomes"/>
                        <TotalBox name="expenses"/>
                    </div>
                </div>
            </div>
            <div className={styles.pieContainer}>
                <div className={styles.pie}>
                    <Pie data={metaData} options={options} />
                </div>
                <div className={styles.legendContainer}>
                    {
                        colors.map(color => {
                            return (<LegendField key={br} label={labels[br++]} color={color}/>);
                        })
                    }   
                    <AddButtons/>
                </div>
                
            </div>
        
        </HomePage>

    )
}
const HomePage = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
import { basicIncomeCategories, basicExpenseCategories } from "../../utils/consts";
import { incomeArr } from '../mock-data/mock-income';
import { expenseArr } from '../mock-data/mock-expense';
import { budgetArr } from '../mock-data/mock-budget';
import { ADD_EXPENSE,
    ADD_GOAL,
    ADD_INCOME,
    ADD_BUDGET,
    ADD_CATEGORY_INCOME,
    ADD_CATEGORY_EXPENSE,
    CLEAR_GOALS,
    LOGIN,
    LOGOUT,
    EDIT_CATEGORY_EXPENSE,
    EDIT_CATEGORY_INCOME,
    UPDATE_ACCOUNTS,
    EDIT_ACCOUNT,
    EDIT_INCOME,
    EDIT_EXPENSE
} from '../actions/userActions';
const INITIAL_STATE = {
    logged: true,
    user: {
        email: "vasko47@abv.bg",
        categories : [],
        accounts: [
            {
                name: "Main Account",
                budgets: [],
                expenses: [
                    {
                        date: "2022-01-10T08:57:43.000Z",
                        amount: "200",
                        category: "Entertainment",
                        descr: "Video player"
                    },
                    {
                        date: "2021-12-29T08:57:43.000Z",
                        amount: "290",
                        category: "Books",
                        descr: "Sound recorder"
                    },
                    {
                        date: "2022-03-05T08:57:43.000Z",
                        amount: "1200",
                        category: "Studies",
                        descr: "a funny course"
                    },
                ],
                incomes: [
                    {
                        date: "2022-03-12T08:57:43.000Z",
                        amount: "1200",
                        category:"Initial Desposit",
                        descr: "Initial App Deposit"
                    },
                    {
                        date: "2022-01-12T08:57:43.000Z",
                        amount: "2000",
                        category: "Salary",
                        descr: "finally payday"
                    },
                ],
                goals: []
            },
            {
                name: "Second Account",
                budgets: budgetArr,
                expenses: expenseArr,
                incomes: incomeArr,
                goals: []
            }
        ],
        incomeCategories: basicIncomeCategories,
        expenseCategories: basicExpenseCategories,
        birthdate: "2001-11-09",
        firstName: "Васил",
        lastName: "Любенов",
        id: "38cQLPYsrIzBBkRnpugS"
    }
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            // add localStorage or sessionStorage token 
            return {
                ...state,
                logged: true,
                user: {
                    ...action.payload
                }
            }
        case LOGOUT:
            // localStorage.removeItem("logged");
            return {
                ...state,
                logged: false,
                user: {}
            }
        // case ADD_INCOME: {
        //     const currentAccount = state.user.accounts.find(acc =>
        //         acc.name === action.payload.account)
        //     currentAccount.incomes.unshift(action.payload)
        case ADD_INCOME :
            // console.log([...action.payload]); 
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts : [...action.payload]
                }
    
            }    
        case ADD_EXPENSE :
            // console.log([...action.payload]); 
            return {
                ...state,
                user : {
                    ...state.user,
                    accounts : [...action.payload]
                }
            }   
        case ADD_BUDGET : 
            return {
                
                ...state,
                user : {
                    ...state.user,
                    budgets : [...state.user.budgets, action.payload]
                }
            }    
        case ADD_GOAL : 
            return {
                ...state,
                user : {
                    ...state.user,
                    goals : [...state.user.goals, action.payload]
                }
            }
        case ADD_CATEGORY_INCOME:
            return {
                ...state,
                user: {
                    ...state.user,
                    incomeCategories: [...state.user.incomeCategories, action.payload.name],
                    categories: [...state.user.categories, action.payload]
                }
            }
        case ADD_CATEGORY_EXPENSE:
            return {
                ...state,
                user: {
                    ...state.user,
                    expenseCategories: [...state.user.expenseCategories, action.payload.name],
                    categories: [...state.user.categories, action.payload]
                }
            }   
        case EDIT_CATEGORY_EXPENSE : 
            return {
                ...state,
                user : {
                    ...state.user,
                    expenseCategories: action.payload.expenseCategories,
                    incomeCategories: action.payload.incomeCategories,
                    categories: action.payload.categories
                }
            } 
        case EDIT_CATEGORY_INCOME : 
            return {
                ...state,
                user : {
                    ...state.user,
                    incomeCategories: action.payload.incomeCategories,
                    expenseCategories: action.payload.expenseCategories,
                    categories: action.payload.categories
                }
            } 
        case UPDATE_ACCOUNTS : 
            return {
                ...state,
                user : {
                    ...state.user,
                    accounts: [...action.payload]
                }
            } 

        case EDIT_ACCOUNT:
            return {
                ...state,
                user : {
                    ...state.user,
                    accounts: [...action.payload]
                }
            }

        case CLEAR_GOALS : 
            return {
                ...state,
                user : {
                    ...state.user,
                    goals : []
                }
            }
       
        default : 
            return state;
    }
}
import { ADD_EXPENSE, ADD_GOAL, ADD_INCOME, ADD_BUDGET, ADD_CATEGORY_INCOME, ADD_CATEGORY_EXPENSE, CLEAR_GOALS, LOGIN, LOGOUT, EDIT_CATEGORY_EXPENSE, EDIT_CATEGORY_INCOME } from '../actions/userActions';
import { basicIncomeCategories, basicExpenseCategories } from "../../utils/consts";
import { incomeArr } from '../mock-data/mock-income';
import { expenseArr } from '../mock-data/mock-expense';
import { budgetArr } from '../mock-data/mock-budget';

const INITIAL_STATE = {
    logged: true,
    user: {
        email: "vasko47@abv.bg",
        categories: [{
            name : "swimming",
            type: "expense"
        },
        {
            name : "books",
            type : "expense"
        },
        {
            name : "furniture",
            type : "expense"
        },
        {
            name : "Initial Desposit",
            type : "income"
        }],
        accounts: [
            {
                name: "Main Account",
                budgets: [],
                expenses: [
                    {
                        date: "2022-01-10T08:57:43.000Z",
                        amount: "200",
                        category: { name : "Entertainment", type : "expense"},
                        descr: "Video player"
                    },
                    {
                        date: "2021-12-29T08:57:43.000Z",
                        amount: "290",
                        category: { name : "Books", type : "expense"},
                        descr: "Sound recorder"
                    },
                    {
                        date: "2022-03-05T08:57:43.000Z",
                        amount: "1200",
                        category: { name : "Studies", type : "expense"},
                        descr: "a funny course"
                    },
                ],
                incomes: [
                    {
                        date: "2022-03-12T08:57:43.000Z",
                        amount: "1200",
                        category: { name : "Initial Desposit", type : "income"},
                        descr: "Initial App Deposit"
                    },
                    {
                        date: "2022-01-12T08:57:43.000Z",
                        amount: "2000",
                        category: { name : "Salary", type : "income"},
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
        case ADD_INCOME: {
            const currentAccount = state.user.accounts.find(acc =>
                acc.name === action.payload.account)
            currentAccount.incomes.unshift(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts: [
                        ...state.user.accounts
                    ]
                }
            }
        }
        case ADD_EXPENSE: {
            const currentAccount = state.user.accounts.find(acc =>
                acc.name === action.payload.account)
            currentAccount.expenses.unshift(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts: [
                        ...state.user.accounts
                    ]
                }
            }
        }
        case ADD_BUDGET: {
            const currentAccount = state.user.accounts.find(acc =>
                acc.name === action.payload.account)
            currentAccount.budgets.unshift(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts: [
                        ...state.user.accounts
                    ]
                }
            }
        }
        case ADD_GOAL: {
            const currentAccount = state.user.accounts.find(acc =>
                acc.name === action.payload.account)
            currentAccount.goals.unshift(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts: [
                        ...state.user.accounts
                    ]
                }
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
import { basicIncomeCategories, basicExpenseCategories } from "../../utils/consts";
import { incomeArr } from '../mock-data/mock-income';
import { expenseArr } from '../mock-data/mock-expense';
import { budgetArr } from '../mock-data/mock-budget';
import { ADD_EXPENSE,
    ADD_GOAL,
    ADD_INCOME,
    UPDATE_BUDGET,
    ADD_CATEGORY_INCOME,
    ADD_CATEGORY_EXPENSE,
    CLEAR_GOALS,
    LOGIN,
    LOGOUT,
    EDIT_CATEGORY_EXPENSE,
    EDIT_CATEGORY_INCOME,
    UPDATE_ACCOUNTS,
    EDIT_ACCOUNT,
} from '../actions/userActions';
const INITIAL_STATE = {
    logged: false,
    user: {
        email: "vasko47@abv.bg",
        categories : [],
        accounts: [
            {
                name: "main",
                expenses: [],
                incomes: [
                    {
                        date: "2022-01-07T08:57:43.000Z",
                        amount: "123",
                        category: "Initial Deposit",
                        description: "Initial App Deposit",
                        id: 1
                    },
                    {
                        date: "2022-02-17T08:57:43.000Z",
                        amount: "123",
                        category: "Initial Deposit",
                        description: "Initial App Deposit",
                        id: 12
                    }
                ],
                goals: []
            },
            {
                name: "sub-zero",
                expenses: [],
                incomes: [
                    {
                        date: "2021-12-29T08:57:43.000Z",
                        amount: "290",
                        category: "Books",
                        description: "Sound recorder",
                        id : 123123
                    },
                    {
                        date: "2022-03-05T08:57:43.000Z",
                        amount: "1200",
                        category: "Initial Deposit",
                        description: "Initial App Deposit",
                        id: 2
                    }
                ],
                goals: []
            },
            {
                name: "schmain",
                expenses: [],
                incomes: [
                    {
                        date: "2021-03-05T08:57:43.000Z",
                        amount: "10",
                        category: "Initial Deposit",
                        description: "Initial App Deposit",
                        id: 3
                    }
                ],
                goals: []
            }
        ],
        budgets: [],
        incomeCategories: basicIncomeCategories,
        expenseCategories: basicExpenseCategories,
        birthdate: "2001-11-09",
        firstName: "Васил",
        lastName: "Любенов",
        id: "38cQLPYsrIzBBkRnpugS"
    }
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN : 
            return {
                ...state,
                logged: true,
                user: {
                    ...action.payload
                }
            }
        case LOGOUT : 
            localStorage.removeItem("currentUser");
            sessionStorage.removeItem("currentUser");
            return {
                ...state,
                logged: false,
                user: {}
            }
        case ADD_INCOME :
            return {
                ...state,
                user: {
                    ...state.user,
                    accounts : [...action.payload]
                }
    
            }    
        case ADD_EXPENSE : 
            return {
                ...state,
                user : {
                    ...state.user,
                    accounts : [...action.payload]
                }
            }   
        case UPDATE_BUDGET : 
            return {
                
                ...state,
                user : {
                    ...state.user,
                    budgets : [...action.payload]
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
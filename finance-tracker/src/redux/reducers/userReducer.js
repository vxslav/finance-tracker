import { LOGIN, LOGOUT } from '../actions/userActions';

const INITIAL_STATE = {
    logged: false,
    email : null,
    income : [],
    expenses : [],
    goals : [],
    total : 0
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN : 
            return {
                ...state,
                logged : true,
                email : action.payload.email,
                income : action.payload.income,
                expenses : action.payload.expenses,
                goals : action.payload.goals,
                total : action.payload.total
            }
        case LOGOUT : 

    }
}
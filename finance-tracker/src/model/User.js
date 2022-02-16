export default class User {
    constructor(id, firstName, lastName, email, password, birthDate, currency) {
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.password = password,
        this.birthDate = birthDate,
        this.currency = currency,
        this.income = [],
        this.expense = [],
        this.savings = [];
    }
    
}

class UserHandler {
    constructor() {
        this.users = []
    }

    rememberLogin(email, password) {
        let user = this.users.find(u => u.email === email && u.password === password);
        localStorage.setItem('logged', user.id);
    }
    forgetLogin(email, password) {
        let user = this.users.find(u => u.email === email && u.password === password);
        sessionStorage.setItem('logged', user.id);
    }
    logout() {
        localStorage.getItem('logged') ? localStorage.removeItem("logged") : null;
        sessionStorage.getItem('logged') ? sessionStorage.removeItem('logged') : null;
    }
}
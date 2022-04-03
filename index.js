const fs = require('fs');
const readlineSync = require('readline-sync');

const calculateSalary = (employee) => { 
    const { basic, bonus, stock } = employee.salary
    return (basic + bonus + stock)
};

const getSalaryById = (workerMapById) => {
    // Wait for user's response.
    let id = readlineSync.question('\nPlease enter ID:\n');
    
    const worker = workerMapById[id] // databases.find(worker => worker.id === id)
    if (worker) {
        console.log(`\nThe total salary of an employee with id ${id} is: ${calculateSalary(worker)}\n`);
    } else {
        console.log(`ID number ${id} does not exist\n`);    
    }   
}

const getSalaryByCity = (workerList) => {
    // Wait for user's response.
    let city = readlineSync.question('\nPlease enter city:\n');
    let exist = false;
    console.log(`Salaries of all employees that living in ${city}:\n`);
    for(let db of workerList) {
        if(db.city == city) {
            console.log(`The employee ${db.firstName} ${db.lastName} getting ${calculateSalary(db)}$\n`);
            exist = true;
        }
    }
    if(exist === false)
        console.log(`There are no workers in ${city}`);    
}

const getSalaryAbove = (workerList) => {
    let salary;
    while(true)
    {
        // Wait for user's response.
        salary = readlineSync.question('\nPlease enter salary:\n');
        if(isNaN(salary)) {
            console.log(`Invalid input. Please try again!\n`);  
        }
        else{
            break;
        }
    }

    let exist = false;
    console.log(`\nSalaries of all employees that earn above ${salary}$:\n`);
    for(let db of workerList) {
        if(calculateSalary(db) >= salary) {
            console.log(`The employee ${db.firstName} ${db.lastName} getting ${calculateSalary(db)}$\n`);
            exist = true;
        }
    }
    if(exist === false)
        console.log(`There are no workers that earn above ${salary}`);    
}



/**********************************   MAIN   **********************************/

console.log("\n***** Welcome to worker management system! *****\n");
let workerMapById = { }

//read JSON object from file
fs.readFile('workers.json', 'utf-8', (err, data) => {
    let workerList;
    if(err) {
        console.err('Error reading file from disk: ${err}');
    } else {
        //parse JSON string to JSON object
        workerList = JSON.parse(data);

        workerList.forEach(worker => workerMapById[worker.id] = worker)
    }

    while(true)
    {
        // Wait for user's response.
        selectedChoose = readlineSync.question('Please input number to continue:\n0 - Exit\n1 - Get total salary by id\n2 - Get all the employees and their salaries in specific city\n3 - Get all the employees that earn above a specific salary\n\n');

        switch(selectedChoose) {
            case '0': 
                console.log("\nBye Bye...\n");
                return;
            case '1':
                getSalaryById(workerMapById);
                break;
            case '2':
                getSalaryByCity(workerList);
                break;
            case '3':
                getSalaryAbove(workerList);
                break;
            default:
                console.log(`Sorry, invalid input. Please try again`);
        }

        readlineSync.question();
    }       
});


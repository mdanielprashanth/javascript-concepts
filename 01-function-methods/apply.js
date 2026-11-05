const employee = {
    name: "Daniel",
    basicSalary: 50000,
    bonus: 10000,
    allowance: 5000
};

const employee2 = {
    name: "Bruce",
    basicSalary: 70000,
    bonus: 15000,
    allowance: 10000
};

function calculateSalary(basicSalary, allowance,bonus){
  return {
    employee : this.name,
    "Total Salary": basicSalary + allowance + bonus
  };
}

const result1  = calculateSalary.apply(employee, [employee.basicSalary, employee.allowance, employee.bonus]);
console.log(result1);

const result2  = calculateSalary.apply(employee2, [employee2.basicSalary, employee2.allowance, employee2.bonus]);
console.log(result2);

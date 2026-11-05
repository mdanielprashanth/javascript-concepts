const employee = {
    name: "Daniel",
    role: "Senior Software Engineer",

    getDetails: function () {
        console.log(`Employee: ${this.name}`);
        console.log(`Role: ${this.role}`);
    }
};

function executeCallback(callback) {
    callback();
}

// executeCallback(employee.getDetails)
let result = employee.getDetails.bind(employee);
// executeCallback(result)

// employee.getDetails()



function calculateProjectCost(developmentCost, testingCost, deploymentCost) {
    return developmentCost + testingCost + deploymentCost;
}

const projectResult = calculateProjectCost.bind(null, 50000, 15000)

console.log(projectResult(5000));
console.log(projectResult(10000));

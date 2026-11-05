const employee1 = {
    name: "Daniel",
    role: "Senior Software Engineer",
    company: "Altimetrik"
};

const employee2 = {
    name: "Bruce",
    role: "Backend Developer",
    company: "TCS"
};

function introduceEmployee(experience){
return `Hi, I am ${this.name}. I work as a ${this.role} at ${this.company}. I have ${experience} years of experience.`;
}

introduceEmployee.call(employee1, 5);
introduceEmployee.call(employee2, 3);
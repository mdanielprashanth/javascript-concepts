// async function displayEmployee() {
//     const employeeObj = await getEmployee();
//     console.log(employeeObj);
// }

// displayEmployee();

function getEmployee() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 2,
        name: "Daniel",
        role: "Senior Software Engineer",
      });
    }, 1000);
  });
}

function getProjects(empid) {
    
  let array = [
        { id: 1, name: "QuoteAI", status: "Active" },
        { id: 2, name: "Employee Portal", status: "Completed" },
        { id: 3, name: "Learning Management System", status: "Active" },
      ];   

  return new Promise((resolve, reject) => {
    if (empid !== 1) {
      reject("Projects not found");
      return;
    } 
    setTimeout(() => {
      resolve(
        array.filter((employeeId) => employeeId.id === empid)
      );
    }, 1000);
  });
}

async function displayEmployeeDetails() {
  
  try {
    const employeeObj = await getEmployee();
    console.log(employeeObj['id']);
    const project = await getProjects(employeeObj['id']);
    console.log(project);
  } catch (error) {
    console.error(error)
  }

}

// displayEmployeeDetails()

//final 
let orders  = ["Order 1", "Order 2"];

let items = {"Order 1": { item: "Laptop", price: 50000 }}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getUser(userId) {
  await delay(1000);
  return {id: userId, name:'Daniel'}
  
}

async function getOrders(user){
  await delay(1000);
  if(user.id === 101) return orders;
  
  throw new Error("Orders not found");
}

async function getOrderDetails(order) {
  await delay(1000);
  return items[order]
}

async function displayOrderDetails() {
  try {
   const result1 = await getUser(103);
   console.log(result1);
   const result2 = await getOrders(result1)
   console.log(result2);
   const result3 = await getOrderDetails(result2[0])
   console.log(result3);

  } catch (error) {
    console.error(error)
  }
  finally {
    console.log("Order processing completed");
  }
}

displayOrderDetails();
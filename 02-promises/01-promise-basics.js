const employee = {
    id: 101,
    name: "Daniel",
    role: "Senior Software Engineer"
}

// const employee = null;

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
       if(!employee) {
        reject("Employee not found");
        return;
    }
       resolve(employee)
    }, 2000)
})

promise.then((employee)=>{
  console.log(employee)
}).catch((e)=> console.log(e))


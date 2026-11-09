// getUser() – resolves with { id: 101, name: "Daniel" } after 2 seconds.
function getUser() {
    const userDetail =  { id: 101, name: "Daniel" };
    return new Promise((resolve)=>{
       setTimeout(()=>{
        // console.log("User API completed");
        resolve(userDetail)
       }, 2000)
    })
}

// getOrders() – resolves with ["Order 1", "Order 2"] after 1 second.
function getOrders() {
    const orders =   ["Order 1", "Order 2"];
    return new Promise((resolve,reject)=>{
       setTimeout(()=>{
        // resolve(orders)
        // console.log("Orders API failed");
        reject("Orders API failed");
       }, 1000)
    })
}

// getPayments() – resolves with ["Payment 1", "Payment 2"] after 3 seconds.
function getPayments() {
    const payments = ["Payment 1", "Payment 2"];
    return new Promise((resolve)=>{
       setTimeout(()=>{
        // console.log("Payments API completed");
        resolve(payments)
       }, 3000)
    })
}

// Promise.all 
// const result  = Promise.all([getUser(), getOrders(), getPayments()])

// Promise.allSettled
// const result  = Promise.allSettled([getUser(), getOrders(), getPayments()])

// Promise.race
// const result  = Promise.race([getUser(), getOrders(), getPayments()])

// Promise.any
const result  = Promise.any([getUser(), getOrders(), getPayments()])
result.then((data)=>{
    console.log(data);
}).catch((err)=> console.error(err))

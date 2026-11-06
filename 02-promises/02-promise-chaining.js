function getUser(userId){
    return new Promise((resolve)=>{
        setTimeout(()=>{
        resolve({ id: userId, name: "Daniel" })
        }, 1000)
    })
}

function getOrders(user){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
        if(user.id === 101){
            resolve(["Order 1", "Order 2"])
        }else{
            reject("Orders not found")
        }   
       
        }, 1000)
        console.log(`${user.name}'s order is being fetched`);
    })
}

function getOrderDetails(order){
    return new Promise((resolve)=>{
        setTimeout(()=>{
        resolve({ item: "Laptop", price: 50000 })
        }, 1000)
    })
}

getUser(102)
    .then((user) => {
        return getOrders(user)
    })
    .then((order) => {
        return getOrderDetails(order)
    })
    .then((details) => {
        console.log(details);
    })
    .catch((error) => {
        console.log(error);
    }).finally(() => {
        console.log("Promise execution completed");
    });
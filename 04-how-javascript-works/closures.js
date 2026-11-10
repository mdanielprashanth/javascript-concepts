function createFunctions() {
    var functions = [];

    for (var i = 0; i < 3; i++) {
        (function (i) { functions.push(function () {
                        console.log(i);
                    })}
        )(i);
        
        
    }

    return functions;
}

const result = createFunctions();

result[0]();
result[1]();
result[2]();


function bankAccount(initialBalance) {
    let balance = initialBalance; - 1000 + 500

    return {
        deposit: function (amount) {
            balance += amount;
            console.log("Balance:", balance);
        },

        withdraw: function (amount) {
            balance -= amount;
            console.log("Balance:", balance);
        }
    };
}

const account = bankAccount(1000);

account.deposit(500);
account.withdraw(200);

console.log(account.balance);
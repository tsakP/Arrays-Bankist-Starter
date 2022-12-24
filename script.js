'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
};

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  })
};
createUsernames(accounts); // stw 

const updateUI = function(acc) {
  // Display movements
    displayMovements(acc.movements);
    // Display balance
    calcDisplayBalance(acc);
    // Display summary
    calcDisplaySummary(acc);
}

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const ammount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if(
    ammount > 0 
    && receiverAcc
    && currentAccount.balance >= ammount 
    && receiverAcc.username !== currentAccount.username
    ) {
      // Doing the transfer
      currentAccount.movements.push(-ammount);
      receiverAcc.movements.push(ammount);

      // Update UI
      updateUI(currentAccount);
    }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// * Coding Challenge #1

/* const data1  = {
  julia: [3, 5, 2, 12, 7],
  kate: [4, 1, 15, 8, 3],
}

const data2  = {
  julia: [9, 16, 6, 8, 3],
  kate: [10, 5, 6, 1, 4],
}

const checkDogs = function(dogsJulia, dogsKate) {
  // const dogsJuliaCorrected = dogsJulia.slice(1, dogsJulia.length - 2);
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  const dogs = dogsJuliaCorrected.concat(dogsKate);

  dogs.forEach(function(age, i, _) {
    if (age >= 3) {
      console.log(`Dog number ${i+1} is an adult, and is ${age} years old`);
    } else {
      console.log(`Dog number ${i+1} is still a puppy 🐶`);
    }
  });
}

checkDogs(data1.julia, data1.kate);
checkDogs(data2.julia, data2.kate); */
/////////////////////////////////////////////////

/////////////////////////////////////////////////
// * Coding Challenge #2
/* const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4]; */

/* const  calcAverageHumanAge = function(ages) {
  const adultsHumanAges = ages
    .map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
    .filter(dogHumanAge => dogHumanAge >= 18);
  const averageHumanAge = adultsHumanAges
    .reduce((acc, cur) => acc + cur, 0) / adultsHumanAges.length;
  //  const averageHumanAgeAlternative = adultsHumanAges
  //   .reduce((acc, cur) => acc + cur / adultsHumanAges.length, 0);
  //    OR
  //   .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
     
  return averageHumanAge;
}; */

// * Coding Challenge #3
/* const  calcAverageHumanAge = ages =>
  ages
    .map(dogAge => dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4)
    .filter(dogHumanAge => dogHumanAge >= 18)
    .reduce((acc, cur, _, arr) => acc + cur / arr.length, 0);

console.log(calcAverageHumanAge(data1), calcAverageHumanAge(data2)); 
*/

/////////////////////////////////////////////////
// LECTURES

    const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]); 

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; 
/////////////////////////////////////////////////
// The find Method
// the find methods returns the first element which satisfies the condition
/* const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); */

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// The magic of chaining methods

/* const eurToUsd = 1.1;
console.log(movements);
// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd})
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD); */

/////////////////////////////////////////////////

/////////////////////////////////////////////////
// The filter Method

/* const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); */

/////////////////////////////////////////////////

/////////////////////////////////////////////////
// The reduce Method

// const balance = movements.reduce(function(acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc} + ${cur}`);
//   return acc + cur; //acc is the previous value to which cur is added in each iteration
// }, 0); // the second value is the initial value of the acc in the first iteration

/* const balance = movements.reduce((acc, cur, i) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc >= mov) return acc;
  else return mov;
}, movements[0]);
console.log(max); */
/////////////////////////////////////////////////
// The map Method

/* const eurToUsd = 1.1;

// const movementsUSD = account1.movements.map(function(mov) {
//   return mov * eurToUsd;
// });

const movements = account1.movements;

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
);
console.log(movementsDescriptions); */
/////////////////////////////////////////////////
// Simple Array Methods

/* let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log(arr.slice([...arr]));

// SPLICE deletes the selected elements and mutates the original array
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2)
console.log(arr);

// REVERSE it mutates the original array with the reversion
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log(...arr, ...arr2);

// JOIN
console.log(letters.join(' - ')); */

///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
// The at Method

/* const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

// getting last array element
console.log(arr[arr.length -1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('petros'.at(2)); */
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
/* // Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// FOR OF
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('\n-----FOREACH-----\n ');
//  forEach does not allow to break or continue the loop
movements.forEach(function(movement, index, array) {
  if (movement > 0) {
    console.log(`Movement ${index+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index+1}: You withdrew ${Math.abs(movement)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...
 */
/* 
// forEach with Maps and Sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// The underscore (_) in JS means a throwaway variable which is a completely unnecessary
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
 */
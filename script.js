'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

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

const timerOut = document.querySelector('.timer');
console.log(timerOut);

const userDisplay = function (acc, sort = false) {
  containerTransactions.innerHTML = '';

  const transact = sort
    ? acc.transactions.slice().sort((x, y) => y - x)
    : acc.transactions;
  transact.forEach((value, index) => {
    const withdrawalOrDeposit = value > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.transactionsDates[index]);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const transRow = `
      <div class="transactions">
        <div class="transactions__row">
          <div class="transactions__type transactions__type--${withdrawalOrDeposit}">
           ${index + 1} ${withdrawalOrDeposit}
          </div>
          <div class="transactions__date">${day}/${month}/${year}</div>
          <div class="transactions__value">${value}</div> 
        </div>  
      </div>
      `;
    containerTransactions.insertAdjacentHTML('beforeend', transRow);
  });
};


function nickCreater(massive) {
  massive.forEach(Element => {
    const newNick = Element.userName
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    return (Element.nickName = newNick);
  });
}
nickCreater(accounts);



function Balance(account) {
  account.forEach(Element => {
    let sum = Element.transactions.reduce((acc, value) => (acc += value), 0);

    Element.sumBalance = sum;
    console.log(Element);
  });
}
Balance(accounts);



const labelSumIn = document.querySelector('.total__value--in');
function displayInAndOut(account) {
  labelSumIn.textContent = account.transactions
    .filter(Element => Element > 0)
    .reduce((acc, value) => (acc += value), 0);

  labelSumOut.textContent = account.transactions
    .filter(Element => Element < 0)
    .reduce((acc, value) => (acc += value), 0);

  labelSumInterest.textContent = account.transactions
    .filter(Element => Element > 0)
    .map((Element, index, arr) => (Element * account.interest) / 100)
    .filter((Element, index, arr) => Element >= 5)
    .reduce((acc, value) => Math.round((acc += value)), 0);
}
function update(accc) {
  displayInAndOut(accc);
  labelBalance.textContent = `${accc.sumBalance} $`;
  userDisplay(accc);
}
let untAcount, timerr;

const timerClose = function () {
  let time = 300;
  const logTimerCallback = () => {
    const minut = String(Math.trunc(time / 60)).padStart(2, '0');
    const sec = String(Math.trunc(time % 60)).padStart(2, '0');
    timerOut.textContent = `${minut}:${sec}`;
    if (time === 0) {
      clearInterval(logTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Войдите в свой аккаунт';
    }
    time--;
  };
  logTimerCallback();
  const logTimer = setInterval(logTimerCallback, 1000);
  return logTimer;
};

const activUserTimer = () => {
  clearInterval(timerr);
  timerr = timerClose();
};
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const userNick = String(inputLoginUsername.value);
  const pinUser = Number(inputLoginPin.value);
  const seeAcount = accounts.find(
    acnt => userNick === acnt.nickName && pinUser === acnt.pin
  );
  untAcount = seeAcount;
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
  if (timerr === undefined) clearInterval(timerr);

  if (seeAcount !== undefined) {
    containerApp.style.opacity = 100;
    labelWelcome.textContent = `Добро пожаловать,${seeAcount.userName.slice(
      0,
      seeAcount.userName.indexOf(' ')
    )}`;

    if (timerr) clearInterval(timerr);
    timerr = timerClose();

    update(seeAcount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const imputNick = inputTransferTo.value;
  const transferUser = accounts.find(Element => Element.nickName === imputNick);
  const imputTransfer = Number(inputTransferAmount.value);
  if (
    imputTransfer > 0 &&
    untAcount.sumBalance > imputTransfer &&
    transferUser &&
    imputNick !== untAcount.nickName
  ) {
    untAcount.sumBalance -= imputTransfer;
    transferUser.sumBalance += imputTransfer;
    untAcount.transactions.unshift(-imputTransfer);
    transferUser.transactions.unshift(imputTransfer);

    untAcount.transactionsDates.unshift(new Date());
    transferUser.transactionsDates.unshift(new Date());
    activUserTimer();
    inputTransferAmount.value = '';
    inputTransferTo.value = '';
    update(untAcount);
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeNick = inputCloseUsername.value;
  const pinClose = Number(inputClosePin.value);

  if (untAcount.nickName === closeNick && untAcount.pin === pinClose) {
    console.log('delete');
    const deleteAcc = accounts.findIndex(
      Element => Element.nickName === untAcount.nickName
    );
    accounts.splice(deleteAcc, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Войдите в свой аккаунт';
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const inputLoan = Number(inputLoanAmount.value);
  if (untAcount.transactions.some(Element => Element > inputLoan * 0.1)) {
    untAcount.sumBalance += inputLoan;
    untAcount.transactions.unshift(inputLoan);
    untAcount.transactionsDates.unshift(new Date());
    activUserTimer();
    update(untAcount);
  }
});

let sortTrueOrFalse = true;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  activUserTimer();
  userDisplay(untAcount, sortTrueOrFalse);
  sortTrueOrFalse = !sortTrueOrFalse;
});



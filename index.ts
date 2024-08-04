#! /usr/bin/env node

import inquirer from "inquirer"; // inquirer library ko import karna

// Bank Account Interface
interface IBankAccount {
  accountNumber: number; // Account number ki property
  balance: number; // Balance ki property
  withdraw(amount: number): void; // Withdraw method
  deposit(amount: number): void; // Deposit method
  checkBalance(): void; // Check balance method
}

// Bank Account Class
class BankAccount implements IBankAccount {
  accountNumber: number; // Account number ki property
  balance: number; // Balance ki property

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber; // Constructor mein account number set karna
    this.balance = balance; // Constructor mein balance set karna
  }

  // Debit money
  withdraw(amount: number): void {
    if (this.balance > amount) { // Agar balance amount se zyada hai
      this.balance -= amount; // Balance se amount subtract karna
      console.log(`Withdrawn $${amount} from account ${this.accountNumber}. Remaining balance: $${this.balance}`); // Withdraw ki information print karna
    } else {
      console.log("Insufficient funds."); // Agar balance kam hai to error message
    }
  }

  // Credit Money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; // Agar amount 100 se zyada hai to 1 dollar fee subtract karna
    }
    this.balance += amount; // Balance mein amount add karna
    console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`); // Deposit ki information print karna
  }

  // Check Balance
  checkBalance(): void {
    console.log(`Current Balance: $${this.balance}`); // Balance check karna aur print karna
  }
}

// Customer Class
class Customer {
  firstName: string; // Customer ka first name
  lastName: string; // Customer ka last name
  gender: string; // Customer ka gender
  age: number; // Customer ki age
  mobileNumber: number; // Customer ka mobile number
  account: BankAccount; // Customer ka bank account

  constructor(
    firstName: string, // Constructor ka first name parameter
    lastName: string, // Constructor ka last name parameter
    gender: string, // Constructor ka gender parameter
    age: number, // Constructor ka age parameter
    mobileNumber: number, // Constructor ka mobile number parameter
    account: BankAccount // Constructor ka account parameter
  ) {
    this.firstName = firstName; // First name set karna
    this.lastName = lastName; // Last name set karna
    this.gender = gender; // Gender set karna
    this.age = age; // Age set karna
    this.mobileNumber = mobileNumber; // Mobile number set karna
    this.account = account; // Account set karna
  }
}

// Create bank account
const accounts: BankAccount[] = [
  new BankAccount(10001, 1000), // Account 1 create karna
  new BankAccount(10002, 5000), // Account 2 create karna
  new BankAccount(10003, 2000), // Account 3 create karna
];

// Create Customers
const customers: Customer[] = [
  new Customer("John", "Doe", "Male", 30, 1234567890, accounts[0]), // Customer 1 create karna
  new Customer("Jane", "Smith", "Female", 25, 9876543210, accounts[1]), // Customer 2 create karna
  new Customer("Tom", "Johnson", "Male", 35, 5555555555, accounts[2]), // Customer 3 create karna
];

// Function to interact with bank account
async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      type: "input", // Input type prompt
      name: "accountNumber", // Prompt ka name
      message: "Enter your account number:", // Prompt ka message
    });

    const customer = customers.find(
      (customer) => customer.account.accountNumber === parseInt(accountNumberInput.accountNumber) // Customer find karna
    );

    if (customer) {
      console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`); // Customer ka welcome message

      const ans = await inquirer.prompt([{
        name: "select", // Prompt ka name
        type: "list", // List type prompt
        message: "Select an action:", // Prompt ka message
        choices: ["Deposit", "Withdraw", "Check Balance", "Exit"] // Choices
      }]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount", // Prompt ka name
            type: "number", // Number type prompt
            message: "Enter the amount to deposit:", // Prompt ka message
          });
          customer.account.deposit(depositAmount.amount); // Deposit amount
          break;
        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount", // Prompt ka name
            type: "number", // Number type prompt
            message: "Enter the amount to withdraw:", // Prompt ka message
          });
          customer.account.withdraw(withdrawAmount.amount); // Withdraw amount
          break;
        case "Check Balance":
          customer.account.checkBalance(); // Balance check karna
          break;
        case "Exit":
          console.log("Exiting bank Program"); // Exit message
          console.log("\nThank you for using our bank services. Have a nice day"); // Thank you message
          return;
      }
    } else {
      console.log("Account not found. Please try again."); // Account not found message
    }
  } while (true); // Loop continue
}

service(); // Service function call karna

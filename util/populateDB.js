const fs = require("fs");
// const { Sequelize } = require('sequelize');
const sequelize = require('../util/config');
const Account = require("../models/Account");

async function populateDatabase() {
    try {
        await sequelize.sync({ alter: true });
        const data = fs.readFileSync('/opt/users.csv', 'utf8');
        let temp = 0
        for(let row of data.split("\n")){
            console.log(row);
            temp = temp+1
            if(temp==1){
                continue;
            }
            if(row===""){
                continue;
            }
            const rowItems = row.split(",");
            console.log(rowItems)
            try {
                const [account, created] = await Account.findOrCreate({
                    where: {email: rowItems[2].toString()},
                    defaults: {
                        first_name: rowItems[0].toString(),
                        last_name: rowItems[1].toString(),
                        password: rowItems[3].toString()
                    }
                })
                if(created){
                    console.log(account.email+" already exists")
                }
                else{
                    console.log(account.email+" user created")
                }
            } catch (error) {
                console.error('Error inserting row:', error);
            }
            
        } 
    } catch (error) {
        console.error('Error reading CSV file:', error);
    }
}

module.exports = populateDatabase();

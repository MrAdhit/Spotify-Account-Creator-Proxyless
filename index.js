const fetch = require("node-fetch");
const fs = require("fs");
const prompts = require('prompts');
const colors = require('colors');


var args = process.argv.slice(2);
var total = args[0];

async function main(){
    if(args<1){
        const response = await prompts({
            type: 'number',
            name: 'total',
            message: 'How many account do you want to create?'
          });
        total = response.total;
    }
    while(total>0){
        await fetch("http://52.247.122.211:1122/create?email=rnd&password=rnd")
        .then(res => res.json())
        .then(json => {
            var empass = `${json.credentials[0]}:${json.credentials[1]}`;
            if(json.status==201){
                total--;
                console.log(`\nCreated `.brightGreen+`${empass} ${total}`.white+` account left`.brightGreen);
                fs.appendFileSync("acc.txt", empass+"\n");
            }
        });
    }
}

main();
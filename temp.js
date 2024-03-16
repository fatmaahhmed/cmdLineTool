//interactive cmd line tool
// awl haga na 3ayzaa 23mel "node index.js add js"
// msh hayfhm ally na katpo daa asln tp azay akhly al app bta3i yfhm ally na katpo leh da?
// process.argv => refere to current app + ally nta dayfo b3d goz2 al run bta3k asln

// adding courses ==>node index.js add js
// console.log(process.argv);
// if (process.argv[2]==='add')
// {
//     console.log(`u are going to add course ${process.argv[3]}`);;
// }

// replace this code with commander
//commander
// 3shan a3mel al goz2 daa w 2a2der astakdm ecma ==> adding this in dependenceies file==>  "type": "module",
const { Command } = require('commander'); 
 // Ensure correct module name
//to make cmd interactive 
import inquirer from 'inquirer';
const program = new Command(); // Create a new Commander instance
const questions=[
    {
        type: 'input',
        name: 'title',
        message: 'what is your favorite programming language?'
    }
    ,
    {
      type: 'input',
      name: 'price',
      message: 'how much does it cost?'
  },
  {
    type: 'input',
    name: 'duration',
    message: 'what about time does it take?'
},

]
program
    .name('cmd - courses manager')
    .version('1.0.0')
    .description('cmd to make courses ')
program
    .command('add')
    .alias("a")
    .description('add courses')
    // .argument("<course>,add course name")
    // .argument("<duration>,add course duration")
    // .option("--price <number>","the price you want to add")
    // .action((course,duration, option) => {
    //     const price = option.price ? `with price: ${option.price}` : '';
    //     console.log(`You are going to add course "${course}" ${price} and duration is ${duration}`);
    // });
    .action(()=>{
        inquirer
            .prompt(questions)
            .then((answers) => {
                console.log(answers);
            })})

program
    .command('list')
    .alias("l")
    .description('list course u have')
    .option("--number of rows <number>","limit")
    .action((option) => {
        if (option.number) {
            console.log(`showing number of rows:${option.number}`);

        } else{
            console.log("showing all the courses");
        }
        
        console.log(`You are going to add course "${course}" ${price} and duration is ${duration}`);
    });

program.parse(process.argv);






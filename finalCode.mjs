import { Command } from 'commander/esm.mjs'; // Adjust import statement
import inquirer from 'inquirer';
import fs from 'fs/promises'; // Use promises for async file operations
const fileName = './courses.JSON';
const program = new Command();
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is your favorite programming language?'
  },
  {
    type: 'input',
    name: 'price',
    message: 'How much does it cost?'
  },
  {
    type: 'input',
    name: 'duration',
    message: 'What about time does it take?'
  }
];

async function addCourse() {
  try {
    const answers = await inquirer.prompt(questions);

    // Read existing courses (empty array if file doesn't exist)
    let courseData = await fs.readFile(fileName, 'utf8').catch(() => '[]');
    courseData = JSON.parse(courseData);

    // Add new course
    courseData.push({
      title: answers.title,
      price: answers.price,
      duration: answers.duration
    });

    // Write updated courses back to file
    const jsonString = JSON.stringify(courseData, null, 2); // Pretty-printed JSON
    await fs.writeFile(fileName, jsonString, 'utf8');

    console.log("Course added successfully!");
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function listCourses(option) {
  try {
    const courseData = await fs.readFile(fileName, 'utf8');
    const parsedCourses = JSON.parse(courseData);

    if (option.number) {
      console.table(parsedCourses.slice(0, option.number)); // Display limited courses
    } else {
      console.table(parsedCourses); // Display all courses
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}
program
  .name('cmd - courses manager')
  .version('1.0.0')
  .description('Command-line tool to manage your courses.');
program
  .command('add')
  .alias("a")
  .description('Add a new course')
  .action(addCourse);

program
  .command('list')
  .alias("l")
  .description('List existing courses')
  .option("--number <number>", "limit the number of courses to display")
  .action(listCourses);
program.parse(process.argv);

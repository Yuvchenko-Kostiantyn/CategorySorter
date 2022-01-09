const xlsx = require('xlsx');
const fs = require('fs');
const log = JSON.parse(fs.readFileSync('stats.json'));
require('dotenv').config();
const key = process.env.CATEGORY;

function Category(categoryName){
	this.category = categoryName;
	this.items = [];
}

let workSheet = xlsx.readFile(`input/${process.argv[2]}`)
	.Sheets['Worksheet'];

let data = xlsx.utils.sheet_to_json(workSheet);

// Makes new array of all categories and removes duplicate through set 
// and converts back to an array via spreas operator
categories = [...new Set(data.map(record => record[key]))];

// Adds up all the counted categories for record keeping
log.total+=categories.length;
fs.writeFile('stats.json', JSON.stringify(log), () => {});

// Creates an array of categories and populates inner arrays with items of said category
let categorySet = categories.map(el => new Category(el));
data.forEach(record => {
	let category = categorySet.find(category => category.category === record[key]);
	delete record[key];
	category.items.push(record);
});

// Creates new file for every unique category in the array
for(let category of categorySet) {
	let newWorkBook = xlsx.utils.book_new();
	let newWorkSheet = xlsx.utils.json_to_sheet(category.items);
	xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, 'Worksheet');
	xlsx.writeFile(newWorkBook, `output/${category.category}.xls`);
}
console.log('Done');

const xlsx = require('xlsx');
require('dotenv').config();

const functions = require('./functions');
const categoryTypes = require('../types/category');

const key = process.env.CATEGORY ? process.env.CATEGORY : '';
const GROUP = process.env.GROUP ? process.env.GROUP : '';

function parseWorksheet() {
    let workSheet = xlsx.readFile(`input/${process.argv[2]}`)
	.Sheets['Worksheet'];

    // Parse all the data to JSON and remove columns that don't have a name
    let data = xlsx.utils.sheet_to_json(workSheet)
        .map(item => functions.clearObject(item, GROUP));

    // Makes new array of all categories and removes duplicate through set 
    // and converts back to an array via spreas operator
    categories = [...new Set(data.map(record => record[key]))];

    return {data, categories};
}



// Creates an array of categories and populates inner arrays with items of said category
function populateCategories() {
    const {data, categories} = parseWorksheet();
    let categorySet = categories.map(el => new categoryTypes.Category(el));
    data.forEach(record => {
        let category = categorySet.find(category => category.name === record[key]);
        delete record[key];
        category.items.push(record);
    });

    return categorySet;
}


// Creates new file for every unique category in the array


function createWorkbook() {
    const categorySet = populateCategories();
    for(let category of categorySet) {
        let newWorkBook = xlsx.utils.book_new();
        let newWorkSheet = xlsx.utils.json_to_sheet(category.items);
        xlsx.utils.book_append_sheet(newWorkBook, newWorkSheet, 'Worksheet');
        xlsx.writeFile(newWorkBook, `output/${category.name}.xls`);
    }

    console.log('Done');
}

module.exports = { createWorkbook }
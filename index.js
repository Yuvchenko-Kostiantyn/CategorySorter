const xlsx = require('xlsx');
const fs = require('fs')
const log = JSON.parse(fs.readFileSync('stats.json'))
require('dotenv').config()
const key = process.env.CATEGORY
function Category(catName){
	this.category = catName;
	this.items = [] 
}
let file = xlsx.readFile(`input/${process.argv[2]}`);
let ws = file.Sheets['Worksheet']
let data = xlsx.utils.sheet_to_json(ws)
let cats = []
data.forEach(el => {
	if(!cats.includes(el[key])){
		cats.push(el[key])
	}
})
log.total+=cats.length;
fs.writeFile('stats.json', JSON.stringify(log), ()=>console.log('Done'))
let categorySet = cats.map(el => new Category(el))
data.forEach(el => {
	let category = categorySet.find(cat => cat.category === el[key])
	delete el[key]
	category.items.push(el)
})
for(let cat of categorySet){
	let newWB = xlsx.utils.book_new()  
	let newWS = xlsx.utils.json_to_sheet(cat.items)
	xlsx.utils.book_append_sheet(newWB, newWS, 'Worksheet')
	xlsx.writeFile(newWB, `output/${cat.category}.xls` )
}
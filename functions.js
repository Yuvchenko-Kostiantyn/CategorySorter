function removeUnnamedColumns(item) {
	const temporaryObject = { ...item }; 
	const keys = Object.keys(item).filter(key => key.includes('EMPTY'));
	keys.forEach(key => {
		delete temporaryObject[key];
	});

	
	return temporaryObject;
}

function removeUnnecessarySpaces(string) {
    return string.replace(/ +(?= )/g,'').trim();
}

const clearObject = function (object, key) {
	const stepOne =  removeUnnamedColumns(object);
	return { ...stepOne, [key]: removeUnnecessarySpaces(stepOne[key])}
} 

module.exports = { clearObject };
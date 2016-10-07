var fs = require('fs');
var pluck = require('../bare_minimum/promiseConstructor');
var Promise = require('bluebird');
/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */


var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  var promises = [];
  filePaths.forEach(function(filepath){
    promises.push(pluck.pluckFirstLineFromFileAsync(filepath));
  });
  return Promise.all(promises).then(function(filelines){
    return new Promise(function(resolve, reject) {
      fs.writeFile(writePath, filelines.join('\n'), function(error, data){
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  });
};


// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};

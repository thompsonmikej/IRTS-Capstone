function Test() {
    studentCourse_grades = [array of objects];

    // Function to calculate the average of numbers
    function avg(studentCourseGrades) {
        var gradeTotal = 0;

        // Iterate the elements of the array
        studentCourseGrades.forEach(function (grade,index) {
            gradeTotal += grade;
            index += 1;
        });

        // Returning the average of the numbers
        console.log(gradeTotal, grade, index)
        return gradeTotal / studentCourseGrades.length;
    }

    console.log(avg(studentCourse_grades));
};
testresult = Test()

// https://dmitripavlutin.com/foreach-iterate-array-javascript/
// https://www.geeksforgeeks.org/how-to-compute-the-average-of-an-array-after-mapping-each-element-to-a-value-in-javascript/

// This post describes how to use forEach() array method to iterate items of an array in JavaScript. Plus, you will read about forEach() best practices like correct handling of this and how to iterate array-like objects.

// const colors = ['blue', 'green', 'white'];
// function iterate(item) {
//     console.log(item);
// }
// colors.forEach(iterate);
// // logs "blue"
// // logs "green"
// // logs "white"


// array.forEach(callback(item[, index[, array]]))
// Let's access the index of each item in the colors array:

// const colors = ['blue', 'green', 'white'];
// function iterate(item, index) {
//     console.log(`${item} has index ${index}`);
// }
// colors.forEach(iterate);
// // logs "blue has index 0"
// // logs "green has index 1"
// // logs "white has index 2"

// https://mish.co/posts/sum-and-average-array-of-objects-in-js/


// pass a function to map
const gradeAvg = studentCourseGrades.map(grade => grade += grade);

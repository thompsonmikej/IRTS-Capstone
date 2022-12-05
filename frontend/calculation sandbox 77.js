let data = [
  { name: 'Sarah', gender: 'female', age: 25 },
  { name: 'Tom', gender: 'male', age: 18 },
  { name: 'Tim', gender: 'male', age: 65 },
  { name: 'Kim', gender: 'female', age: 58 }
];


function calcSemester() {
  let creditCount = (Math.floor(data.age / 12))
  let currentSemester = creditCount + data.age
  console.log('credit count', creditCount)
  console.log('calc semester', currentSemester)
  setCalcSemester(currentSemester)
}



let sum = 0;

for (let i = 0; i < data.length; i++){
  sum += data[i]
}

console.log(sum);
====

const [tempGrades, setGrades] = useState(0)

useEffect(() => {
  findGrades();
}, [studentCourses])

function findGrades() {
  let tempGrades = studentCourses.map((studentCourse) => {   //          
    return studentCourse.grade_received
  })
  console.log('temp Gpa', tempGrades);
  setGrades(tempGrades);
}

///
function CountGrades() {
  let countOfGrades = studentCourses.map((studentCourse) => {     
    return studentCourse.grade_received
  }).length
  console.log('count Grades', countOfGrades);
  setCountGrades(studentCourses.length);
}

function SumOfGrades() {
  let grade_sum = 0;
  for (let i = 0; i < studentCourse.grade_received.length; i++) {
    return grade_sum += studentCourse.grade_received[i]
  } 
  console.log('sum of grades', grade_sum);
  setSumOfGrades(grade_sum)
}
(24)CR/12 * 1 + semester (6)
11









function CalcGpa() {

  return SumOfGrades / CountGrades

}


///

function CountGrades() {
  let grade_sum = 0;
  for (let i = 0; i < studentCourse.grade_received.length; i++) {
    grade_sum += studentCourse.grade_received[i]
  }
  
  let countOfGrades = studentCourses.map((studentCourse) => {
    return studentCourse.grade_received
  }).length
  console.log('count Grades', countOfGrades);
  setCountGrades(countOfGrades);
}




function SumOfGrades() {
  
  console.log('sum of grades', grade_sum);
  setSumOfGrades(grade_sum)
}



















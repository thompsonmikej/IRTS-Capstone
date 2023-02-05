# IRTS Technical Documentation

## Integrated Registration Tracking System Technical Documentation
===============================================================

About the Project
-----------------

The Integrated Registration Tracking System (IRTS) serves as the storage hub for the academic credentials of students in an educational institution, such as a college. Students may access their own course and grade history and choose courses in which to enroll. Employees may access multiple data points about any student's academic progress (post-Admission) and eligibility for graduation.

Built With
----------

1. !\[Brave\](https://img.shields.io/badge/Brave-FB542B?style=for-the-badge&logo=Brave&logoColor=white)
2. CSS Flexbox
3. Cypress
4. !\[Django\](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
5. !\[DjangoREST\](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white) DjangoREST
6. !\[MySQL\](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
7. !\[Postman\](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
8. !\[Python\](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
9. !\[React\](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

My Process
----------

I submitted the Capstone project proposal on Thursday, November 17, 2022. It was approved on Thursday, November 17, 2022.

The 15-day development sprint ran from Thursday, November 17, 2022 through Wednesday, December 14, 2022.

I presented the project live on Zoom on Friday, December 16, 2022.

The User Stories for this app were derived from my recollection of the functions that I used to use in registration systems as a Registrar’s office employee. The intention was to re-create the system and build accessibility features into the design.

### Wireframes

1. IRTS Capstone wireframe screens.jpg
2. IRTS Capstone wireframe user flows.png

### Entity Relational Diagram (ERD)

1. IRTS Capstone ERD.png

Technical Showcase
------------------

Technical challenge-- Creating the differentiated user experience. Giving the employee access to student records concealing the student path from the employee path.

Combining calculations to trigger events such as updated eligibility status.

### Differentiated User Experience

Displaying or concealing information based on user type to create a differentiated user experience.

1. Paths for Logged-In User and Non-Logged-In

Appearance of the Search Bar and Log-out button

One example is that the search bar is only available to logged-in users. For this sprint, the Search form field is simulated. In an upcoming sprint, the Search form will be fully functional.

1. {user ? ( <>  Search Logout ) : ( **Integrated Registration Tracking System** ) }

2. Paths for Employee and Student

Separate Menu options

### Web Accessibility Features

1. ### Color palette

The black, bold text palette and the gray and violet color palette is high contrast for low vision users and Web Content Accessibility Guidelines (WCAG) 1.4.3 compliant.

2. ### Button change color and shape

The button change of shape and color is WCAG compliant serves sighted users.

3. ### "Back to Top" Skip links

The quick navigation to top of page is compliant with WCAG 2.4.1.

Installation Steps
------------------

### Launching Django for the Backend Server
1. Clone this repo from Github
2. Download and install Visual Studio Code
3. 
4. cd backend
5. pipenv shell
6. python manage.py runserver

### Launching React for Frontend Server
1. clone the repo
2. npx create-react-app
3. IRTS to run Node
4. cd frontend
5. npm start

### Launching MySQL for the active database
1. Download and install MySQL
2. Double-click the file, \IRTS_Capstone\package-lock.json

### Launching Postman for the endpoint testing
1. Download and install Postman
2. Double-click the file, \IRTS_Capstone\student data2022.sql

### Launching Cypress for the automated testing
1. Download and install Cypress
2. Double-click the file, \IRTS_Capstone\cypress\e2e\App.cy.js"

Continued Development
---------------------

Aspects of coding in which I want to further my learning and improve.

1. ### Link functionality

    Create endpoints for display links. Add new screens to expand the information to which the links allude.

2. ### Create functional skip links (“back to top”) and Search Bar

    The Skip links, positioned at the bottom of a page will allow logged-in users to navigate to the top of a page with one click.

    The Search bar will allow students to quickly find courses, locations, and teachers with relevant search terms.

    The same bar will allow employees to quickly find courses, locations, and teachers and also students with relevant search terms.

3. ### Delete a Graded Course

    Building a delete function so that an Employee may remove a graded course from the student's transcript. This will trigger a re-calculation of the student's GPA and credit totals.

Contact Me
----------

1. <https://www.linkedin.com/in/the1michaelt/>
2. <https://github.com/the1michaelt>
3. webdevmikethompson@gmail.com

API Endpoints
-------------

### JWT Backend APIs

These are the subfolder directories for all subsequent endpoints.

1. ##### Admin Access Endpoint

    URL for users with administrative privileges.

    <http://127.0.0.1:8000/admin/>

    * * *

2. ##### User Objects Subfolder

    Subfolder for custom endpoints related to user data as employee or student.

    <http://127.0.0.1:8000/api/auth/>

    * * *

3. ##### Courses Subfolder

    Subfolder for custom endpoints related to courses in the catalog.

    <http://127.0.0.1:8000/api/courses/>

    * * *

4. ##### Student\_Courses Subfolder

    Subfolder of custom endpoints for the joining of student objects to the courses in which they are enrolled.

    <http://127.0.0.1:8000/api/courses/>

    * * *

### Person object APIs

Person objects can be either students or employees.

1. ##### Student Gets Current Credit Total

    A logged-in student may view his/her own current data on the Transcript page.

    <http://127.0.0.1:8000/api/auth/get\_current\_credits//>

    @api\_view(\['GET'\]) def get\_current\_credits(request, user\_id): student\_object = User.objects.get(id=user\_id) passed\_courses = StudentCourse.objects.filter(user\_id=user\_id).exclude(credits\_received=0) sum\_of\_credits = 0 for passed\_course in passed\_courses: sum\_of\_credits += passed\_course.credits\_received return Response(sum\_of\_credits)

    * * *

2. ##### Calculate Graduation Eligibility

    A logged-in employee may calculate the selected student’s data and update the database via the FindStudentCourse page.

    <http://127.0.0.1:8000/api/auth/student\_graduation\_eligibility//>

    * * *

3. ##### View Student Directory

    A logged-in employee may view a list of students in the database on the StudentDirectory page.

    <http://127.0.0.1:8000/api/auth/student\_directory/>

    * * *

4. ##### View Graduate Ready Candidates

    A logged-in employee may view the list of students meeting the minimum graduation criteria of 128 credits and 3.0 GPA.

    <http://127.0.0.1:8000/api/auth/grad\_ready\_candidates/>

    * * *

5. ##### User Log-in

    A registered student or employee may log-in with a token.

    <http://127.0.0.1:8000/api/auth/login/>

    * * *

6. ##### User Register

    For Postman API testing. A user registers as a student or employee in the system.

    <http://127.0.0.1:8000/api/auth/register/>

    * * *

7. ##### Student Gets Current Semester

    A logged-in student may view his/her own current data on the Transcript page.

    <http://127.0.0.1:8000/api/auth/get\_current\_semester//>

    @api\_view(\['GET'\]) def get\_current\_semester(request, user\_id): student\_object = User.objects.get(id=user\_id) passed\_courses = StudentCourse.objects.filter(user\_id=user\_id).exclude(credits\_received=0) sum\_of\_credits = 0 for passed\_course in passed\_courses: sum\_of\_credits += passed\_course.credits\_received semester=(sum\_of\_credits//16)+1 return Response(semester)

    * * *

8. ##### Student Gets Current GPA

    A logged-in student may view his/her own current data on the Transcript page.

    <http://127.0.0.1:8000/api/auth/get\_current\_gpa//>

    @api\_view(\['GET'\]) def get\_current\_gpa(request, user\_id): student\_object = User.objects.get(id=user\_id) graded\_courses = StudentCourse.objects.filter(user\_id=user\_id).exclude(grade\_received=0) sum\_of\_grades = 0 for grade in graded\_courses: sum\_of\_grades += grade.grade\_received gpa = sum\_of\_grades/len(graded\_courses) return Response(gpa)

    * * *

### Courses APIs

Courses contain credit values and semester levels. These objects fill the catalog

1. ##### Employee Creates Course in Catalog

    A logged-in employee may create a course via the AddCourses page.

    <http://127.0.0.1:8000/api/courses/post\_create\_courses/>

    @api\_view(\['POST'\]) @permission\_classes(\[IsAuthenticated\]) def post\_create\_courses(request): """api/courses/post\_create\_courses/ """ serializer = CourseSerializer(data=request.data) if serializer.is\_valid(): serializer.save() return Response(serializer.data, status=status.HTTP\_201\_CREATED) return Response(serializer.errors, status=status.HTTP\_400\_BAD\_REQUEST)

    * * *

2. ##### Employee Deletes Course from Catalog

    A logged-in employee may delete a course via the AddCourses page.

    <http://127.0.0.1:8000/api/courses/delete\_courses//>

    * * *

3. ##### Display Courses Available to Student

    Displays all courses of a logged-in student at their current semester level on the AvailableCourses page.

    <http://127.0.0.1:8000/api/courses/courses\_available/>

    * * *

### Student Courses APIs

Courses in which the student is enrolled

1. ##### Student Enrolls into a Course

    Allows a logged-in student placement into a course via the “enroll” button on the AvailableCourses page.

    <http://127.0.0.1:8000/api/student\_courses/post\_student\_into\_courses/>

    * * *

2. ##### Employee Displays Student Courses

    Displays all courses of a logged-in employee for a student selected via the FindStudentCourses page.

    <http://127.0.0.1:8000/api/student\_courses/employee\_gets\_studentcourses//>

    * * *

3. ##### Student Gets Transcript

    Displays all courses of a logged-in student on the Transcript page.

    <http://127.0.0.1:8000/api/student\_courses/get\_transcript/>

    * * *

4. ##### Student Gets Schedule of Courses

    Displays all courses into which a logged-in student has clicked “enroll” from the menu of options on the AvailableCourses page.

    <http://127.0.0.1:8000/api/student\_courses/get\_scheduled\_courses/>

    * * *

5. ##### Employee Grades Student Course

    A logged-in employee may apply a grade to the specific course or a specific student via the GradeCourse page.

    <http://127.0.0.1:8000/api/student\_courses/put\_grade\_course\_object//>

    * * *

6. ##### Student Disenrolls from a Course

    A logged-in student may delete a course via the “disenroll” button on the ScheduledCourses page.

    <http://127.0.0.1:8000/api/student\_courses/disenrolls\_course//>

    * * *

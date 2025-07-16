# IRTS Capstone Project

## ? Integrated Record Tracking System (IRTS)

**Developed as part of devCodeCamp's Full-Stack Software Engineering Program**

The IRTS (Integrated Record Tracking System) is a full-stack web application for educational institutions to manage and track students' academic progress. The system offers customized user experiences for students, registrars, instructors, and academic staff, with secure, role-based access to records and workflows.

---

## ? Features

### ? Registration & Enrollment
- Confirm admission and enrollment dates
- Activate/deactivate student status (e.g., Graduated, Withdrawn, Transferred)
- Create, remove, and manage courses
- Assign instructors to courses
- Apply GPA minimum requirements per course
- Override transfer credit rules or approve equivalencies
- Accept and apply prior academic degrees
- Display prerequisites and co-requisites
- Assign grade levels and track academic progress
- Project expected graduation dates

### ? Grades & Assessments
- Grade submission by instructors
- Private grade reports for students
- GPA calculation and performance tracking
- Grade accuracy and timeline oversight by Registrars

### ? System Access & Administration
- Secure login system with differentiated role-based dashboards
- RESTful API for external integration
- Supports intranet and cloud-hosted access

## ? Installation

To run this project locally, follow these steps:

Clone the repo
git clone https://github.com/thompsonmikej/IRTS-Capstone.git
cd irts-capstone
Backend setup
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Frontend setup
cd frontend
npm install
npm start
text

> Ensure both the frontend and backend servers are running concurrently.

---

## ? Watch a Demo

- ? **https://youtu.be/8jh5V1k99rI?feature=shared**

---

## ? Challenges & Lessons Learned

Creating differentiated user interfaces based on login type (student vs. administrator) was a rewarding challenge. I learned how to:

- Build a permission-based system that reveals/hides components dynamically.
- Design UI/UX flows that reflect real academic structures and workflows.
- Create reusable components and scalable APIs that adapt to changing data.

This project greatly improved my knowledge of **state management**, **authentication**, **RESTful design**, and **database modeling**.

---

## ? Future Improvements

If given more time, I would implement:

- ♿ **Accessibility Features:** ARIA labeling, better keyboard navigation, and high contrast modes.
- ? **Interdepartmental Integrations:**
  - Bursar clearance for diploma release
  - Financial Aid flagging
- ? **Automated Notifications:**
  - Email updates for GPA, remaining credits, or financial holds
  - Graduation requirement deadlines
- ? **Diploma Management:** Track order, storage, and distribution post-certification
- ? **Student Honors Tracking:** Auto-rank students for Valedictorian/Salutatorian status
- ? **Schedule Recommendations:** Suggest courses based on student progress and prerequisites

---

## ? License

This project was developed as an educational capstone. Reach out for collaboration or feedback!

---

## ? Acknowledgments

Thanks to the instructors, mentors, and staff at [**devCodeCamp**](https://devcodecamp.com) for support and guidance throughout this project.

---

## ? Contact

Feel free to reach out or connect:

**Michael Thompson**
[LinkedIn Profile] https://www.linkedin.com/in/thompsonmikej  

## Technologies
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
\
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
\
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Frameworks
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Testing
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e) 
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

## Other
![Adobe XD](https://img.shields.io/badge/Adobe%20XD-470137?style=for-the-badge&logo=Adobe%20XD&logoColor=#FF61F6)
![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)

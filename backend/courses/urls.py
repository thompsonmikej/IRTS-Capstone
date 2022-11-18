from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.courses_list),  
    path('<int:pk>/', views.courses_detail),
]


# /api/courses/all/  get all courses;  (EE)
# /api/courses/available/   get current courses (student or EE)
# /api/course/1    delete course for user; EE find student, find course, delete
# /api/courses/new/  POST   add new course to user; EE find student, find courses (depends on get current courses), add to student
 

 

from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_courses),  
    # path('<int:pk>/', views.courses_detail),
    path('all/', views.get_all_courses),
    path('new/', views.user_courses)
    # path('/api/course/', views.user_courses)
]


# /api/courses/all/  get all courses;  (EE)
# /api/courses/available/   get current courses (student or EE)
# /api/course/1    delete course for user; EE find student, find course, delete
# /api/courses/new/  POST   add new course to user; EE find student, find courses (depends on get current courses), add to student
 

 

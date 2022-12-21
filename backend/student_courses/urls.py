from django.urls import path, include
from . import views

urlpatterns = [
    path('add_student_to_course/', views.add_student_to_courses), 
    path('admin_views_studentcourses/<int:user_id>/', views.admin_views_studentcourses), 
    path('transcript/', views.get_transcript), 
   
    path('get_gpa/', views.get_gpa),
    path('calculate_gpa/<int:user_id>/', views.calculate_gpa),
    path('calculate_credits/<int:user_id>/', views.calculate_credits_earned),
    path('calculate_semester/<int:user_id>/', views.calculate_semester_by_credits),
    path('get_scheduled_courses/', views.get_scheduled_courses),
   
    path('grade_course_object/<int:course_id>/', views.grade_course_object), 
    path('grade_this_studentcourse/', views.grade_this_studentcourse),

]




from django.urls import path, include
from . import views

urlpatterns = [
    path('all/', views.student_users),
    # path('grads/', views.grad_ready_users),
    # path('grades/current/', views.get_all_user_courses),
    # path('credits/get/<year_semester>/', views.get_all_user_courses),
    
    # path('grades/changeget/', views.get_or_change_grades),
    
    path('grades/course/<str:course>/', views.get_grades),
    # path('grades/delete/<int:pk>/', views.change_grade_or_course)
    # path('grades/delete/<str:name>/', views.change_grade_or_course)
   
]


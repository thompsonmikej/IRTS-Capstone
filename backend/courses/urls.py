from django.urls import path, include
from . import views

urlpatterns = [
    # path('<int:pk>/', views.courses_detail),
    path('', views.get_all_courses),
    path('available/<int:semester>/', views.get_available),   
    path('delete/<str:name>/', views.delete_courses),
    path('create/', views.create_courses),
    path('find/', views.find_courses),
    path('current/', views.get_current_studentcourses),

]
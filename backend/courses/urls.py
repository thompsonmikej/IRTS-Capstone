from django.urls import path, include
from . import views

urlpatterns = [
    # path('<int:pk>/', views.courses_detail),
    path('all/', views.get_all_courses),
    path('available/', views.view_available_courses),
    path('transcript/', views.view_transcript),
    path('delete/<int:pk>/', views.delete_courses),
    path('change/', views.change_courses),
    path('find/', views.find_courses)
        
]

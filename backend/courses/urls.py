from django.urls import path, include
from . import views

urlpatterns = [
    # path('<int:pk>/', views.courses_detail),
    path('all/', views.get_all_courses),
    path('available/', views.view_available_courses),
    path('new/', views.select_courses)
        
]

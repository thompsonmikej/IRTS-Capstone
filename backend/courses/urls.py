from django.urls import path, include
from . import views

urlpatterns = [
    # path('<int:pk>/', views.courses_detail),
    path('all/', views.get_all_courses),
    path('available/<int:year_semester>/', views.view_available_courses),
    path('delete/<str:name>/', views.delete_courses),
    path('change/', views.change_courses),
    path('find/', views.find_courses)
        
]

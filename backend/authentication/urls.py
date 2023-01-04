from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MyTokenObtainPairView
from . import views

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('candidates/', views.grad_ready_candidates),
    path('student_directory/', views.directory_of_students),
    path('sum_credits_earned/<int:user_id>/', views.sum_credits_earned), 
    path('put_gpa/<int:user_id>/', views.gpa_earned), 
    path('put_semester/<int:user_id>/', views.current_semester), 
    path('put_grad_status/<int:user_id>/', views.grad_status),
    path("put_calculate_credits_earned/", views.put_calculate_credits_earned),
    path('put_calculate_gpa/<int:user_id>/', views.put_calculate_gpa),
    path("individual_graduation_eligibility/<int:id>/", views.put_individual_graduation_eligibility),
    path('put_calculate_semester_by_credits/<int:user_id>/', views.put_calculate_semester_by_credits),
    
    



]

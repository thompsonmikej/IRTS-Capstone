from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, MyTokenObtainPairView
from . import views

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('grad_ready_candidates/', views.grad_ready_candidates),
    path('student_directory/', views.student_directory),    
    # path('put_grad_status/<int:user_id>/', views.grad_status),

    path("student_graduation_eligibility/<int:user_id>/", views.put_student_graduation_eligibility),
    # path('put_calculate_semester_by_credits/<int:user_id>/', views.put_calculate_semester_by_credits),
    
    



]

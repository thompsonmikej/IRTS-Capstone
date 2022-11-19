from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
# from .models import Course
# from .models import Student_Course

class CustomUserAdmin(UserAdmin):
    pass

# Register your models here.
admin.site.register(User, CustomUserAdmin)
# admin.site.register(Course)
# admin.site.register(Student_Course)

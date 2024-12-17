from django.contrib import admin

from forms.models import User, Form, Question, Answer

# Register your models here.
admin.site.register(User)
admin.site.register(Form)
admin.site.register(Question)
admin.site.register(Answer)

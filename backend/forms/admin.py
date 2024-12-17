from django.contrib import admin
from .models import User, Form, Question, Answer


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1
    fields = ("body", "type", "required")
    show_change_link = True


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email")


@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")
    search_fields = ("title",)
    inlines = [QuestionInline]


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "body",
        "type",
        "form",
        "required",
    )
    list_filter = (
        "type",
        "required",
    )
    search_fields = ("body", "form__title")


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = (
        "question",
        "user",
        "short_ans",
        "long_ans",
        "email_ans",
        "num_ans",
    )
    list_filter = ("question__type",)
    search_fields = (
        "question__body",
        "user__username",
    )

from django.contrib import admin
from .models import User, Form, Question, Answer


class QuestionInline(admin.TabularInline):
    model = Question
    extra = 1  # Number of empty forms to display for adding new questions
    fields = ("body", "type", "required")  # Fields to display in the inline
    show_change_link = True  # Allow navigating to the question change form


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email")


@admin.register(Form)
class FormAdmin(admin.ModelAdmin):
    list_display = ("title", "created_at")  # Fields to display in the list view
    search_fields = ("title",)  # Add a search bar for forms
    inlines = [QuestionInline]  # Add inline questions


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "body",
        "type",
        "form",
        "required",
    )  # Fields to display in the list view
    list_filter = (
        "type",
        "required",
    )  # Add filters for question type and required flag
    search_fields = ("body", "form__title")  # Add a search bar for questions


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = (
        "question",
        "user",
        "short_ans",
        "long_ans",
        "email_ans",
        "num_ans",
    )  # Display answer details
    list_filter = ("question__type",)  # Add a filter for question type
    search_fields = (
        "question__body",
        "user__username",
    )  # Search by question body or username

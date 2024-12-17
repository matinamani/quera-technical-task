from django.db import models

from forms.constants import (
    QUESTION_TYPE_SHORT,
    QUESTION_TYPE_LONG,
    QUESTION_TYPE_EMAIL,
    QUESTION_TYPE_NUMERICAL,
)


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50, unique=True, null=False)
    email = models.EmailField(null=True)


class Form(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)


class Question(models.Model):
    QUESTION_TYPE = {
        QUESTION_TYPE_SHORT: "Short Answer",
        QUESTION_TYPE_LONG: "Long Answer",
        QUESTION_TYPE_EMAIL: "Email",
        QUESTION_TYPE_NUMERICAL: "Numerical",
    }

    form = models.ForeignKey(Form, related_name="questions", on_delete=models.CASCADE)
    body = models.CharField(max_length=300)
    required = models.BooleanField(default=False)
    type = models.CharField(
        max_length=10, choices=QUESTION_TYPE, default=QUESTION_TYPE_SHORT
    )


class Answer(models.Model):
    user = models.OneToOneField(User, related_name="answers", on_delete=models.CASCADE)
    question = models.ForeignKey(
        Question, related_name="answers", on_delete=models.CASCADE
    )
    short_ans = models.CharField(max_length=200, blank=True, null=True)
    long_ans = models.CharField(max_length=5000, blank=True, null=True)
    email_ans = models.EmailField(blank=True, null=True)
    num_ans = models.FloatField(blank=True, null=True)

    def clean(self):
        from django.core.exceptions import ValidationError

        filled_fields = [
            field
            for field in ["short_ans", "long_ans", "email_ans", "num_ans"]
            if getattr(self, field)
        ]
        if len(filled_fields) > 1:
            raise ValidationError("Only one answer field should be filled.")
        if self.question.type == "short" and not self.short_ans:
            raise ValidationError("Short answer is required for this question.")
        if self.question.type == "long" and not self.long_ans:
            raise ValidationError("Long answer is required for this question.")
        if self.question.type == "email" and not self.email_ans:
            raise ValidationError("A valid email is required for this question.")
        if self.question.type == "numerical" and self.num_ans is None:
            raise ValidationError("A numerical answer is required for this question.")

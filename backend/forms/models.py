from django.db import models

from forms.constants import (
    QUESTION_TYPE_SHORT,
    QUESTION_TYPE_LONG,
    QUESTION_TYPE_EMAIL,
    QUESTION_TYPE_NUMERICAL,
)


class User(models.Model):
    username = models.CharField(max_length=50, unique=True, null=False)
    email = models.EmailField(null=True)

    def __str__(self):
        return self.username


class Form(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    QUESTION_TYPE = [
        (QUESTION_TYPE_SHORT, "Short Answer"),
        (QUESTION_TYPE_LONG, "Long Answer"),
        (QUESTION_TYPE_EMAIL, "Email"),
        (QUESTION_TYPE_NUMERICAL, "Numerical"),
    ]

    form = models.ForeignKey(Form, related_name="questions", on_delete=models.CASCADE)
    body = models.CharField(max_length=300)
    required = models.BooleanField(default=False)
    type = models.CharField(
        max_length=10, choices=QUESTION_TYPE, default=QUESTION_TYPE_SHORT
    )

    def __str__(self):
        return self.body


class Answer(models.Model):
    question = models.ForeignKey(
        Question, related_name="answers", on_delete=models.CASCADE
    )
    user = models.ForeignKey(User, related_name="answers", on_delete=models.CASCADE)

    short_ans = models.CharField(max_length=200, blank=True, null=True)
    long_ans = models.TextField(max_length=5000, blank=True, null=True)
    email_ans = models.EmailField(blank=True, null=True)
    num_ans = models.FloatField(blank=True, null=True)

    class Meta:
        unique_together = (
            "question",
            "user",
        )

    def clean(self):
        from django.core.exceptions import ValidationError
        import re

        field_map = {
            QUESTION_TYPE_SHORT: (
                "short_ans",
                "Short answer is required for this question.",
                lambda v: isinstance(v, str) and len(v) <= 200,
            ),
            QUESTION_TYPE_LONG: (
                "long_ans",
                "Long answer is required for this question.",
                lambda v: isinstance(v, str) and len(v) <= 5000,
            ),
            QUESTION_TYPE_EMAIL: (
                "email_ans",
                "A valid email is required for this question.",
                lambda v: isinstance(v, str)
                and re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", v),
            ),
            QUESTION_TYPE_NUMERICAL: (
                "num_ans",
                "A numerical answer is required for this question.",
                lambda v: isinstance(v, (int, float)),
            ),
        }

        question_type = self.question.type
        field_name, error_message, validator = field_map.get(question_type)

        if self.question.required:
            if field_name:
                value = getattr(self, field_name)
                if value in [None, ""] or (validator and not validator(value)):
                    raise ValidationError(error_message)

        filled_fields = [
            getattr(self, field)
            for field in ["short_ans", "long_ans", "email_ans", "num_ans"]
            if getattr(self, field) not in [None, ""]
        ]
        if len(filled_fields) > 1:
            raise ValidationError("Only one answer field should be filled.")

    def save(self, *args, **kwargs):
        self.full_clean()  # Validate before saving
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Answer by {self.user.username} for {self.question.body}"

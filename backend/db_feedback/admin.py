from django.contrib import admin
from db_feedback.models import *

class db_feedback(admin.ModelAdmin):
    list_display = ('id', 'from_user', 'to_user', 'text', 'mark')
admin.site.register(Feedback, db_feedback)

class db_feedback_reports(admin.ModelAdmin):
    list_display = ('id', 'feedback')
admin.site.register(FeedbackReport, db_feedback_reports)

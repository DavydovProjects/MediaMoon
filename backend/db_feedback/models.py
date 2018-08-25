from django.db import models
from django.utils import timezone

class Feedback(models.Model):
    from_user   = models.IntegerField(default=0)
    to_user     = models.IntegerField(default=0)
    text        = models.CharField(max_length=150)
    mark        = models.BooleanField(default=False)
    date        = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return ('Feedback #%s'%self.pk)

class FeedbackReport(models.Model):
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE)
    user     = models.IntegerField(default=0)
    reason   = models.CharField(max_length=150)
    date     = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return ('Feedback report #%s'%self.pk)

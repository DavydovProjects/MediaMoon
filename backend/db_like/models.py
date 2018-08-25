from django.db import models
from django.utils import timezone

class Like(models.Model):
    from_user = models.IntegerField(default=0)
    to_user   = models.IntegerField(default=0)
    date      = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return ("Like #%s" % self.pk)

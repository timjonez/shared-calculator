from django.db import models


class Calculation(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=300)

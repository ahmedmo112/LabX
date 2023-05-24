from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Lab(models.Model):

    class labStatus(models.TextChoices):
        ACTIVE = 'Active', _('Active')
        UNDER_MAINTENANCE = 'Under Maintenance', _('under maintenance')
        
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, null=False)
    number_of_pcs = models.IntegerField(null=False)
    building_number = models.IntegerField(null=False)
    floor_number = models.IntegerField(null=False)
    capacity = models.IntegerField(null=False)
    number_of_chairs = models.IntegerField(null=False)
    status =  models.CharField(max_length=20, choices=labStatus.choices, default=labStatus.ACTIVE)
    
    def __str__(self):
        return self.name
    

    
class LabReport(models.Model):
    class ReportStatus(models.TextChoices):
        SOFTWARE = 'Software', _('Software')
        HARDWARE = 'Hardware', _('Hardware')

    id = models.AutoField(primary_key=True)
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE)
    number_of_pcs = models.IntegerField(null=False)
    report_status = models.CharField(max_length=9, choices=ReportStatus.choices, default=ReportStatus.SOFTWARE)
    report_description = models.TextField(max_length=2000, null=False)
    report_date = models.DateTimeField(null=False)
    is_repaired = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.id)
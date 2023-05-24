from django.contrib import admin

# Register your models here.
from .models import Lab, LabReport

@admin.register(Lab)
class LabAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',  'building_number', 'floor_number', 'status')
    list_display_links = ('id', 'name')
    list_per_page = 25

@admin.register(LabReport)
class LabReportAdmin(admin.ModelAdmin):
    list_display = ('id', 'lab_id', 'report_status', 'report_date', 'is_repaired')
    list_display_links = ('id', 'lab_id')
    list_per_page = 25




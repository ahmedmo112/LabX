# Generated by Django 4.2.1 on 2023-05-23 22:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('labSystem', '0003_alter_lab_status_alter_labreport_report_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='labreport',
            name='report_date',
            field=models.DateTimeField(),
        ),
    ]

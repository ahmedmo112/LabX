from django.urls import path
from . import views

urlpatterns = [
    path('',views.projects, name='projects'),
    path('pcs/<int:id>/', views.get_pcs, name='get_pcs'),
    path('home/',views.index, name='home'),
    path('add-new-lab/',views.add_new_lab, name='add_new_lab'),
    path('add-lab/',views.add_lab, name='add_lab'),
    path('edit-lab/',views.edit_lab, name='edit_lab'),
    path('edit-lab/<int:id>/',views.edit_lab, name='edit_lab_with_id'),
    path('labs/',views.get_labs, name='get_labs'),
    path('get-lab-data/<int:lab_id>/', views.get_lab_data, name='get_lab_data'),
    path('edit/',views.edit, name='edit'),
    path('view-lab/<int:id>/',views.view_lab, name='view_lab'),
    path('add-pc/<int:id>/',views.add_pc, name='add_pc'),
    path('delete-lab/<int:id>/',views.delete_lab, name='delete_lab_with_id'),
    path('view-labs/',views.view_search_labs, name='view_search_labs'),
    path('view-labs/<str:params>/',views.view_search_labs, name='view_search_labs'),
    path('report-problem/',views.report_lab_problem, name='report_lab_problem'),
    path('report-problem/<int:id>/',views.report_lab_problem, name='report_lab_problem_with_id'),
    path('problem/<int:id>/',views.get_problem, name='get_problem'),
    path('report/',views.report_lab, name='report_lab'),
    path('view-problems/',views.view_all_labs_problems, name='view_all_labs_problems'),
    path('view-problems/<str:params>/',views.view_all_labs_problems, name='view_all_labs_problems'),
    path('repair/<int:id>/',views.repair_problem, name='repair'),
]
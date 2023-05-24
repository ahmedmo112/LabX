from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from . import models

# Create your views here.

def projects(request):
    return render(request, 'pages/projects.html')

def get_pcs(request, id):
    lab = models.Lab.objects.get(id=id)
    return JsonResponse({'pcs': lab.number_of_pcs})

def index(request):
    total_pcs = 0
    total_underMaintenance_pcs = 0
    for lab in models.Lab.objects.all():
        total_pcs += lab.number_of_pcs
    for report in models.LabReport.objects.all():
        if report.is_repaired == False:
            total_underMaintenance_pcs += report.number_of_pcs

    statistics = {
        'total_labs': models.Lab.objects.count(),
        'total_pcs': total_pcs,
        'total_working_pcs': total_pcs - total_underMaintenance_pcs,
        'total_problems': models.LabReport.objects.count(),
    }
    context = {
        'statistics': statistics
    }
    return render(request, 'pages/index.html', context)

def add_new_lab(request):
    return render(request, 'pages/add_new_lab.html')

def add_lab(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        num_pcs = request.POST.get('num_pcs')
        building_number = request.POST.get('building_number')
        floor_number = request.POST.get('floor_number')
        capacity = request.POST.get('capacity')
        num_chairs = request.POST.get('num_chairs')
        status = request.POST.get('status')

        lab = models.Lab(    
            name=name,
            number_of_pcs=num_pcs,
            building_number=building_number,
            floor_number=floor_number,
            capacity=capacity,
            number_of_chairs=num_chairs,
            status=status
        )
        lab.save()

        return JsonResponse({'redirect': '/view-lab/'+str(lab.id)+'/'})
    else:
        return JsonResponse({'status': False, 'message': 'Invalid Request'})

def edit_lab(request, id=None):
    return render(request, 'pages/edit_lab.html')

# used to show all labs in drop down list of the edit lab page and report lab page
def get_labs(request):
    labs = models.Lab.objects.all()
    labs_list = []
    for lab in labs:
        labs_list.append({
            'id': lab.id,
            'name': lab.name,
            'number_of_pcs': lab.number_of_pcs,
            'status': lab.status,
        })
    return JsonResponse({'labs': labs_list})

# to fill fields of the edit lab page when select from drop down list
def get_lab_data(request, lab_id):
    lab = get_object_or_404(models.Lab, id=lab_id)
    lab_data = {
        'name': lab.name,
        'num_pcs': lab.number_of_pcs,
        'building_number': lab.building_number,
        'floor_number': lab.floor_number,
        'capacity': lab.capacity,
        'num_chairs': lab.number_of_chairs,
        'status': lab.status,
    }
    return JsonResponse(lab_data)

def edit(request):
    if request.method == 'POST':
        id = request.POST.get('lab_id')
        name = request.POST.get('name')
        num_pcs = request.POST.get('num_pcs')
        building_number = request.POST.get('building_number')
        floor_number = request.POST.get('floor_number')
        capacity = request.POST.get('capacity')
        num_chairs = request.POST.get('num_chairs')
        status = request.POST.get('status')

        lab = models.Lab.objects.get(id=id)
        lab.name = name
        lab.number_of_pcs = num_pcs
        lab.building_number = building_number
        lab.floor_number = floor_number
        lab.capacity = capacity
        lab.number_of_chairs = num_chairs
        lab.status = status
        lab.save()

        return JsonResponse({'redirect': '/view-lab/'+str(lab.id)+'/'})
    else:
        return JsonResponse({'status': False, 'message': 'Invalid Request'})

def view_lab(request, id):
    print(id)
    data = get_object_or_404(models.Lab, id=id)
    context = {
        'lab': data
    }
    return render(request, 'pages/view_lab.html', context)

# to add pc to lab from view lab page
def add_pc(request,id):
    if request.method == 'POST':
        lab = models.Lab.objects.get(id=id)
        
        lab.number_of_pcs += 1
        lab.save()
        return JsonResponse({'redirect': '/view-lab/'+str(id)+'/'})
    else:
        return JsonResponse({'status': False, 'message': 'Invalid Request'})

def delete_lab(request, id):
    lab = get_object_or_404(models.Lab, id=id)
    lab.delete()
    return JsonResponse({'redirect': '/view-labs/'})

def view_search_labs(request, params=None):
    labs = None
    if params:
        labs = models.Lab.objects.filter(name__icontains=str(params))
        labs = labs | models.Lab.objects.filter(id__icontains=params)
    else:
        labs = models.Lab.objects.all()
    
    context = {
        'labs': labs.values()
    }
    # print(context)
    return render(request, 'pages/view_search_labs.html',context)

def report_lab_problem(request, id=None):
    return render(request, 'pages/report_lab_problem.html')

# to fill fields of the report lab problem page when select from drop down list
def get_problem(request,id):
    lab = get_object_or_404(models.LabReport, id=id)
    lab_data = {
        'id': lab.id,
        'lab': {
            'id': lab.lab.id,
            'name': lab.lab.name,
        },
        'report_status': lab.report_status,
        'number_of_pcs': lab.number_of_pcs,
        'report_description': lab.report_description,
        'report_date': lab.report_date,
        'is_repaired': lab.is_repaired,
        
    }
    return JsonResponse(lab_data)

def report_lab(request):
    if request.method == 'POST':
        lab_id = request.POST.get('lab_id')
        num_pcs = request.POST.get('lab_pcs')
        description = request.POST.get('description')
        date_time = request.POST.get('date_time')
        status = request.POST.get('status')
        report_lab = models.LabReport(
            lab_id=lab_id,
            number_of_pcs=num_pcs,
            report_description=description,
            report_date=date_time,
            report_status=status
        )
        report_lab.save()

        return JsonResponse({'redirect': '/view-problems/'})
    else:
        return JsonResponse({'status': 'success'})

def view_all_labs_problems(request, params=None):
    problems = None
    if params:
        problems = models.LabReport.objects.filter(lab__name__icontains=str(params))
        problems = problems | models.LabReport.objects.filter(lab__id__icontains=params)
        problems = problems | models.LabReport.objects.filter(id__icontains=params)
    else:
        problems = models.LabReport.objects.all()
    
    context = {
        'problems': problems
    }
    print(context)
    return render(request, 'pages/view_all_labs_problems.html',context)

def repair_problem(request,id):
    if request.method == 'POST':
        lab = models.LabReport.objects.get(id=id)
        lab.is_repaired = True
        lab.save()
        return JsonResponse({'redirect': '/view-problems/'})
    else:
        return JsonResponse({'status': False, 'message': 'Invalid Request'})
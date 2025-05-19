from json import dumps

from django.contrib.auth.decorators import login_required
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render

from .forms import ChurchForm
from .models import Church

# Create your views here.


@login_required(login_url='/auth')
def church_page(request: HttpRequest) -> HttpResponse:
    churches = Church.objects.all()
    context = {'churches': churches}

    return render(request=request, template_name='church/church.html', context=context)


@login_required(login_url='/auth')
def create_church(request: HttpRequest) -> HttpResponse:
    if request.method == 'POST':
        form = ChurchForm(request.POST, request.FILES)
        if form.is_valid():
            obj = Church.objects.create(
                name=request.POST.get('name'),
                street=request.POST.get('street'),
                number=request.POST.get('number'),
                neighborhood=request.POST.get('neighborhood'),
                lat=request.POST.get('lat'),
                lon=request.POST.get('lon'),
                foundation_date=request.POST.get('foundation_date'),
                brief_history=request.POST.get('brief_history'),
                image=request.FILES.get('image'),
            )
            obj.save()

        return redirect('church_page')

    return render(
        request=request,
        template_name='church/church_form.html',
        context=None,
    )


@login_required(login_url='/auth')
def delete_church(request: HttpRequest, id: int) -> HttpResponse:
    pass


@login_required(login_url='/auth')
def update_church(request: HttpRequest, id: int) -> HttpResponse:
    church = Church.objects.get(id=id)
    latitude = str(church.lat).replace(',', '.')
    longitude = str(church.lon).replace(',', '.')
    foundation_date = str(church.foundation_date).replace('/', '-')

    if request.method == 'POST':
        form = ChurchForm(request.POST, request.FILES)
        if form.is_valid():
            church.name = request.POST.get('name')
            church.street = request.POST.get('street')
            church.number = request.POST.get('number')
            church.neighborhood = request.POST.get('neighborhood')
            church.lat = request.POST.get('lat')
            church.lon = request.POST.get('lon')
            church.foundation_date = request.POST.get('foundation_date')
            church.brief_history = request.POST.get('brief_history')
            # only alter image if a image is passed
            if request.FILES.get('image') is not None:
                church.image = request.FILES.get('image')

            church.save()
        return redirect('church_page')

    context = {
        'church': church,
        'latitude': latitude,
        'longitude': longitude,
        'foundation_date': foundation_date,
        'page': 'update',
    }
    return render(
        request=request,
        template_name='church/church_form.html',
        context=context,
    )


def view_church(request: HttpRequest, id: int) -> HttpResponse:
    church = Church.objects.get(id=id)
    church_data = {
        'name': church.name,
        'lat': church.lat,
        'lon': church.lon,
    }
    church_json = dumps(church_data, cls=DjangoJSONEncoder)

    context = {
        'church': church,
        'church_json': church_json,
    }

    return render(
        request=request, template_name='church/view_church.html', context=context
    )

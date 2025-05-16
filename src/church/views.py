from django.contrib.auth.decorators import login_required
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
            print(request.POST)
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

    return render(request=request, template_name='church/create_church.html', context=None)


@login_required(login_url='/auth')
def delete_church(request: HttpRequest, id: int) -> HttpResponse:
    church = Church.objects.get(id=id)
    if request.method == 'POST':
        church.delete()
        return redirect('church_page')

    context = {'obj': church}
    return render(
        request=request,
        template_name='church/delete_church.html',
        context=context,
    )

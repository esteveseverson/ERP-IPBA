from django.http import HttpRequest, HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .models import Church
# Create your views here.

@login_required(login_url='/auth')
def church_page(request: HttpRequest) -> HttpResponse:
    churches = Church.objects.all()
    context = {
        'churches': churches,
    }

    return render(request=request, template_name='church/church.html', context=context)

@login_required(login_url='/auth')
def create_church(request: HttpRequest) -> HttpResponse:
    return render(request=request, template_name='church/create_church.html', context=None)
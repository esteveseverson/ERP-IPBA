from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from church.models import Church

def landing_page(request: HttpRequest) -> HttpResponse:
    churches = Church.objects.all()
    context = {'churches': churches}

    return render(request, 'landing_page.html', context)

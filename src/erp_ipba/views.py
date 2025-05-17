import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

from church.models import Church


def landing_page(request: HttpRequest) -> HttpResponse:
    churches = Church.objects.all()
    churches_list = list(churches.values('name', 'lat', 'lon'))
    churches_json = json.dumps(churches_list, cls=DjangoJSONEncoder)

    context = {
        'churches': churches,
        'churches_json': churches_json,
    }

    return render(request, 'landing_page.html', context)

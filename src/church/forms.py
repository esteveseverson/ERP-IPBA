from django.forms import Form

from .models import Church


class ChurchForm(Form):
    class Meta:
        model = Church

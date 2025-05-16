
from django import forms

from .models import Church

class ChurchForm(forms.Form):
    class Meta:
        model = Church

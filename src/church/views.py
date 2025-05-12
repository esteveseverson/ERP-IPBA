from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render


# Create your views here.
def login_page(request: HttpRequest) -> HttpResponse:
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = User.objects.get(username=username)
        except Exception:
            messages.error(request=request, message='User does not exist')
            return render(request=request, template_name='church/login.html', context=None)

        user = authenticate(request=request, username=username, password=password)
        if not user:
            messages.error(request=request, message='Username or password not exists')

        if user:
            login(request=request, user=user)
            return redirect('home')

    return render(request=request, template_name='church/login.html', context=None)

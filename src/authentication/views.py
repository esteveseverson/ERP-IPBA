from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse
from django.shortcuts import redirect, render


# Create your views here.
def login_user(request: HttpRequest) -> HttpResponse:
    if request.user.is_authenticated:
        return redirect('landing_page')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        try:
            user = User.objects.get(username=username)
        except Exception:
            messages.error(request=request, message='Usuário ou Senha incorretos'),
            return render(
                request=request,
                template_name='authentication/auth_page.html',
                context=None,
            )

        user = authenticate(request=request, username=username, password=password)
        if not user:
            messages.error(request=request, message='Usuário ou Senha incorretos')
            return render(
                request=request,
                template_name='authentication/auth_page.html',
                context=None,
            )

        if user:
            login(request=request, user=user)
            return redirect('landing_page')

    return render(
        request=request,
        template_name='authentication/auth_page.html',
        context=None,
    )


def logout_user(request: HttpRequest):
    logout(request)

    return redirect('landing_page')

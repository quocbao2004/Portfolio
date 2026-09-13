import json

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import AnonymousUser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


def serialize_user(user):
    if isinstance(user, AnonymousUser) or not user.is_authenticated:
        return None

    return {
        'id': str(user.id),
        'username': user.username,
        'email': user.email,
        'isSuperAdmin': user.is_superuser,
    }


def login_mutation(request, variables):
    username = variables.get('username', '').strip()
    password = variables.get('password', '')

    if not username or not password:
        return {
            'login': {
                'ok': False,
                'message': 'Username and password are required.',
                'user': None,
            },
        }

    user = authenticate(request, username=username, password=password)

    if user is None:
        return {
            'login': {
                'ok': False,
                'message': 'Invalid username or password.',
                'user': None,
            },
        }

    if not user.is_superuser:
        return {
            'login': {
                'ok': False,
                'message': 'This account does not have super admin access.',
                'user': None,
            },
        }

    login(request, user)

    return {
        'login': {
            'ok': True,
            'message': 'Login successful.',
            'user': serialize_user(user),
        },
    }


@csrf_exempt
def graphql_view(request):
    if request.method != 'POST':
        return JsonResponse(
            {'errors': [{'message': 'Only POST requests are supported.'}]},
            status=405,
        )

    try:
        payload = json.loads(request.body or '{}')
    except json.JSONDecodeError:
        return JsonResponse(
            {'errors': [{'message': 'Invalid JSON payload.'}]},
            status=400,
        )

    query = payload.get('query', '')
    variables = payload.get('variables') or {}

    if 'login' in query:
        return JsonResponse({'data': login_mutation(request, variables)})

    if 'currentUser' in query:
        return JsonResponse({'data': {'currentUser': serialize_user(request.user)}})

    return JsonResponse(
        {'errors': [{'message': 'Unsupported GraphQL operation.'}]},
        status=400,
    )

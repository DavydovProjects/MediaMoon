from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.utils import timezone


from django.contrib.auth.models import User
from db_account.models import Account, AccountAvatar

from .view_funcs import *

import json, jwt, datetime, calendar, base64, os, uuid, binascii

@api_view(['POST'])
def CheckAuth(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        User.objects.get(pk=jwt_data['user_id'])
        return Response({'Valid'})
    except UnicodeDecodeError:
        return Response({'error': 'Can not decode token!'})
    except binascii.Error:
        return Response({'error': 'Can not decode token!'})
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})
    except jwt.ExpiredSignatureError:
        return Response({'error': 'token is expired!'})
    except jwt.exceptions.DecodeError:
        return Response({'error': 'token is invalid!'})

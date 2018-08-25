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
from db_account.models import *
from db_product.models import *
from db_feedback.models import *
from db_like.models import Like

from api.view_funcs import *

import json, jwt, datetime, calendar, base64, os, uuid, binascii


@api_view(['POST'])
def CheckOnBanList(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    username = data['username']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = jwt_data['user_id']
        user_to_check = User.objects.get(username=username)
        if AccountBans.objects.filter(from_user=jwt_data['user_id'], to_user=user_to_check.pk).exists():
            return Response({True})
        else:
            return Response({False})
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


@api_view(['POST'])
def AccounAddToBanList(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    username = data['username']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = jwt_data['user_id']
        user_to_ban = User.objects.get(username=username)
        if not AccountBans.objects.filter(from_user=jwt_data['user_id'], to_user=user_to_ban.pk).exists():
            AccountBans.objects.create(from_user=jwt_data['user_id'], to_user=user_to_ban.pk)
            return Response({'You are successfully banned this person!'})
        else:
            return Response({'error': 'You are already banned this person!'})
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

@api_view(['POST'])
def AccounRemoveFromBanList(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    username = data['username']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = jwt_data['user_id']
        user_to_unban = User.objects.get(username=username)
        if AccountBans.objects.filter(from_user=jwt_data['user_id'], to_user=user_to_unban.pk).exists():
            AccountBans.objects.filter(from_user=jwt_data['user_id'], to_user=user_to_unban.pk).delete()
            return Response({'You are successfully unbanned this person!'})
        else:
            return Response({'error': 'You did not banned this person!'})
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


@api_view(['POST'])
def LoadBansList(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        all_bans = AccountBans.objects.filter(from_user=jwt_user.pk).values('to_user', 'date')

        users_arr = []
        for user in all_bans:
            this_user = User.objects.get(pk=user['to_user'])

            good_feedbacks = Feedback.objects.filter(to_user=user['to_user'], mark=True).count()
            bad_feedbacks = Feedback.objects.filter(to_user=user['to_user'], mark=False).count()

            rating = good_feedbacks - bad_feedbacks

            res = {
                'username': this_user.username,
                'nickname': this_user.account.nickname,
                'rating': rating,
                'verified': this_user.account.verified,
                'avatar': this_user.account.accountavatar.avatar.url,
                'ban_date': user['date']
            }
            users_arr.append(res)

        return Response({'list': users_arr})

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

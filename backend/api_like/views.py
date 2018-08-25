from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth.models import User
from db_like.models import Like
from db_feedback.models import *
from api.view_funcs import *

import json, jwt, datetime, calendar, base64, os, uuid, binascii

@api_view(['POST'])
def CheckLike(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        to_user = User.objects.get(username=data['to_user'])
        if Like.objects.filter(to_user=to_user.pk, from_user=jwt_user.pk).exists():
            return Response({'True'})
        else:
            return Response({'False'})
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
def AddLike(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        to_user = User.objects.get(username=data['to_user'])
        if not Like.objects.filter(from_user=jwt_user.pk, to_user=to_user.pk).exists():
            Like.objects.create(to_user=to_user.pk, from_user=jwt_user.pk)
            return Response({'True'})
        else:
            return Response({'False'})
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
def RemoveLike(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        to_user = User.objects.get(username=data['to_user'])
        if Like.objects.filter(from_user=jwt_user.pk, to_user=to_user.pk).exists():
            this_like = Like.objects.get(from_user=jwt_user.pk, to_user=to_user.pk)
            this_like.delete()
            return Response({'Like has been successfully removed!'})
        else:
            return Response({'error': 'You have not liked this account!'})
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
def LoadLikes(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        all_likes = Like.objects.filter(from_user=jwt_data['user_id']).values('id', 'to_user', 'date')

        users_arr = []
        for user in all_likes:
            this_user = User.objects.get(pk=user['to_user'])

            good_feedbacks = Feedback.objects.filter(to_user=user['to_user'], mark=True).count()
            bad_feedbacks = Feedback.objects.filter(to_user=user['to_user'], mark=False).count()

            rating = good_feedbacks - bad_feedbacks

            res = {
                'username': this_user.username,
                'nickname': this_user.account.nickname,
                'rating': rating,
                'verified': this_user.account.verified,
                'avatar': this_user.account.accountavatar.avatar.url
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

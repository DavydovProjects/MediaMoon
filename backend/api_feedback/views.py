from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist

from django.contrib.auth.models import User
from db_feedback.models import Feedback, FeedbackReport
from db_product.models import *

from api.view_funcs import *

import json, jwt, datetime, calendar, base64, os, uuid, binascii, math



@api_view(['POST'])
def AddFeedback(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    to_user = data['to_user']
    text = data['text']
    mark = data['mark']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        to_user_obj = User.objects.get(username=to_user)
        if Twitter.objects.filter(user=to_user_obj).exists() or Facebook.objects.filter(user=to_user_obj).exists() or Youtube.objects.filter(user=to_user_obj).exists() or Vk.objects.filter(user=to_user_obj).exists() or Twitch.objects.filter(user=to_user_obj).exists() or Instagram.objects.filter(user=to_user_obj).exists() or Other.objects.filter(user=to_user_obj).exists():
            if not Feedback.objects.filter(from_user=jwt_data['user_id'], to_user=to_user_obj.pk):
                if not jwt_user.account.is_banned:
                    if not to_user_obj.pk == jwt_data['user_id']:
                        Feedback.objects.create(from_user=jwt_data['user_id'], to_user=to_user_obj.pk, text=text, mark=mark)
                        return Response({'Successfully added a new feedback!'})
                    else:
                        return Response({'error': 'You can not send feedback to yourself!'})
                else:
                    return Response({'error': 'You are banned!'})
            else:
                return Response({'error': 'You are already sent your feedback to this person!'})
        else:
            return Response({'error': "This person doesn't have any products!"})
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
def ReportFeedback(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    feedback_id = data['feedback_id']
    reason = data['reason']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        this_feedback = Feedback.objects.get(pk=feedback_id)
        if not FeedbackReport.objects.filter(feedback=this_feedback):
            if not jwt_user.account.is_banned:
                if not this_feedback.from_user == jwt_data['user_id']:
                    if not len(reason) < 5:
                        if not len(reason) > 150:
                            FeedbackReport.objects.create(feedback=this_feedback, user=jwt_data['user_id'], reason=reason)
                            return Response({'Report has been successfully sent!'})
                        else:
                            return Response({'error': 'Max length for reason text is 150!'})
                    else:
                        return Response({'error': 'Min length for reason text is 5!'})
                else:
                    return Response({'error': "You can't report yourself!"})
            else:
                return Response({'error': 'You are banned!'})
        else:
            return Response({'error': 'Somebody has been already reported this feedback!'})
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
def DeleteFeedback(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    feedback_id = data['feedback_id']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        this_feedback = Feedback.objects.get(pk=feedback_id)
        if int(jwt_user.account.staff_level) >= 1 or int(this_feedback.from_user) == jwt_user.pk:
            if not jwt_user.account.is_banned:
                this_feedback.delete()
                return Response({'Feedback has been successfully deleted!'})
            else:
                return Response({'error': 'You are banned!'})
        else:
            return Response({'error': "You don't have permissions to do this!"})
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
def GetFeedback(request, username):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    cur_page = data['cur_page']

    items_per_page = 9

    page_limit = items_per_page * int(cur_page)
    page_offset = page_limit - items_per_page

    try:
        this_user = User.objects.get(username=username)
        feedbackes = Feedback.objects.filter(to_user=this_user.pk).values('id', 'from_user', 'text', 'mark', 'date')

        good_feedbacks = Feedback.objects.filter(to_user=this_user.pk, mark=True).count()
        bad_feedbacks = Feedback.objects.filter(to_user=this_user.pk, mark=False).count()


        all_feedbackes = []
        for feedback in feedbackes:
            from_user = User.objects.get(pk=feedback['from_user'])
            from_user_avatar = from_user.account.accountavatar.avatar.url
            this = {
                'id': feedback['id'],
                'from_user': from_user.account.nickname,
                'from_user_username': from_user.username,
                'from_user_avatar': from_user_avatar,
                'text': feedback['text'],
                'mark': feedback['mark'],
                'date': feedback['date']
            }
            all_feedbackes.append(this)
        pages_count = len(all_feedbackes) / items_per_page

        return Response(
            {
            "feedback": all_feedbackes[int(page_offset):int(page_limit)],
            "good_feedbacks": good_feedbacks,
            "bad_feedbacks": bad_feedbacks,
            "pages_count": math.ceil(pages_count)
            }
        )
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})

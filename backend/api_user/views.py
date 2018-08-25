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


@api_view(['GET'])
def UserData(request, username):
    try:
        user = User.objects.get(username=username)

        twitter = Twitter.objects.filter(user=user).values('title', 'link', 'price_type', 'price', 'second_price')
        facebook = Facebook.objects.filter(user=user).values('title', 'link', 'price_type', 'price', 'second_price')
        youtube = Youtube.objects.filter(user=user).values('title', 'link', 'price_type', 'price', 'second_price')
        instagram = Instagram.objects.filter(user=user).values('title', 'link', 'price_type', 'price', 'second_price')
        vk = Vk.objects.filter(user=user).values('title', 'link', 'price_type', 'price', 'second_price')
        twitch = Twitch.objects.filter(user=user).values('title', 'link', 'price_type', 'price', 'second_price')
        other = Other.objects.filter(user=user).values('title', 'link', 'price_type', 'price', 'second_price')

        total_prods = twitter.count() + facebook.count() + youtube.count() + instagram.count() + vk.count() + twitch.count() + other.count()

        good_feedbacks = Feedback.objects.filter(to_user=user.pk, mark=True).count()
        bad_feedbacks = Feedback.objects.filter(to_user=user.pk, mark=False).count()

        likes = Like.objects.filter(to_user=user.pk).count()

        if user.account.show_feedback:
            all_feedbackes = []
            feedbackes = Feedback.objects.filter(to_user=user.pk).values('id', 'from_user', 'text', 'mark', 'date')
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
        else:
            all_feedbackes = []

        response = {
            'avatar': user.account.accountavatar.avatar.url,
            'profile_wallpaper': user.account.accountprofilewallpaper.wallpaper.url,
            'email': user.account.email,
            'email_is_confirmed': user.account.email_is_confirmed,
            'main_lang': user.account.main_lang,
            'status': user.account.status,
            'accept_orders': user.account.accept_orders,
            'show_in_market': user.account.show_in_market,
            'show_feedback': user.account.show_feedback,
            'info': user.account.information,
            'verified': user.account.verified,
            'username': user.username,
            'nickname': user.account.nickname,
            'reg_date': user.account.reg_date,
            'rating': good_feedbacks - bad_feedbacks,
            'likes': likes,

            'feedback': all_feedbackes[:4],

            'products': {
                'twitter': twitter,
                'facebook': facebook,
                'youtube': youtube,
                'instagram': instagram,
                'vk': vk,
                'twitch': twitch,
                'other': other,

                'total_prods': total_prods
            }
        }
        return Response(response)
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})

@api_view(['POST'])
def YourData(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        response = {
            'avatar': jwt_user.account.accountavatar.avatar.url,
            'profile_wallpaper': jwt_user.account.accountprofilewallpaper.wallpaper.url,
            'email': jwt_user.account.email,
            'email_is_confirmed': jwt_user.account.email_is_confirmed,
            'main_lang': jwt_user.account.main_lang,
            'status': jwt_user.account.status,
            'accept_orders': jwt_user.account.accept_orders,
            'show_in_market': jwt_user.account.show_in_market,
            'show_feedback': jwt_user.account.show_feedback,
            'info': jwt_user.account.information,
            'verified': jwt_user.account.verified,
            'username': jwt_user.username,
            'nickname': jwt_user.account.nickname,
            'reg_date': jwt_user.account.reg_date
        }
        return Response(response)
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
def Registration(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    email = data['email']
    login = data['login']
    password = data['password']

    try:
        validate_email(email)
    except ValidationError:
        return Response({'error': 'Email is not valid!'})
    if not email or not login or not password:
        return Response({'error': 'Empty fields!'})
    elif len(login) < 4:
        return Response({'error': 'Your login length should at least 4!'})
    elif len(login) > 15:
        return Response({'error': 'Your login length should not be more than 15!'})
    elif (' ' in login):
        return Response({'error': 'Your login should be a single word!'})
    elif len(password) < 6:
        return Response({'error': 'Your password length should be more than 6!'})
    elif Account.objects.filter(email = email.capitalize(), email_is_confirmed = True):
        return Response({'error': 'User with such email is already exist!'})
    elif User.objects.filter(username = login).exists():
        return Response({'error': 'User with such login is already exist!'})
    else:
        new_user = User.objects.create_user(email=email.capitalize(), username=login, password=password)
        new_account = Account.objects.create(user=new_user, email=email.capitalize(), email_confirm_code= email_code_generator(4), nickname=new_user.username, main_lang=1, password_reset_code=0, reg_ip=get_client_ip(request), last_ip=get_client_ip(request))
        account_avatar = AccountAvatar.objects.create(account=new_account)
        profile_wallpaper = AccountProfileWallpaper.objects.create(account=new_account)
        future = datetime.datetime.utcnow() + datetime.timedelta(days=1)
        payload = {
            "user_id": new_user.id,
            "exp": calendar.timegm(future.timetuple())
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
        encoded_token = encode(encoding_key, token)
        return Response({'token': encoded_token})

@api_view(['POST'])
def Authentication(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    login = data['login']
    password = data['password']

    user = authenticate(username= login, password= password)
    if user is not None:
        account = Account.objects.get(user= user)
        if not account.is_banned:
            this_user = User.objects.get(username= login)
            future = datetime.datetime.utcnow() + datetime.timedelta(days=1)
            payload = {
                "user_id": this_user.id,
                "exp": calendar.timegm(future.timetuple())
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256').decode('utf-8')
            encoded_token = encode(encoding_key, token)
            userIPsave = Account.objects.get(user= this_user.pk)
            userIPsave.last_ip=get_client_ip(request)
            userIPsave.save()
            return Response({'token': encoded_token})
        else:
            return Response({'error': 'You are banned!'})
    else:
        return Response({'error': 'Invalid credentials!'})

@api_view(['POST'])
def BanUser(request, user_id):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        manager_user = User.objects.get(pk=jwt_data['user_id'])
        if not manager_user.account.is_banned:
            bannning_user = User.objects.get(pk=user_id)
            if bannning_user.account.is_banned is not True:
                if manager_user.account.staff_level >= 3:
                    bannning_user.account.is_banned = True
                    bannning_user.account.save()
                    return Response({'User has been banned!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
            else:
                return Response({'error': 'This user is already banned!'})
        else:
            return Response({'error': 'You are banned!'})
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
def UnbanUser(request, user_id):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        manager_user = User.objects.get(pk=jwt_data['user_id'])
        if not manager_user.account.is_banned:
            unbannning_user = User.objects.get(pk=user_id)
            if unbannning_user.account.is_banned:
                if manager_user.account.staff_level >= 3:
                    unbannning_user.account.is_banned = False
                    unbannning_user.account.save()
                    return Response({'User has been unbanned!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
            else:
                return Response({'error': 'This user is not banned!'})
        else:
            return Response({'error': 'You are banned!'})
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
def DeleteUser(request, user_id):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        manager_user = User.objects.get(pk=jwt_data['user_id'])
        if not manager_user.account.is_banned:
            if manager_user.account.staff_level >= 3:
                deleting_user = User.objects.get(pk=user_id)
                deleting_user.delete()
                return Response({'Successfully deleted user!'})
            else:
                return Response({'error': "You don't have permissions to do that!"})
        else:
            return Response({'error': 'You are banned!'})
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
def SetAvatar(request):
    avatar = request.FILES['avatar']
    token = request.data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        if not jwt_user.account.is_banned:
            user_to_set = User.objects.get(pk=jwt_data['user_id'])
            if jwt_data['user_id'] == user_to_set.pk:
                if 'image/' in avatar.content_type:
                    if not 'image/gif' in avatar.content_type:
                        if AccountAvatar.objects.filter(account=user_to_set.account).exists():
                            user_avatar = AccountAvatar.objects.get(account=user_to_set.account)
                            if user_avatar.avatar == 'users_avatars/_user_default_avatar.svg':
                                user_avatar.avatar = avatar
                                user_avatar.save()
                                return Response({'You have successfully loadded a new avatar!'})
                            else:
                                os.remove(user_avatar.avatar.path)
                                user_avatar.avatar = avatar
                                user_avatar.save()
                                return Response({'You have successfully loadded a new avatar!'})
                        else:
                            new_avatar = AccountAvatar(account= user_to_set.account, avatar= avatar)
                            new_avatar.save()
                            return Response({'You have successfully loadded a new avatar!'})
                    else:
                        return Response({'error': 'You can not load gif images!'})
                else:
                    return Response({'error': 'This is not an image!'})
            else:
                return Response({'error': "You don't have permissions to do this!"})
        else:
            return Response({'error': 'You are banned'})
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
def RemoveAvatar(request):
    token = request.data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = jwt_data['user_id']
        user_to_set = User.objects.get(pk=jwt_data['user_id'])
        if jwt_user == user_to_set.pk:
            user_avatar = AccountAvatar.objects.get(account=user_to_set.account)
            if user_avatar.avatar == 'users_avatars/_user_default_avatar.svg':
                return Response({'error': "Standart avatar can't be removed!"})
            else:
                os.remove(user_avatar.avatar.path)
                user_avatar.avatar = 'users_avatars/_user_default_avatar.svg'
                user_avatar.save()
                return Response({"You successfully removed your avatar!"})
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
def SetProfileWallpaper(request):
    wallpaper = request.FILES['wallpaper']
    token = request.data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        if not jwt_user.account.is_banned:
            user_to_set = User.objects.get(pk=jwt_data['user_id'])
            if jwt_data['user_id'] == user_to_set.pk:
                if 'image/' in wallpaper.content_type:
                    if not 'image/gif' in wallpaper.content_type:
                        if AccountProfileWallpaper.objects.filter(account=user_to_set.account).exists():
                            profile_wallpaper = AccountProfileWallpaper.objects.get(account=user_to_set.account)
                            if profile_wallpaper.wallpaper == 'profile_wallpapers/_default_profile_wallpaper.png':
                                profile_wallpaper.wallpaper = wallpaper
                                profile_wallpaper.save()
                                return Response({'You have successfully loadded a new wallpaper!'})
                            else:
                                os.remove(profile_wallpaper.wallpaper.path)
                                profile_wallpaper.wallpaper = wallpaper
                                profile_wallpaper.save()
                                return Response({'You have successfully loadded a new wallpaper!'})
                        else:
                            new_wallpaper = AccountProfileWallpaper(account=user_to_set.account, wallpaper=wallpaper)
                            new_wallpaper.save()
                            return Response({'You have successfully loadded a new wallpaper!'})
                    else:
                        return Response({'error': 'You can not load gif images!'})
                else:
                    return Response({'error': 'This is not an image!'})
            else:
                return Response({'error': "You don't have permissions to do this!"})
        else:
            return Response({'error': 'You are banned'})
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
def RemoveProfileWallpaper(request):
    token = request.data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        user_to_set = User.objects.get(pk=jwt_data['user_id'])
        profile_wallpaper = AccountProfileWallpaper.objects.get(account=user_to_set.account)
        if profile_wallpaper.wallpaper == 'profile_wallpapers/_default_profile_wallpaper.png':
            return Response({"Standart wallpaper can't be removed!"})
        else:
            os.remove(profile_wallpaper.wallpaper.path)
            profile_wallpaper.wallpaper = 'profile_wallpapers/_default_profile_wallpaper.png'
            profile_wallpaper.save()
            return Response({"You successfully removed your wallpaper!"})
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
def AccountSettings(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    nickname = data['nickname']
    email = data['email']
    status = data['status']
    lang = data['lang']
    info = data['info']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        if nickname or email or status or not lang == "-1" or info:

            error_nickname = ''
            error_email = ''
            error_status = ''
            error_lang = ''
            error_info = ''

            success_nickname = ''
            success_email = ''
            success_status = ''
            success_lang = ''
            success_info = ''


            if nickname:
                if len(nickname) < 3:
                    error_nickname = 'Nickname length should be at least 4!'
                elif len(nickname) > 15:
                    error_nickname = 'Nickname length can not be more than 15!'
                else:
                    jwt_user.account.nickname = nickname
                    jwt_user.account.save()
                    success_nickname = 'You successfully changed your nickname!'

            if email:
                try:
                    validate_email(email)
                    if Account.objects.filter(email = email.capitalize(), email_is_confirmed = True):
                        error_email = 'User with such email is already exist!'
                    else:
                        jwt_user.account.email_is_confirmed = False
                        jwt_user.account.email = email.capitalize()
                        jwt_user.account.save()
                        success_email = 'You successfully changed your email but you need to confirm it!'
                except ValidationError:
                    error_email = 'Email is not valid!'

            if status:
                if len(status) > 25:
                    error_status = 'Status length can not be more than 25!'
                else:
                    jwt_user.account.status = status
                    jwt_user.account.save()
                    success_status = 'You are successfully changed your status!'

            if not lang == "-1":
                jwt_user.account.main_lang = lang
                jwt_user.account.save()
                success_lang = 'You are successfully changed your language!'

            if info:
                if len(info) > 300:
                    error_info = 'You information length can not be more that 300!'
                else:
                    jwt_user.account.information = info
                    jwt_user.account.save()
                    success_info = 'You are successfully changed your account information!'

            return Response({
            'error': {
                'nickname': error_nickname,
                'email':  error_email,
                'status': error_status,
                'lang': error_lang,
                'info': error_info
            }, "success": {
                'nickname': success_nickname,
                'email':  success_email,
                'status': success_status,
                'lang': success_lang,
                'info': success_info
            }
            })
        else:
            return Response({'error': 'Fields are empty!'})

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
def CommunicationSettings(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    accept_orders = data['accept_orders']
    show_in_market = data['show_in_market']
    show_feedback = data['show_feedback']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        if not accept_orders == 'nothing' or not show_in_market == 'nothing' or not show_feedback == 'nothing':

            if accept_orders == True or accept_orders == False:
                jwt_user.account.accept_orders = accept_orders
                jwt_user.account.save()

            if show_in_market == True or show_in_market == False:
                jwt_user.account.show_in_market = show_in_market
                jwt_user.account.save()

            if show_feedback == True or show_feedback == False:
                jwt_user.account.show_feedback = show_feedback
                jwt_user.account.save()

            return Response({'You have successfully changed your communication settings!'})
        else:
            return Response({'error': "You didn't changed anything!"})

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
def PasswordSettings(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    old_password = data['old_password']
    new_password = data['new_password']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        pas_check = jwt_user.check_password(old_password)
        if pas_check:
            jwt_user.set_password(new_password)
            jwt_user.save()
            return Response({'You have successfully changed your password!'})
        else:
            return Response({'error': 'Old password is invalid!'})

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
def SendEmailConfirmation(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    token = data['token']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        if not jwt_user.account.email_is_confirmed:
            jwt_user.account.email_confirm_code = email_code_generator(4)
            jwt_user.account.save()

            email_confirm_code = jwt_user.account.email_confirm_code
            user_email = jwt_user.account.email
            message = 'Hello! This is your confirmation code: ' + str(email_confirm_code) + ' !'
            send_mail(
                'MediaMoon email confirmation!',
                message,
                settings.EMAIL_HOST_USER,
                [user_email],
                fail_silently=False,
            )
            return Response({'Email has been sent!'})
        else:
            return Response({'error': 'Email is already confirmed!'})
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
def EmailConfirmation(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    code = data['code']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        if not jwt_user.account.email_is_confirmed:
            if code == jwt_user.account.email_confirm_code:
                jwt_user.account.email_confirm_code = 0
                jwt_user.account.email_is_confirmed = True
                jwt_user.account.save()
                return Response({"You have successfully confirmed your email address!"})
            else:
                return Response({'error': 'Confirmation code is not correct!'})
        else:
            return Response({'error': 'Email is already confirmed!'})

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
def SendPasswordResetCode(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    email = data['email']

    try:
        this_user = Account.objects.get(email=email.capitalize(), email_is_confirmed=True)
        this_user.password_reset_code = uuid.uuid4().hex
        this_user.save()

        user_id = this_user.user.pk
        password_reset_code = this_user.password_reset_code
        user_email = this_user.email
        message = 'Hello! This is MediaMoon password resetting message! Click on this link to reset your password: https://mediamoon.net/password_reset_confirm?u=' + str(user_id) + '&code=' + password_reset_code
        send_mail(
            'MediaMoon password reset!',
            message,
            settings.EMAIL_HOST_USER,
            [user_email],
            fail_silently=False,
        )
        return Response({'Email has been sent!'})
    except ObjectDoesNotExist:
        return Response({'error': 'User with such email is not found!'})


@api_view(['POST'])
def RecoverPassword(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    user_id = data['u']
    user_password_code = data['password_code']
    new_password = data['new_password']

    try:
        this_user = User.objects.get(pk=user_id)
        if this_user.account.password_reset_code == user_password_code:
            if not this_user.account.password_reset_code == 0:
                this_user.set_password(new_password)
                this_user.save()

                this_user.account.password_reset_code = 0
                this_user.account.save()
                return Response({'You have successfully changed your password!'})
            else:
                return Response({'error': "You don't have a password reset code!"})
        else:
            return Response({'error': 'You can not do it!'})
    except ObjectDoesNotExist:
        return Response({'error': 'User is not found!'})

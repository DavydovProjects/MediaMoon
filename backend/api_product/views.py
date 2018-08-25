from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.contenttypes.models import ContentType

from django.contrib.auth.models import User
from db_feedback.models import Feedback, FeedbackReport
from db_product.models import *

from api.view_funcs import *

import json, jwt, datetime, calendar, base64, os, uuid, binascii

@api_view(['POST'])
def CreateProduct(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    title = data['name']
    content_type = data['product_content']
    link = data['link']
    price = data['fprice']
    second_price = data['sprice']
    price_type = data['price_type']
    price_currency = data['price_currency']

    product_model_key = data['product_platform']

    details = data['details']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        if not jwt_user.account.is_banned:
            if int(product_model_key) == 1:
                Twitter.objects.create(user=jwt_user, link=link, title=title, details=details, content_type=int(content_type), price=int(price), second_price=int(second_price), price_type=int(price_type), price_currency=int(price_currency))
                return Response({'Product has been successfully created!'})
            elif int(product_model_key) == 2:
                Facebook.objects.create(user=jwt_user, link=link, title=title, details=details, content_type=int(content_type), price=int(price), second_price=int(second_price), price_type=int(price_type), price_currency=int(price_currency))
                return Response({'Product has been successfully created!'})
            elif int(product_model_key) == 3:
                Youtube.objects.create(user=jwt_user, link=link, title=title, details=details, content_type=int(content_type), price=int(price), second_price=int(second_price), price_type=int(price_type), price_currency=int(price_currency))
                return Response({'Product has been successfully created!'})
            elif int(product_model_key) == 4:
                Instagram.objects.create(user=jwt_user, link=link, title=title, details=details, content_type=int(content_type), price=int(price), second_price=int(second_price), price_type=int(price_type), price_currency=int(price_currency))
                return Response({'Product has been successfully created!'})
            elif int(product_model_key) == 5:
                Vk.objects.create(user=jwt_user, link=link, title=title, details=details, content_type=int(content_type), price=int(price), second_price=int(second_price), price_type=int(price_type), price_currency=int(price_currency))
                return Response({'Product has been successfully created!'})
            elif int(product_model_key) == 6:
                Twitch.objects.create(user=jwt_user, link=link, title=title, details=details, content_type=int(content_type), price=int(price), second_price=int(second_price), price_type=int(price_type), price_currency=int(price_currency))
                return Response({'Product has been successfully created!'})
            elif int(product_model_key) == 7:
                Other.objects.create(user=jwt_user, link=link, title=title, details=details, content_type=int(content_type), price=int(price), second_price=int(second_price), price_type=int(price_type), price_currency=int(price_currency))
                return Response({'Product has been successfully created!'})
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
def DeleteProduct(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    product_platform = data['product_platform']
    product_id = data['product_id']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])
        if not jwt_user.account.is_banned:
            if product_platform == 'twitter':
                if int(jwt_user.account.staff_level) >= 1 or  Twitter.objects.get(pk=product_id).user == jwt_user:
                    Twitter.objects.get(pk=product_id).delete()
                    return Response({'Produc has been successfully removed!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
            elif product_platform == 'facebook':
                if int(jwt_user.account.staff_level) >= 1 or  Facebook.objects.get(pk=product_id).user == jwt_user:
                    Facebook.objects.get(pk=product_id).delete()
                    return Response({'Produc has been successfully removed!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
            elif product_platform == 'youtube':
                if int(jwt_user.account.staff_level) >= 1 or  Youtube.objects.get(pk=product_id).user == jwt_user:
                    Youtube.objects.get(pk=product_id).delete()
                    return Response({'Produc has been successfully removed!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
            elif product_platform == 'instagram':
                if int(jwt_user.account.staff_level) >= 1 or  Instagram.objects.get(pk=product_id).user == jwt_user:
                    Instagram.objects.get(pk=product_id).delete()
                    return Response({'Produc has been successfully removed!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
            elif product_platform == 'vk':
                if int(jwt_user.account.staff_level) >= 1 or  Vk.objects.get(pk=product_id).user == jwt_user:
                    Vk.objects.get(pk=product_id).delete()
                    return Response({'Produc has been successfully removed!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
            elif product_platform == 'twitch':
                if int(jwt_user.account.staff_level) >= 1 or  Twitch.objects.get(pk=product_id).user == jwt_user:
                    Twitch.objects.get(pk=product_id).delete()
                    return Response({'Produc has been successfully removed!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
            elif product_platform == 'other':
                if int(jwt_user.account.staff_level) >= 1 or  Other.objects.get(pk=product_id).user == jwt_user:
                    Other.objects.get(pk=product_id).delete()
                    return Response({'Produc has been successfully removed!'})
                else:
                    return Response({'error': "You don't have permissions to do this!"})
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
def LoadData(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    platform_type = data['platform_type']

    try:
        user = User.objects.get(username=data['username'])
        if platform_type == 'twitter':
            prods = Twitter.objects.filter(user=user).values('id', 'title', 'link', 'price', 'second_price', 'price_type', 'details', 'price_currency', 'status', 'content_type')
            return Response({
                "prods": prods,
                "platform": "twitter"
            })
        elif platform_type == 'facebook':
            prods = Facebook.objects.filter(user=user).values('id', 'title', 'link', 'price', 'second_price', 'price_type', 'details', 'price_currency', 'status', 'content_type')
            return Response({
                "prods": prods,
                "platform": "facebook"
            })
        elif platform_type == 'youtube':
            prods = Youtube.objects.filter(user=user).values('id', 'title', 'link', 'price', 'second_price', 'price_type', 'details', 'price_currency', 'status', 'content_type')
            return Response({
                "prods": prods,
                "platform": "youtube"
            })
        elif platform_type == 'instagram':
            prods = Instagram.objects.filter(user=user).values('id', 'title', 'link', 'price', 'second_price', 'price_type', 'details', 'price_currency', 'status', 'content_type')
            return Response({
                "prods": prods,
                "platform": "instagram"
            })
        elif platform_type == 'vk':
            prods = Vk.objects.filter(user=user).values('id', 'title', 'link', 'price', 'second_price', 'price_type', 'details', 'price_currency', 'status', 'content_type')
            return Response({
                "prods": prods,
                "platform": "vk"
            })
        elif platform_type == 'twitch':
            prods = Twitch.objects.filter(user=user).values('id', 'title', 'link', 'price', 'second_price', 'price_type', 'details', 'price_currency', 'status', 'content_type')
            return Response({
                "prods": prods,
                "platform": "twitch"
            })
        elif platform_type == 'other':
            prods = Other.objects.filter(user=user).values('id', 'title', 'link', 'price', 'second_price', 'price_type', 'details', 'price_currency', 'status', 'content_type')
            return Response({
                "prods": prods,
                "platform": "other"
            })
        else:
            return Response({'error': 'Wrong platform!'})
    except ObjectDoesNotExist:
        return Response({'error': 'Object does not exist!'})

@api_view(['POST'])
def LoadOneData(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    product_id = data['product_id']
    product_model = data['product_model']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        if product_model == 'twitter':
            prod = Twitter.objects.get(id=product_id)
            if prod.user == jwt_user:
                return Response({
                    'id': prod.id,
                    'title': prod.title,
                    'link': prod.link,
                    'price': prod.price,
                    'second_price': prod.second_price,
                    'price_type': prod.price_type,
                    'details': prod.details,
                    'price_currency': prod.price_currency,
                    'status': prod.status,
                    'content_type': prod.content_type
                })
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'facebook':
            prod = Facebook.objects.get(id=product_id)
            if prod.user == jwt_user:
                return Response({
                    'id': prod.id,
                    'title': prod.title,
                    'link': prod.link,
                    'price': prod.price,
                    'second_price': prod.second_price,
                    'price_type': prod.price_type,
                    'details': prod.details,
                    'price_currency': prod.price_currency,
                    'status': prod.status,
                    'content_type': prod.content_type
                })
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'youtube':
            prod = Youtube.objects.get(id=product_id)
            if prod.user == jwt_user:
                return Response({
                    'id': prod.id,
                    'title': prod.title,
                    'link': prod.link,
                    'price': prod.price,
                    'second_price': prod.second_price,
                    'price_type': prod.price_type,
                    'details': prod.details,
                    'price_currency': prod.price_currency,
                    'status': prod.status,
                    'content_type': prod.content_type
                })
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'instagram':
            prod = Instagram.objects.get(id=product_id)
            if prod.user == jwt_user:
                return Response({
                    'id': prod.id,
                    'title': prod.title,
                    'link': prod.link,
                    'price': prod.price,
                    'second_price': prod.second_price,
                    'price_type': prod.price_type,
                    'details': prod.details,
                    'price_currency': prod.price_currency,
                    'status': prod.status,
                    'content_type': prod.content_type
                })
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'vk':
            prod = Vk.objects.get(id=product_id)
            if prod.user == jwt_user:
                return Response({
                    'id': prod.id,
                    'title': prod.title,
                    'link': prod.link,
                    'price': prod.price,
                    'second_price': prod.second_price,
                    'price_type': prod.price_type,
                    'details': prod.details,
                    'price_currency': prod.price_currency,
                    'status': prod.status,
                    'content_type': prod.content_type
                })
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'twitch':
            prod = Twitch.objects.get(id=product_id)
            if prod.user == jwt_user:
                return Response({
                    'id': prod.id,
                    'title': prod.title,
                    'link': prod.link,
                    'price': prod.price,
                    'second_price': prod.second_price,
                    'price_type': prod.price_type,
                    'details': prod.details,
                    'price_currency': prod.price_currency,
                    'status': prod.status,
                    'content_type': prod.content_type
                })
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'other':
            prod = Other.objects.get(id=product_id)
            if prod.user == jwt_user:
                return Response({
                    'id': prod.id,
                    'title': prod.title,
                    'link': prod.link,
                    'price': prod.price,
                    'second_price': prod.second_price,
                    'price_type': prod.price_type,
                    'details': prod.details,
                    'price_currency': prod.price_currency,
                    'status': prod.status,
                    'content_type': prod.content_type
                })
            else:
                return Response({'error': 'You can not do this!'})

        else:
            return Response({'error': 'Wrong platform!'})

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
def EditProduct(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    product_id = data['product_id']
    product_model = data['product_model']

    title = data['title']
    link = data['link']
    price = data['fprice']
    second_price = data['sprice']
    price_type = data['price_type']
    details = data['details']
    price_currency = data['price_currency']
    status = data['status']
    content_type = data['content_type']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        if product_model == 'twitter':
            prod = Twitter.objects.get(id=product_id)
            if prod.user == jwt_user:
                prod.title = title
                prod.link = link
                prod.price = price
                prod.second_price = second_price
                prod.price_type = price_type
                prod.details = details
                prod.price_currency = price_currency
                prod.status = status
                prod.content_type = content_type
                prod.save()
                return Response({'You have successfully eddited your product!'})
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'facebook':
            prod = Facebook.objects.get(id=product_id)
            if prod.user == jwt_user:
                prod.title = title
                prod.link = link
                prod.price = price
                prod.second_price = second_price
                prod.price_type = price_type
                prod.details = details
                prod.price_currency = price_currency
                prod.status = status
                prod.content_type = content_type
                prod.save()
                return Response({'You have successfully eddited your product!'})
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'youtube':
            prod = Youtube.objects.get(id=product_id)
            if prod.user == jwt_user:
                prod.title = title
                prod.link = link
                prod.price = price
                prod.second_price = second_price
                prod.price_type = price_type
                prod.details = details
                prod.price_currency = price_currency
                prod.status = status
                prod.content_type = content_type
                prod.save()
                return Response({'You have successfully eddited your product!'})
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'instagram':
            prod = Instagram.objects.get(id=product_id)
            if prod.user == jwt_user:
                prod.title = title
                prod.link = link
                prod.price = price
                prod.second_price = second_price
                prod.price_type = price_type
                prod.details = details
                prod.price_currency = price_currency
                prod.status = status
                prod.content_type = content_type
                prod.save()
                return Response({'You have successfully eddited your product!'})
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'vk':
            prod = Vk.objects.get(id=product_id)
            if prod.user == jwt_user:
                prod.title = title
                prod.link = link
                prod.price = price
                prod.second_price = second_price
                prod.price_type = price_type
                prod.details = details
                prod.price_currency = price_currency
                prod.status = status
                prod.content_type = content_type
                prod.save()
                return Response({'You have successfully eddited your product!'})
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'twitch':
            prod = Twitch.objects.get(id=product_id)
            if prod.user == jwt_user:
                prod.title = title
                prod.link = link
                prod.price = price
                prod.second_price = second_price
                prod.price_type = price_type
                prod.details = details
                prod.price_currency = price_currency
                prod.status = status
                prod.content_type = content_type
                prod.save()
                return Response({'You have successfully eddited your product!'})
            else:
                return Response({'error': 'You can not do this!'})

        elif product_model == 'other':
            prod = Other.objects.get(id=product_id)
            if prod.user == jwt_user:
                prod.title = title
                prod.link = link
                prod.price = price
                prod.second_price = second_price
                prod.price_type = price_type
                prod.details = details
                prod.price_currency = price_currency
                prod.status = status
                prod.content_type = content_type
                prod.save()
                return Response({'You have successfully eddited your product!'})
            else:
                return Response({'error': 'You can not do this!'})

        else:
            return Response({'error': 'Wrong platform!'})

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

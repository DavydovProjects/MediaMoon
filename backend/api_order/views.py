from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.contenttypes.models import ContentType

from django.contrib.auth.models import User
from db_feedback.models import Feedback, FeedbackReport
from db_product.models import Twitter, Facebook, Youtube, Vk, Instagram, Twitch, Other
from db_order.models import *
from db_account.models import *

from api.view_funcs import *

import json, jwt, datetime, calendar, base64, os, uuid, binascii, math


@api_view(['POST'])
def CreateOrder(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    to_user = data['to_user']
    products = data['products']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        to_user_obj = User.objects.get(username=to_user)
        if to_user_obj.account.accept_orders:
            if not AccountBans.objects.filter(from_user=to_user_obj.pk, to_user=jwt_data['user_id']):
                if not to_user == jwt_user.username:
                    new_order = Order.objects.create(from_user= jwt_data['user_id'], to_user=to_user_obj.pk)
                    for product in products:
                        if product['status'] == 1:
                            OrderProduct.objects.create(order=new_order, product_model=product['platform'], product_title=product['title'])
                        else:
                            return Response({'error': "You can't add to order not selling products!"})
                    return Response({
                        'resp': 'You have successfully submitted an order!',
                        'order_id': new_order.id
                    })
                else:
                    return Response({'error': 'You can not submit an order to yourself.'})
            else:
                return Response({'error': 'This user is banned you!'})
        else:
            return Response({'error': 'This user is currently not accepting orders!'})
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
def LoadOrder(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    order_id = data['order_id']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        this_order = Order.objects.get(pk=order_id)
        if jwt_user.pk == this_order.from_user or jwt_user.pk == this_order.to_user:

            if jwt_user.pk == this_order.from_user:
                to_user = User.objects.get(pk=this_order.to_user)
                from_user = User.objects.get(pk=this_order.from_user)

                res_users = {
                    'from_user_avatar': from_user.account.accountavatar.avatar.url,
                    'from_user_username': from_user.username,
                    'from_user_nickname': from_user.account.nickname,

                    'to_user_avatar': to_user.account.accountavatar.avatar.url,
                    'to_user_username': to_user.username,
                    'to_user_nickname': to_user.account.nickname,
                }

                order_status = this_order.status

                order_prods_list = OrderProduct.objects.filter(order=this_order).values('id', 'product_model', 'product_title')
                order_prods = []
                for prod in order_prods_list:
                    title = prod['product_title']
                    model = prod['product_model']
                    res = {
                        'title': title,
                        'platform': model
                    }
                    order_prods.append(res)

                return Response({'users': res_users, 'user_status': 'From', 'products': order_prods, 'order_status': order_status})

            if jwt_user.pk == this_order.to_user:
                to_user = User.objects.get(pk=this_order.to_user)
                from_user = User.objects.get(pk=this_order.from_user)

                res_users = {
                    'from_user_avatar': from_user.account.accountavatar.avatar.url,
                    'from_user_username': from_user.username,
                    'from_user_nickname': from_user.account.nickname,

                    'to_user_avatar': to_user.account.accountavatar.avatar.url,
                    'to_user_username': to_user.username,
                    'to_user_nickname': to_user.account.nickname,
                }

                order_status = this_order.status

                order_prods_list = OrderProduct.objects.filter(order=this_order.pk).values('id', 'product_model', 'product_title')
                order_prods = []
                for prod in order_prods_list:
                    title = prod['product_title']
                    model = prod['product_model']
                    res = {
                        'title': title,
                        'platform': model
                    }
                    order_prods.append(res)
                return Response({'users': res_users, 'user_status': 'To', 'products': order_prods, 'order_status': order_status})
        else:
            return Response({'error': 'You do not have permissions to load this order!'})
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
def LoadOrders(request, type):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    status = data['status']
    cur_page = data['cur_page']

    items_per_page = 12

    page_limit = items_per_page * int(cur_page)
    page_offset = page_limit - items_per_page

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        if type == 'outgoing':
            orders = []
            if status == "-1":
                orders = Order.objects.filter(from_user=jwt_data['user_id']).order_by('-date').values('id', 'to_user', 'status')
            else:
                orders = Order.objects.filter(from_user=jwt_data['user_id'], status=status).order_by('-date').values('id', 'to_user', 'status')
            res_list = []
            for order in orders:
                to_user = User.objects.get(pk=order['to_user'])
                this_order = Order.objects.get(pk=order['id'])

                order_prods = OrderProduct.objects.filter(order=this_order).values('product_model')
                prod_models = []
                for prod in order_prods:
                    prod_models.append(prod['product_model'])
                res = {
                    'id': order['id'],
                    'to_user': to_user.account.nickname,
                    'order_prods': prod_models,
                    'status': order['status']
                }
                res_list.append(res)
            pages_count = len(res_list) / items_per_page
            return Response({'res_list': res_list[int(page_offset):int(page_limit)], 'pages_count': math.ceil(pages_count)})
        if type == 'incoming':
            orders = 1
            if status == "-1":
                orders = Order.objects.filter(to_user=jwt_data['user_id']).order_by('-date').values('id', 'from_user', 'status')
            else:
                orders = Order.objects.filter(to_user=jwt_data['user_id'], status=status).order_by('-date').values('id', 'from_user', 'status')
            res_list = []
            for order in orders:
                from_user = User.objects.get(pk=order['from_user'])
                this_order = Order.objects.get(pk=order['id'])

                order_prods = OrderProduct.objects.filter(order=this_order).values('product_model')
                prod_models = []
                for prod in order_prods:
                    prod_models.append(prod['product_model'])
                res = {
                    'id': order['id'],
                    'to_user': from_user.account.nickname,
                    'order_prods': prod_models,
                    'status': order['status']
                }
                res_list.append(res)
            pages_count = len(res_list) / items_per_page
            return Response({'res_list': res_list[int(page_offset):int(page_limit)], 'pages_count': math.ceil(pages_count)})
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
def LoadOrderComments(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    order_id = data['order_id']

    cur_page = data['cur_page']

    items_per_page = 10

    page_limit = items_per_page * int(cur_page)
    page_offset = page_limit - items_per_page

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        this_order = Order.objects.get(pk=order_id)
        if jwt_user.pk == this_order.from_user or jwt_user.pk == this_order.to_user:
            comments = reversed(OrderComment.objects.filter(order=this_order).values('id', 'user', 'text', 'date'))
            order_comments = []
            for comment in comments:
                this_user = User.objects.get(id=comment['user'])
                this_user_nickname = this_user.account.nickname
                this_user_avatar = this_user.account.accountavatar.avatar.url
                res = {
                    'id': comment['id'],
                    'this_user_nickname': this_user_nickname,
                    'this_user_avatar': this_user_avatar,
                    'text': comment['text'],
                    'date': comment['date']
                }
                order_comments.append(res)
            pages_count = len(order_comments) / items_per_page
            return Response({'order_comments': reversed(order_comments[:int(page_limit)]), 'pages_count': math.ceil(pages_count), 'comments_count': len(OrderComment.objects.filter(order=this_order).values('id', 'user', 'text', 'date'))})
        else:
            return Response({'error': 'You do not have permissions to load this order!'})
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
def SendComment(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    order_id = data['order_id']
    text = data['text']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        this_order = Order.objects.get(pk=order_id)

        if jwt_user.pk == this_order.from_user or jwt_user.pk == this_order.to_user:
            if this_order.status == 1:
                OrderComment.objects.create(order=this_order, user=jwt_user, text=text)
                return Response({'Successfully add a new comment!'})
            else:
                return Response({'error': "You can't send messages to this order!"})
        else:
            return Response({'error': 'You can not comment this order!'})
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
def ChangeOrderStatus(request, status):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    order_id = data['order_id']

    token = data['token']
    try:
        decoded_token = decode(encoding_key, token)
        jwt_data = jwt.decode(decoded_token, 'secret', algorithms=['HS256'])
        jwt_user = User.objects.get(pk=jwt_data['user_id'])

        this_order = Order.objects.get(pk=order_id)
        if jwt_user.pk == this_order.from_user or jwt_user.pk == this_order.to_user:

            if status == 'cancel':
                if not this_order.status == 2:
                    this_order.status = 3
                    this_order.save()
                    return Response({'Status successfully changed!'})
                else:
                    return Response({'error': "You can't cancel this order!"})

            if status == 'accept':
                if jwt_user.pk == this_order.to_user:
                    if this_order.status == 0:
                        this_order.status = 1
                        this_order.save()
                        return Response({'Status successfully changed!'})
                    else:
                        return Response({'error': "You can't accept this order!"})
                else:
                    return Response({'error': "You don't have permissions to do this!"})

            if status == 'done':
                if jwt_user.pk == this_order.to_user:
                    if this_order.status == 1:
                        this_order.status = 2
                        this_order.save()
                        return Response({'Status successfully changed!'})
                    else:
                        return Response({'error': "You can't change status of  this order!"})
                else:
                    return Response({'error': "You don't have permissions to do this!"})

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

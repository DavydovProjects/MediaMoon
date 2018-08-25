from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.http import HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.utils import timezone


from django.contrib.auth.models import User
from db_account.models import *
from db_product.models import *
from db_feedback.models import Feedback

from api.view_funcs import *

from itertools import chain

import json, jwt, datetime, calendar, base64, os, uuid, binascii, math, random


@api_view(['POST'])
def LoadData(request):
    body = request.body.decode('utf-8')
    data = json.loads(body)

    cur_page = data['cur_page']

    items_per_page = 12

    page_limit = items_per_page * int(cur_page)
    page_offset = page_limit - items_per_page


    filter = {
        'twitter_filter': data['twitter'],
        'facebook_filter': data['facebook'],
        'youtube_filter': data['youtube'],
        'instagram_filter': data['instagram'],
        'twitch_filter': data['twitch'],
        'vk_filter': data['vk'],
        'other_filter': data['other'],
    }

    result_filter = []
    for elem in filter:
        if not filter[elem] == False:
            result_filter.append(elem)

    if len(result_filter) > 0:
        twitter = ''
        facebook = ''
        youtube = ''
        instagram = ''
        vk = ''
        twitch = ''
        other = ''
        if not data['content_type'] == "False":
            if 'twitter_filter' in result_filter:
                twitter = Twitter.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            if 'facebook_filter' in result_filter:
                facebook = Facebook.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            if 'youtube_filter' in result_filter:
                youtube = Youtube.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            if 'instagram_filter' in result_filter:
                instagram = Instagram.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            if 'twitch_filter' in result_filter:
                twitch = Twitch.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            if 'vk_filter' in result_filter:
                vk = Vk.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            if 'other_filter' in result_filter:
                other = Other.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
        else:
            if 'twitter_filter' in result_filter:
                twitter = Twitter.objects.values_list('user', flat=True)
            if 'facebook_filter' in result_filter:
                facebook = Facebook.objects.values_list('user', flat=True)
            if 'youtube_filter' in result_filter:
                youtube = Youtube.objects.values_list('user', flat=True)
            if 'instagram_filter' in result_filter:
                instagram = Instagram.objects.values_list('user', flat=True)
            if 'twitch_filter' in result_filter:
                twitch = Twitch.objects.values_list('user', flat=True)
            if 'vk_filter' in result_filter:
                vk = Vk.objects.values_list('user', flat=True)
            if 'other_filter' in result_filter:
                other = Other.objects.values_list('user', flat=True)
        all = list(chain(twitter, facebook, youtube, instagram, vk, twitch, other))
        filtered = list(set(all))

        filtered_lang = []
        for id in filtered:
            this_user = User.objects.get(pk=id)
            if this_user.account.show_in_market:
                if not data['main_lang'] == "-1":
                    if this_user.account.main_lang == data['main_lang']:
                        filtered_lang.append(this_user.pk)
                else:
                    filtered_lang.append(this_user.pk)

        result = []
        for id in filtered_lang:
            filter_user = User.objects.get(pk=id)
            if data['nickname'] == "False@@@$#%^&*()":
                if data['verified']:
                    if filter_user.account.verified:
                        good_feedbacks = Feedback.objects.filter(to_user=id, mark=True).count()
                        bad_feedbacks = Feedback.objects.filter(to_user=id, mark=False).count()
                        rating = good_feedbacks - bad_feedbacks

                        have_twitter= Twitter.objects.filter(user=filter_user).count()
                        have_facebook= Facebook.objects.filter(user=filter_user).count()
                        have_youtube= Youtube.objects.filter(user=filter_user).count()
                        have_instagram= Instagram.objects.filter(user=filter_user).count()
                        have_vk= Vk.objects.filter(user=filter_user).count()
                        have_twitch= Twitch.objects.filter(user=filter_user).count()
                        have_other= Other.objects.filter(user=filter_user).count()

                        have = [
                            have_twitter, have_facebook, have_youtube, have_instagram, have_vk, have_twitch, have_other
                        ]
                        resp = (filter_user.account.nickname, filter_user.account.accountavatar.avatar.url, rating, have, filter_user.username, filter_user.account.verified, filter_user.account.main_lang)
                        result.append(resp)
                else:
                    good_feedbacks = Feedback.objects.filter(to_user=id, mark=True).count()
                    bad_feedbacks = Feedback.objects.filter(to_user=id, mark=False).count()
                    rating = good_feedbacks - bad_feedbacks

                    have_twitter= Twitter.objects.filter(user=filter_user).count()
                    have_facebook= Facebook.objects.filter(user=filter_user).count()
                    have_youtube= Youtube.objects.filter(user=filter_user).count()
                    have_instagram= Instagram.objects.filter(user=filter_user).count()
                    have_vk= Vk.objects.filter(user=filter_user).count()
                    have_twitch= Twitch.objects.filter(user=filter_user).count()
                    have_other= Other.objects.filter(user=filter_user).count()

                    have = [
                        have_twitter, have_facebook, have_youtube, have_instagram, have_vk, have_twitch, have_other
                    ]
                    resp = (filter_user.account.nickname, filter_user.account.accountavatar.avatar.url, rating, have, filter_user.username, filter_user.account.verified, filter_user.account.main_lang)
                    result.append(resp)
            else:
                if filter_user.account.nickname == data['nickname']:
                    if data['verified']:
                        if filter_user.account.verified:
                            good_feedbacks = Feedback.objects.filter(to_user=id, mark=True).count()
                            bad_feedbacks = Feedback.objects.filter(to_user=id, mark=False).count()
                            rating = good_feedbacks - bad_feedbacks

                            have_twitter= Twitter.objects.filter(user=filter_user).count()
                            have_facebook= Facebook.objects.filter(user=filter_user).count()
                            have_youtube= Youtube.objects.filter(user=filter_user).count()
                            have_instagram= Instagram.objects.filter(user=filter_user).count()
                            have_vk= Vk.objects.filter(user=filter_user).count()
                            have_twitch= Twitch.objects.filter(user=filter_user).count()
                            have_other= Other.objects.filter(user=filter_user).count()

                            have = [
                                have_twitter, have_facebook, have_youtube, have_instagram, have_vk, have_twitch, have_other
                            ]
                            resp = (filter_user.account.nickname, filter_user.account.accountavatar.avatar.url, rating, have, filter_user.username, filter_user.account.verified, filter_user.account.main_lang)
                            result.append(resp)
                    else:
                        good_feedbacks = Feedback.objects.filter(to_user=id, mark=True).count()
                        bad_feedbacks = Feedback.objects.filter(to_user=id, mark=False).count()
                        rating = good_feedbacks - bad_feedbacks

                        have_twitter= Twitter.objects.filter(user=filter_user).count()
                        have_facebook= Facebook.objects.filter(user=filter_user).count()
                        have_youtube= Youtube.objects.filter(user=filter_user).count()
                        have_instagram= Instagram.objects.filter(user=filter_user).count()
                        have_vk= Vk.objects.filter(user=filter_user).count()
                        have_twitch= Twitch.objects.filter(user=filter_user).count()
                        have_other= Other.objects.filter(user=filter_user).count()

                        have = [
                            have_twitter, have_facebook, have_youtube, have_instagram, have_vk, have_twitch, have_other
                        ]
                        resp = (filter_user.account.nickname, filter_user.account.accountavatar.avatar.url, rating, have, filter_user.username, filter_user.account.verified, filter_user.account.main_lang)
                        result.append(resp)

        pages_count = len(result) / items_per_page
        if data['rating'] == 1:
            sorted_result = sorted(result, key=lambda val: val[2])[int(page_offset):int(page_limit)]
            products_response = [sorted_result, math.ceil(pages_count)]
            return Response(products_response)
        elif data['rating'] == 2:
            sorted_result = sorted(result, key=lambda val: val[2], reverse=True)[int(page_offset):int(page_limit)]
            products_response = [sorted_result, math.ceil(pages_count)]
            return Response(products_response)
        else:
            sorted_result = result[::-1][int(page_offset):int(page_limit)]
            products_response = [sorted_result, math.ceil(pages_count)]
            return Response(products_response)
    else:
        if not data['content_type'] == "False":
            twitter = Twitter.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            facebook = Facebook.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            youtube = Youtube.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            instagram = Instagram.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            vk = Vk.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            twitch = Twitch.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
            other = Other.objects.filter(content_type=data['content_type']).values_list('user', flat=True)
        else:
            twitter = Twitter.objects.values_list('user', flat=True)
            facebook = Facebook.objects.values_list('user', flat=True)
            youtube = Youtube.objects.values_list('user', flat=True)
            instagram = Instagram.objects.values_list('user', flat=True)
            vk = Vk.objects.values_list('user', flat=True)
            twitch = Twitch.objects.values_list('user', flat=True)
            other = Other.objects.values_list('user', flat=True)

        all = list(chain(twitter, facebook, youtube, instagram, vk, twitch, other))
        filtered = list(set(all))

        filtered_lang = []
        for id in filtered:
            this_user = User.objects.get(pk=id)
            if this_user.account.show_in_market:
                if not data['main_lang'] == "-1":
                    if this_user.account.main_lang == data['main_lang']:
                        filtered_lang.append(this_user.pk)
                else:
                    filtered_lang.append(this_user.pk)

        result = []
        for id in filtered_lang:
            filter_user = User.objects.get(pk=id)
            if data['nickname'] == "False@@@$#%^&*()":
                if data['verified']:
                    if filter_user.account.verified:
                        good_feedbacks = Feedback.objects.filter(to_user=id, mark=True).count()
                        bad_feedbacks = Feedback.objects.filter(to_user=id, mark=False).count()
                        rating = good_feedbacks - bad_feedbacks

                        have_twitter= Twitter.objects.filter(user=filter_user).count()
                        have_facebook= Facebook.objects.filter(user=filter_user).count()
                        have_youtube= Youtube.objects.filter(user=filter_user).count()
                        have_instagram= Instagram.objects.filter(user=filter_user).count()
                        have_vk= Vk.objects.filter(user=filter_user).count()
                        have_twitch= Twitch.objects.filter(user=filter_user).count()
                        have_other= Other.objects.filter(user=filter_user).count()

                        have = [
                            have_twitter, have_facebook, have_youtube, have_instagram, have_vk, have_twitch, have_other
                        ]
                        resp = (filter_user.account.nickname, filter_user.account.accountavatar.avatar.url, rating, have, filter_user.username, filter_user.account.verified, filter_user.account.main_lang)
                        result.append(resp)
                else:
                    good_feedbacks = Feedback.objects.filter(to_user=id, mark=True).count()
                    bad_feedbacks = Feedback.objects.filter(to_user=id, mark=False).count()
                    rating = good_feedbacks - bad_feedbacks

                    have_twitter= Twitter.objects.filter(user=filter_user).count()
                    have_facebook= Facebook.objects.filter(user=filter_user).count()
                    have_youtube= Youtube.objects.filter(user=filter_user).count()
                    have_instagram= Instagram.objects.filter(user=filter_user).count()
                    have_vk= Vk.objects.filter(user=filter_user).count()
                    have_twitch= Twitch.objects.filter(user=filter_user).count()
                    have_other= Other.objects.filter(user=filter_user).count()

                    have = [
                        have_twitter, have_facebook, have_youtube, have_instagram, have_vk, have_twitch, have_other
                    ]
                    resp = (filter_user.account.nickname, filter_user.account.accountavatar.avatar.url, rating, have, filter_user.username, filter_user.account.verified, filter_user.account.main_lang)
                    result.append(resp)
            else:
                if filter_user.account.nickname == data['nickname']:
                    if data['verified']:
                        if filter_user.account.verified:
                            good_feedbacks = Feedback.objects.filter(to_user=id, mark=True).count()
                            bad_feedbacks = Feedback.objects.filter(to_user=id, mark=False).count()
                            rating = good_feedbacks - bad_feedbacks

                            have_twitter= Twitter.objects.filter(user=filter_user).count()
                            have_facebook= Facebook.objects.filter(user=filter_user).count()
                            have_youtube= Youtube.objects.filter(user=filter_user).count()
                            have_instagram= Instagram.objects.filter(user=filter_user).count()
                            have_vk= Vk.objects.filter(user=filter_user).count()
                            have_twitch= Twitch.objects.filter(user=filter_user).count()
                            have_other= Other.objects.filter(user=filter_user).count()

                            have = [
                                have_twitter, have_facebook, have_youtube, have_instagram, have_vk, have_twitch, have_other
                            ]
                            resp = (filter_user.account.nickname, filter_user.account.accountavatar.avatar.url, rating, have, filter_user.username, filter_user.account.verified, filter_user.account.main_lang)
                            result.append(resp)
                    else:
                        good_feedbacks = Feedback.objects.filter(to_user=id, mark=True).count()
                        bad_feedbacks = Feedback.objects.filter(to_user=id, mark=False).count()
                        rating = good_feedbacks - bad_feedbacks

                        have_twitter= Twitter.objects.filter(user=filter_user).count()
                        have_facebook= Facebook.objects.filter(user=filter_user).count()
                        have_youtube= Youtube.objects.filter(user=filter_user).count()
                        have_instagram= Instagram.objects.filter(user=filter_user).count()
                        have_vk= Vk.objects.filter(user=filter_user).count()
                        have_twitch= Twitch.objects.filter(user=filter_user).count()
                        have_other= Other.objects.filter(user=filter_user).count()

                        have = [
                            have_twitter, have_facebook, have_youtube, have_instagram, have_vk, have_twitch, have_other
                        ]
                        resp = (filter_user.account.nickname, filter_user.account.accountavatar.avatar.url, rating, have, filter_user.username, filter_user.account.verified, filter_user.account.main_lang)
                        result.append(resp)

        pages_count = len(result) / items_per_page
        if data['rating'] == 1:
            sorted_result = sorted(result, key=lambda val: val[2])[int(page_offset):int(page_limit)]
            products_response = [sorted_result, math.ceil(pages_count)]
            return Response(products_response)
        elif data['rating'] == 2:
            sorted_result = sorted(result, key=lambda val: val[2], reverse=True)[int(page_offset):int(page_limit)]
            products_response = [sorted_result, math.ceil(pages_count)]
            return Response(products_response)
        else:
            sorted_result = result[::-1][int(page_offset):int(page_limit)]
            products_response = [sorted_result, math.ceil(pages_count)]
            return Response(products_response)

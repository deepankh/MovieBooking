#!/usr/bin/python
# -*- coding: utf-8 -*-
import cgi
import datetime
import urllib
import wsgiref.handlers
import os
import webapp2
import json

from google.appengine.ext.webapp import template
from google.appengine.ext import blobstore
from google.appengine.api import users

import ticketbookingsystem as tbs

user = {'a@b.com': 'pass' , 'ddj@b.com': 'pass'}

shows = {'102 Not Out!': [ 10 , 60 ] ,
         'Hellsing': [ 60 , 6 ] ,
         'Avengers Infinity War': [ 50 , 7 ] ,
         }

keys , values = shows.keys () , shows.values ()
length_keys = len (keys)


class MainPage (webapp2.RequestHandler):

    def get (self):
        if self.request.get ('format') == 'json':
            self.response.out.headers[ 'content-type' ] = 'text/json'
            self.response.out.write (json.dumps (shows))
            return

        Logon = {
            'shows': shows
        }

        path = os.path.join (os.path.dirname (__file__) , 'index.html')
        self.response.out.write (template.render (path , Logon))


class Login (webapp2.RequestHandler):

    def post (self):
        upload_url_rpc = blobstore.create_upload_url_async ('/upload')
        upload_url = upload_url_rpc.get_result ()

        data=upload_url
        print data
        movie_name = data
        print(movie_name)
        number = data[2]
        print(number)
        timing =  data[1]
        print(timing)

        if (timing == 'evening'):
            movie = shows.get (movie_name)
            tickets_avail = movie[ 0 ] - number
            temp = movie[ 1 ]
            shows[ movie_name ] = [ tickets_avail , temp ]
            return
        else:
            movie = shows[ movie_name ]
            tickets_avail = movie[ 1 ] - number
            temp = movie[ 0 ]
            shows[ movie_name ] = [ temp , tickets_avail ]
            return
        # self.response.out.headers[ 'content-type' ] = 'text/json'
        # self.response.out.write (json.dumps (shows))
        # return


class ticketBooking (webapp2.RequestHandler):
    def get (self):
        self.response.out.headers[ 'content-type' ] = 'text/json'
        self.response.out.write (json.dumps (shows))
        return


application = webapp2.WSGIApplication ([ ('/' , MainPage) ,
                                         ('/ticketBooking' , ticketBooking) ,
                                         ('/SummaryPage' , Login) ] ,
                                       debug=True)  # ('/UserPage/',Validation)


def main ():
    application.run ()


if __name__ == '__main__':
    main ()

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
         'test':[5,5]
         }

keys , values = shows.keys () , shows.values ()
length_keys = len (keys)


class MainPage (webapp2.RequestHandler):

    def get (self):

        movieDetails = {
            'shows': shows
        }

        path = os.path.join (os.path.dirname (__file__) , 'index.html')
        self.response.out.write (template.render (path , movieDetails))


class summaryPage (webapp2.RequestHandler):

    def post (self):

        data = json.loads(self.request.body)

        movie_name = data["movieid"]
        print(movie_name)

        number = int(data["numberid"])
        print(number)

        timing =  data["timingid"]
        print(timing)

        if timing == 'evening':
            movie = shows.get (movie_name)
            tickets_avail = movie[ 0 ] - number
            temp = movie[ 1 ]
            shows[ movie_name ] = [ tickets_avail , temp ]

        else:
            movie = shows[ movie_name ]
            tickets_avail = movie[ 1 ] - number
            temp = movie[ 0 ]
            shows[ movie_name ] = [ temp , tickets_avail ]

        self.response.out.headers[ 'content-type' ] = 'application/json'
        self.response.out.write (data)



class ticketBooking (webapp2.RequestHandler):
    def get (self):
        self.response.out.headers[ 'content-type' ] = 'text/json'
        self.response.out.write (json.dumps (shows))



application = webapp2.WSGIApplication ([ ('/' , MainPage) ,
                                         ('/ticketBooking' , ticketBooking) ,
                                         ('/SummaryPage' , summaryPage) ] ,
                                       debug=True)


def main ():
    application.run ()


if __name__ == '__main__':
    main ()

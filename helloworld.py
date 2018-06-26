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
from google.appengine.ext import db
from google.appengine.api import users

import ticketbookingsystem as tbs

user = {'a@b.com': 'pass', 'ddj@b.com': 'pass'}

shows = {'102 Not Out!': [10, 60],
         'Hellsing': [60, 6],
         'Avengers Infinity War': [50, 7],
         }

keys, values = shows.keys(), shows.values()
length_keys = len(keys)


class MainPage(webapp2.RequestHandler):

    def get(self):
        if self.request.get('format')=='json':
            self.response.out.headers['content-type']='text/json'
            self.response.out.write(json.dumps(shows))
            return  

        Logon = {
                 'shows': shows
                 }

        path = os.path.join(os.path.dirname(__file__), 'index.html')
        self.response.out.write(template.render(path, Logon))


class Login(webapp2.RequestHandler):

    def post(self):
        movie_name = str(self.request.get('movie-id'))
        number = int(self.request.get('number-id'))
        timing = str(self.request.get('timing-id'))

        if (timing == 'evening'):
            movie = shows[movie_name]
            tickets_avail = movie[0] - number
            temp = movie[1]
            shows[movie_name] = [tickets_avail, temp]
        else:
            movie = shows[movie_name]
            tickets_avail = movie[1] - number
            temp = movie[0]
            shows[movie_name] = [ temp,tickets_avail]
        Logon = {'movie_name': movie_name, 'number': number, 'timing': timing}
        path = os.path.join(os.path.dirname(__file__), 'SummaryPage.html')
        self.response.out.write(template.render(path, Logon))

class test(webapp2.RequestHandler):
    def get(self):
        self.response.out.headers['content-type']='text/json'
        self.response.out.write(json.dumps(shows))

    

application = webapp2.WSGIApplication([('/', MainPage), 
                                        ('/SummaryPage',Login),
                                        ('/test',test)], 
                                        debug=True)  # ('/UserPage/',Validation)


def main():
    application.run()


if __name__ == '__main__':
    main()

import requests
import os
import time
import urllib.request
import uuid


class AvActressWorker:

    def __init__(self):
        self.titles = []
        self.files = []
        self.get_wiki_titles()
        self.get_title_files()

    def get_wiki_titles(self, cmcontinue=""):
        main_category = "Category:Porn_actresses_from_Japan"
        category_url = "https://commons.wikimedia.org/w/api.php" + \
                       "?action=query&list=categorymembers&format=json&cmtitle=" + \
                       main_category
        if cmcontinue != "":
            category_url += "&cmcontinue=" + cmcontinue
        json_response = requests.get(category_url).json()
        if 'continue' in json_response:
            if 'cmcontinue' in json_response['continue']:
                self.get_wiki_titles(json_response['continue']['cmcontinue'])
        if 'query' not in json_response:
            return
        query = json_response['query']
        if 'categorymembers' not in query:
            return
        members = query['categorymembers']
        for member in members:
            self.titles.append(member['title'])

    def get_valid_image_url(self, file_name):
        request_url = "https://commons.wikimedia.org/w/api.php?" + \
                      "action=query&prop=imageinfo&iiprop=url&format=json"
        json_response = requests.get(request_url + "&titles=" + file_name).json()
        if 'query' not in json_response:
            return ''
        if 'pages' not in json_response['query']:
            return ''
        pages = json_response['query']['pages']
        if len(pages) == 0:
            return ''
        for page_id in pages:
            page = pages[page_id]
            if 'imageinfo' not in page:
                return ''
            info = page['imageinfo']
            for item in info:
                if 'url' not in item:
                    continue
                return item['url']
        return ''

    def get_title_files(self):
        file_url = "https://commons.wikimedia.org/w/api.php" + \
                   "?action=query&list=categorymembers&cmtype=file&format=json"
        for title in self.titles:
            normalized_url = file_url + "&cmtitle=" + title
            json_files = requests.get(normalized_url).json()
            if 'query' not in json_files:
                continue
            query = json_files['query']
            if 'categorymembers' not in query:
                continue
            members = json_files['query']['categorymembers']
            for member in members:
                file_name = member['title']
                validation = self.get_valid_image_url(file_name)
                if validation != '':
                    self.files.append(validation)

    def save_files(self):
        storage = "./downloads/"
        if not os.path.exists(storage):
            os.makedirs(storage)
        directory = storage + str(int(time.time()))
        if not os.path.exists(directory):
            os.makedirs(directory)
        for file in self.files:
            urllib.request.urlretrieve(file, directory + "/" + str(uuid.uuid4()) + ".jpg")


worker = AvActressWorker()
worker.save_files()

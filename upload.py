#!./.venv/bin/python3

import yadisk
import json
import os
import posixpath

TOKEN = json.load(open("config.json"))["TOKEN"]

DIR = "Akusher.S01"

y = yadisk.YaDisk(token=TOKEN)

print(y.check_token())

def upload(client: yadisk.Client, from_dir: str, to_dir: str):
    for root, dirs, files in os.walk(from_dir):
        p = root.split(from_dir)[1].strip(os.path.sep)
        dir_path = posixpath.join(to_dir, p)

        try:
            client.mkdir(dir_path)
        except yadisk.exceptions.PathExistsError:
            pass

        for file in files:
            file_path = posixpath.join(dir_path, file)
            p_sys = p.replace("/", os.path.sep)
            in_path = os.path.join(from_dir, p_sys, file)
            print(f"UPLOADING {in_path}... ")

            client.upload(in_path, file_path, overwrite=True)
upload(y, DIR, DIR)
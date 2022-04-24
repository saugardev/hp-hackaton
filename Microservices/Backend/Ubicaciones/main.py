import json
import re

import gpxpy
import numpy as np
import pymongo
import pandas as pd
import os
import pymongo
import xmltodict as xmltodict
from gpx_converter import Converter

#Conexion con mongo.

client = pymongo.MongoClient("mongodb+srv://root:root@cluster0.jntcr.mongodb.net/Anthem?retryWrites=true&w=majority")

#Obtencion del datashet a partir del archivo python

filePath = os.path.abspath(__file__)
datasetTraficoPath = os.chdir(filePath + "/../../../../Datasets/Ubicaciones")
files = os.listdir(datasetTraficoPath)

#Recorrer todos los csv de trafico.

for file in files:
    if file.endswith("Acustico.csv"):
        csv = pd.read_csv(file, sep=';', encoding="unicode_escape")
        dataset = pd.DataFrame(csv)
        # Generamos los documentos para guardar en la base de datos
        data = dataset.to_dict(orient="records")
        myCol = client.Anthem.UbiAcustica
        myCol.insert_many(data)
    elif file.endswith(".gpx"):
        data = open(file).read()

        lat = np.array(re.findall(r'lat="([^"]+)', data), dtype=float)
        lon = np.array(re.findall(r'lon="([^"]+)', data), dtype=float)
        time = re.findall(r'<name>([^\<]+)', data)

        combined = list(zip(lat, lon, time))
        #print(combined)
        output = []
        key = ['latitude', 'longitude', 'name']
        for c in combined:
            dict = {k:v for k, v in zip(key, c)}
            output.append(dict)
        #lists = combined.tolist()
        #json_str =

        print(output)
        if file.endswith("Autobus.gpx"):
            collection = client.Anthem.Autobuses
            collection.insert_many(output)
        elif file.endswith("Cercanias.gpx"):
            collection = client.Anthem.Cercanias
            collection.insert_many(output)
        elif file.endswith("Metro.gpx"):
            collection = client.Anthem.Metro
            collection.insert_many(output)
        elif file.endswith("Interurbano.gpx"):
            collection = client.Anthem.Interurbano
            collection.insert_many(output)
        elif file.endswith("MetroLigero.gpx"):
            collection = client.Anthem.MetroLigero
            collection.insert_many(output)
        elif file.endswith("Taxi.gpx"):
            collection = client.Anthem.Taxi
            collection.insert_many(output)

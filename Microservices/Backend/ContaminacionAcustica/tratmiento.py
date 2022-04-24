
import pandas as pd

import os

import pymongo

import json



#Guardamos la ubicación del archivo
from bson import encode
from bson import BSON
from pandas import DataFrame

filePath = os.path.abspath(__file__)
print(filePath)
#Guardamos la direccion del archivo al que queremos acceder
filePath += "/../../../../Datasets/Anthem_CTC_ContaminacionAcustica.csv"
dataset = pd.read_csv(filePath, sep=";", encoding="unicode_escape")
#Borramos columnas
dataset = pd.DataFrame(dataset)
dataset.drop(['LAS01', 'LAS10', 'LAS50', 'LAS90', 'LAS99'], axis=1, inplace=True)


#Generamos los documentos para guardar en la base de datos
data = dataset.to_dict(orient="records")
print(data)

myClient = pymongo.MongoClient("mongodb+srv://root:root@cluster0.jntcr.mongodb.net/Anthem?retryWrites=true&w=majority")

mycol= myClient.Anthem.ContAcus
#for element in data['']:

mycol.insert_many(data)
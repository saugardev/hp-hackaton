import pandas as pd
import os

import pymongo

import json



#Guardamos la ubicación del archivo
from bson import encode
from bson import BSON
from pandas import DataFrame

filePath = os.path.abspath(__file__)
#Guardamos la direccion del archivo al que queremos acceder
filePath += "/../../../../Datasets/Anthem_CTC_Contenedores_Ubicacion.csv"
dataset = pd.read_csv(filePath, sep=";", encoding="unicode_escape")
#Borramos columnas
dataset = pd.DataFrame(dataset)
dataset.drop(['Cantidad', 'DIRECCION'], axis=1, inplace=True)


#Generamos los documentos para guardar en la base de datos
data = dataset.to_dict(orient="records")

myClient = pymongo.MongoClient("mongodb+srv://root:root@cluster0.jntcr.mongodb.net/Anthem?retryWrites=true&w=majority")

mycol= myClient.Anthem.Contenedores

mycol.insert_many(data)
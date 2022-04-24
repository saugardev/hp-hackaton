import os
import pandas as pd
import pymongo

connection = pymongo.MongoClient(
    "mongodb+srv://root:root@cluster0.jntcr.mongodb.net/Anthem?retryWrites=true&w=majority")
collection = connection.Anthem.Accidentabilidad

filePath = os.path.abspath(__file__)
filePath += "/../../../../Datasets/Anthem_CTC_Accidentalidad.csv"
dataset = pd.read_csv(filePath, sep=";", encoding="utf-8")


dataset.drop(columns=['num_expediente', 'sexo', 'rango_edad'], inplace=True)
data = dataset.to_dict(orient="records")
print(data)

collection.insert_many(data)

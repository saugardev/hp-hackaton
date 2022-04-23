import os
import pandas as pd
import pymongo

connection = pymongo.MongoClient(
    "mongodb+srv://root:root@cluster0.jntcr.mongodb.net/Anthem?retryWrites=true&w=majority")
collection = connection.Anthem.Accidentabilidad

filePath = os.path.abspath(__file__)
filePath += "/../../../../Datasets/Anthem_CTC_Accidentalidad.csv"
dataset = pd.read_csv(filePath, sep=";", encoding="unicode_escape")

dataset.drop(['num_expediente'], axis=1, inplace=True)
data = dataset.to_dict(orient="records")
print(data)

#collection.insert_many(data)

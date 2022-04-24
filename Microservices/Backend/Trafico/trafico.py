import pandas as pd
import os
import pymongo

#Conexion con mongo.

client = pymongo.MongoClient("mongodb+srv://root:root@cluster0.jntcr.mongodb.net/Anthem?retryWrites=true&w=majority")
myCol = client.Anthem.Trafico
myCol.drop()

#Obtencion del datashet a partir del archivo python

#Si se quiere subir a docker, modificar los paths
filePath = os.path.abspath(__file__)
print(filePath)
datasetTraficoPath = os.chdir(filePath + "/../../../../Datasets/Trafico")
files = os.listdir(datasetTraficoPath)

csvMedidaTrafico = pd.read_csv(filePath + "/../../../../Datasets/Ubicaciones/Anthem_CTC_PuntoMedidaTrafico.csv", sep=';')
csvMedidaTraficoFiltrado = csvMedidaTrafico[csvMedidaTrafico["id"] <= 1050]

#Recorrer todos los csv de trafico.

for file in files:
    if file.endswith(".csv"):
        csvTrafico = pd.read_csv(file, sep=';', encoding="unicode_escape")
        csvTraficoFiltrado = csvTrafico[csvTrafico["id"] <= 1050]
        csvTraficoFiltrado["fecha"] = pd.to_datetime(csvTraficoFiltrado["fecha"], format="%Y-%m-%d", errors="coerce")
        csvTraficoFiltrado = csvTraficoFiltrado.loc[csvTraficoFiltrado["fecha"].dt.day < 6]
        #print(len(csvTraficoFiltrado))
        jsonData = csvTraficoFiltrado.to_dict(orient="records")
        #print(jsonData)

        if len(csvTraficoFiltrado) > 0:
            myCol.insert_many(jsonData)
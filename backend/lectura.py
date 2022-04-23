from hashlib import new
import pandas as pd
import os

#TODO -> Modificar el programa para asignarlo al hackaton.


#Obtencion del datashet a partir del archivo python
path = os.path.abspath(__file__)
os.chdir(path + "../../../Datasets")


'''
archivo = 'C:/Users/sergi/OneDrive/Documentos/Reto_4/fraud_log.csv'

df = pd.read_csv(archivo)

cashFraud = df[df['type'] == 'CASH_OUT']
cashFraud = cashFraud[cashFraud['isFraud'] == 1]

amountCashFraud = 0

for i in cashFraud['amount']:
    amountCashFraud += (float(i) * 100)

print("amountCashFraud: " + str(amountCashFraud / 100))

val = [50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
sol = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

i = 0

while amountCashFraud != 0:
    if amountCashFraud >= val[i]:
        amountCashFraud = amountCashFraud - val[i]
        sol[i] = sol[i] + 1
    else:
        i = i + 1

print(str(sol).replace(" ", ""))
'''
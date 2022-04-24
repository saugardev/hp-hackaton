FROM python:3.9

RUN mkdir /Microservices
RUN mkdir /Microservices/Backend
RUN mkdir /Microservices/Backend/Trafico
RUN mkdir /Datasets
RUN mkdir /Datasets/Ubicaciones

COPY /Datasets/Trafico/Anthem_CTC_Traffic_012051.csv /Microservices/Backend/Trafico
COPY /Datasets/Ubicaciones/Anthem_CTC_PuntoMedidaTrafico.csv /Microservices/Backend

ADD /Microservicies/Backend/Trafico/trafico.py .

WORKDIR /Microservices/Backend/Trafico

ADD /Microservicies/Backend/Trafico/trafico.py /

RUN pip install pandas
RUN pip install pymongo
RUN pip install dnspython

CMD [ "python", "./trafico.py" ]
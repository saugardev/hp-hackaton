FROM python:3.9

RUN mkdir /Microservices
RUN mkdir /Microservices/Backend
RUN mkdir /Microservices/Backend/Ubicaciones
RUN mkdir /Datasets
RUN mkdir /Datasets/Ubicaciones

COPY /Datasets/Ubicaciones/*.csv /Microservices/Backend/Ubicaciones
COPY /Datasets/Ubicaciones/*gpx /Microservices/Ubicaciones
COPY requirements.txt requirements.txt

ADD /Microservicies/Backend/Ubicaciones/main.py .

WORKDIR /Microservices/Backend/Ubicaciones

ADD /Microservicies/Backend/Ubicaciones/main.py /

RUN pip3 install -r requirements.txt

CMD [ "python", "./main.py" ]
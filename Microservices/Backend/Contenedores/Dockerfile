FROM python:3.9

RUN mkdir /Microservices
RUN mkdir /Microservices/Backend
RUN mkdir /Microservices/Backend/Contenedores
RUN mkdir /Datasets

COPY /Datasets/Anthem_CTC_Contenedores_Ubicacion.csv /Microservices/Backend/Contenedores
COPY requirements.txt requirements.txt

ADD /Microservicies/Backend/Contenedores/main.py .

WORKDIR /Microservices/Backend/Contenedores

ADD /Microservicies/Backend/Contenedores/main.py /

RUN pip3 install -r requirements.txt

CMD [ "python", "./main.py" ]
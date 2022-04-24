FROM python:3.9

RUN mkdir /Microservices
RUN mkdir /Microservices/Backend
RUN mkdir /Microservices/Backend/ContaminacionAcustica
RUN mkdir /Datasets
RUN mkdir /Datasets/Ubicaciones

COPY /Datasets/ContaminacionAcustica/Anthem_CTC_ContaminacionAcustica.csv /Microservices/Backend/ContaminacionAcustica
COPY requirements.txt requirements.txt

ADD /Microservicies/Backend/ContaminacionAcustica/main.py .

WORKDIR /Microservices/Backend/ContaminacionAcustica

ADD /Microservicies/Backend/ContaminacionAcustica/main.py /

RUN pip3 install -r requirements.txt

CMD [ "python", "./main.py" ]
FROM python:3.9

RUN mkdir /Microservices
RUN mkdir /Microservices/Backend
RUN mkdir /Microservices/Backend/Accidentalidad
RUN mkdir /Datasets

COPY /Datasets/Anthem_CTC_AsignaciónPatinetes.csv /Microservices/Backend/Accidentalidad
COPY requirements.txt requirements.txt

ADD /Microservicies/Backend/Accidentalidad/main.py .

WORKDIR /Microservices/Backend/Accidentalidad

ADD /Microservicies/Backend/Accidentalidad/main.py /

RUN pip3 install -r requirements.txt

CMD [ "python", "./main.py" ]
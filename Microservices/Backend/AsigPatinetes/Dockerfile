FROM python:3.9

RUN mkdir /Microservices
RUN mkdir /Microservices/Backend
RUN mkdir /Microservices/Backend/AsigPatinetes
RUN mkdir /Datasets


COPY /Datasets/Anthem_CTC_AsignaciónPatinetes.csv /Microservices/Backend/AsigPatinetes
COPY requirements.txt requirements.txt

ADD /Microservicies/Backend/AsigPatinetes/main.py .

WORKDIR /Microservices/Backend/AsigPatinetes

ADD /Microservicies/Backend/AsigPatinetes/main.py /

RUN pip3 install -r requirements.txt

CMD [ "python", "./main.py" ]
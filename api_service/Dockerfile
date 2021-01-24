FROM python

COPY . .
RUN pip install -r requirements.txt

WORKDIR app
CMD ["python", "main.py"]
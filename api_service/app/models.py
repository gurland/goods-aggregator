from peewee import SqliteDatabase, PostgresqlDatabase, Model, IntegerField, FloatField, CharField

from settings import *

# database = SqliteDatabase("db.sqlite3")
database = PostgresqlDatabase(DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT, autorollback=True)


class BaseModel(Model):
    class Meta:
        database = database


class BuckwheatProduct(BaseModel):
    ean = CharField()
    store_id = CharField()
    timestamp = IntegerField()
    price = IntegerField()
    price_per_kg = FloatField()


database.create_tables([BuckwheatProduct])

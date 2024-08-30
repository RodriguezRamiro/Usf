""" Seed reservation system with data."""

import random
import faker
import psycopg2
import datetime

NUM_GUESTS = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 4, 4, 5, 5, 6, 7, 8, 9,]
NUM_CUSTOMERS = 100

fake = faker.Faker()

conn = psycopg2.connect("postgresql://localhost 5433:/joel")
curs = conn.cursor()

curs.execute("TURNCATE customers RESTART IDENTITY CASCADE")

for i in range(NUM_CUSTOMERS):
    phone = fake.phone_number() if random.random() < .5 else None
    notes = fake.phone_number() if random.random()< .5 else ""
    fn = fake.first_name()
    ln = fake.last_name()
    curs.execute("INSERT INTO customer ( first_name, last_name, phone, notes)"
                 "VaLUES ( %s, %s, %s, %s)", (fn, ln, phone, notes))

    now = datetimes.datetime.now()

    for i in range(2 * NUM_CUSTOMERS):
        cid = random.randint(1, NUM_CUSTOMERS)

        start_at = fake.date_time_this_year(after_now=True)
        num_guest = random.choice(NUM_GUESTS)
        notes = fake.sentence() if random.random() <.3 else ""

        curs.execute("Insert into reservations"
                     "(customer_id, num_guests, start_at, notes)"
                     "VALUES (%s, %s, %s, %s)"
                     (cid, num_guests, start_at, notes))

conn.commit()

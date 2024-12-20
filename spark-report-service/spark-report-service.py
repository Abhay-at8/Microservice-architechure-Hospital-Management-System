import os
import json
import boto3
from datetime import datetime
from kafka import KafkaConsumer
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from flask import Flask, send_from_directory
import threading
from flask_cors import CORS
import py_eureka_client.eureka_client as eureka_client

eureka_host = os.environ.get("EUREKA_HOST", "localhost")
eureka_server="http://"+eureka_host+":8761/eureka"
eureka_client.init(eureka_server=eureka_server,
                   app_name="spark-report-gen",
                   instance_port=8985)

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*":{
        "origins": "*"
        }
    })


# # Initialize Flask app
# app = Flask(__name__)

# Load configuration from config.json
with open('config.json', 'r') as config_file:
    config = json.load(config_file)

aws_access_key_id = config['aws_access_key_id']
aws_secret_access_key = config['aws_secret_access_key']
aws_bucket_name = config['aws_bucket_name']

# Initialize the S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key
)

# Kafka consumer configuration
kafka_broker = os.environ.get("KAFKA_HOST", "localhost") + ":9092"
consumer = KafkaConsumer(
    'output',
    bootstrap_servers=[kafka_broker],
    auto_offset_reset='latest',
    enable_auto_commit=True,
    group_id='my-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

# Function to create PDF
def create_pdf(entries):
    current_date = datetime.now().strftime("%Y-%m-%d")
    file_name = f"orders_report_{current_date}.pdf"
    c = canvas.Canvas(file_name, pagesize=letter)
    width, height = letter

    c.setFont("Helvetica", 12)
    y = height - 40

    c.drawString(30, y, "Orders Report")
    y -= 20

    for entry in entries.values():
        c.drawString(30, y, f"Medicine Name: {entry['medicineName']}, Total Revenue: {entry['totalRevenue']}")
        y -= 20
        if y < 40:
            c.showPage()
            c.setFont("Helvetica", 12)
            y = height - 40

    c.save()
    print(f"PDF created: {file_name}")
    return file_name

# Function to upload PDF to S3
def upload_to_s3(file_name, bucket_name, object_name=None):
    if object_name is None:
        object_name = os.path.basename(file_name)

    try:
        s3_client.upload_file(file_name, bucket_name, object_name)
        print(f"File {file_name} uploaded to bucket {bucket_name} as {object_name}")
    except Exception as e:
        print(f"Failed to upload {file_name} to S3: {e}")

# Function to consume Kafka messages
def consume_kafka_messages():
    entries = {}
    print("Consuming messages from Kafka topic 'output'...")

    try:
        for message in consumer:
            entry = message.value
            print(f"Consumed message: {entry}")

            # Override or add new entry in the dictionary
            if 'medicineName' in entry and 'totalRevenue' in entry:
                entries[entry['medicineName']] = entry
                pdf_file = create_pdf(entries)
                upload_to_s3(pdf_file, aws_bucket_name)
            else:
                print(f"Unexpected entry structure: {entry}")

    except KeyboardInterrupt:
        print("Stopping consumer...")
    finally:
        consumer.close()

# Flask route to download today's PDF
@app.route('/sparks-api/download_pdf')
def download_pdf():
    current_date = datetime.now().strftime("%Y-%m-%d")
    file_name = f"orders_report_{current_date}.pdf"
    directory = os.getcwd()
    return send_from_directory(directory, file_name, as_attachment=True)

# New route to say hello
@app.route('/sparks-api/hello')
def hello():
    return "hello"

# Function to run Flask app
def run_flask_app():
    app.run(debug=False, use_reloader=False, host='0.0.0.0', port=8985)

# Run both Flask app and Kafka consumer in parallel
if __name__ == '__main__':
    # Create threads
    kafka_thread = threading.Thread(target=consume_kafka_messages)
    flask_thread = threading.Thread(target=run_flask_app)

    # Start threads
    kafka_thread.start()
    flask_thread.start()

    # Wait for threads to complete
    kafka_thread.join()
    flask_thread.join()

#cloud-boothook
#!/bin/bash
apt update -y
apt install openjdk-17-jre-headless -y
apt install python3-pip -y
apt install python3-venv -y



mkdir -p /home/kafka/
cd /home/kafka/
# Create and activate a virtual environment
python3 -m venv /home/kafka/venv
source /home/kafka/venv/bin/activate

# Install required Python packages
pip install pyspark
pip install findspark


git clone https://github.com/Abhay-at8/kafka-setup.git
chmod -R 777 /home/kafka/
nohup bash /home/kafka/kafka-setup/setupSpark.sh ${kafka_host} < /dev/null 2> /dev/null > /home/kafka/kafka-setup/0.log &
chmod -R 777 /home/kafka/

#cloud-boothook
#!/bin/bash
apt update -y
apt install openjdk-17-jre-headless -y
mkdir -p /home/kafka/
cd /home/kafka/
apt install python3-pip -y
pip install pyspark
pip install findspark
git clone https://github.com/Abhay-at8/kafka-setup.git
chmod -R 777  /home/kafka/
nohup bash  /home/kafka/kafka-setup/setupSpark.sh  ${kafka_ip} < /dev/null 2> /dev/null > /home/kafka/kafka-setup/0.log  &
chmod -R 777  /home/kafka/


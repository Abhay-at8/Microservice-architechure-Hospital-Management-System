
variable "security_group_id" {}
variable "subnet_ids" {}
variable "vpc_id" {}

resource "aws_instance" "kafka" {
  ami           = "ami-0522ab6e1ddcc7055"
  instance_type = "t2.small"
  user_data     = filebase64("${path.module}/ec2-init.sh")

  vpc_security_group_ids = [var.security_group_id]
  subnet_id              = element(var.subnet_ids, 0)  # Select the first subnet from the list

  associate_public_ip_address = true

  tags = {
    Name = "kafka-instance"
  }
}

output "kafka_ip" {
  value = aws_instance.kafka.public_ip
  description = "The public IP address of the Kafka EC2 instance"
}






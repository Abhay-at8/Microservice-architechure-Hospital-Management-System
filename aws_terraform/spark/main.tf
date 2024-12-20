variable "security_group_id" {}
variable "subnet_ids" {}
variable "vpc_id" {}
variable "kafka_ip" {}

locals {
  vars = {
    kafka_host = var.kafka_ip
  }
}

data "template_file" "init" {
  template = file("${path.module}/ec2-init.tpl")

  vars = {
    kafka_host = local.vars.kafka_host
  }
}

resource "aws_instance" "spark" {
  ami           = "ami-0522ab6e1ddcc7055"
  instance_type = "t2.micro"
  user_data     = base64encode(data.template_file.init.rendered)

  vpc_security_group_ids = [var.security_group_id]
  subnet_id              = element(var.subnet_ids, 0)  # Select the first subnet from the list

  associate_public_ip_address = true

  tags = {
    Name = "spark-instance"
  }
}

output "public_ip" {
  value       = aws_instance.spark.public_ip
  description = "The public IP address of the spark EC2 instance"
}

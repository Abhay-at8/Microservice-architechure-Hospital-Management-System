terraform {
  required_providers {
    mysql = {
      source  = "terraform-providers/mysql"
      version = "~> 1.9"
    }
  }
}

provider "mysql" {
  alias    = "db"
  endpoint = aws_db_instance.mysql_rds.endpoint
  username = var.db_user
  password = var.db_password
}

variable "security_group_id" {}
variable "subnet_ids" {}
variable "vpc_id" {}
variable "db_user" {
  default = "admin"
}
variable "db_password" {
  default = "password"  # Replace with your password
}

resource "aws_db_instance" "mysql_rds" {
  allocated_storage    = 20
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"

  username             = var.db_user
  password             = var.db_password
  parameter_group_name = "default.mysql8.0"
  publicly_accessible  = true
  skip_final_snapshot  = true

  vpc_security_group_ids = [var.security_group_id]
  db_subnet_group_name   = aws_db_subnet_group.main.id

  tags = {
    Name = "mysql-rds-instance"
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "main"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "main"
  }
}

resource "mysql_database" "extra_databases" {
  provider = mysql.db
  count    = 5  # Number of additional databases
  name     = element(["authentication", "patient", "doctor", "appointment","pharmacy"], count.index)  # Names of additional databases

}

output "db_instance_endpoint" {
  value = aws_db_instance.mysql_rds.endpoint
}

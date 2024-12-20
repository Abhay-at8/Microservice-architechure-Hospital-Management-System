output "subnets" {
  value = aws_subnet.cloudEx1_public_subnets.*.id
}
output "vpc_id" {
  value = aws_vpc.cloudEx1_vpc.id
}

output "security_group_id" {
  value = aws_security_group.cloudEx1_sg_ssh_http.id
}

resource "aws_vpc" "cloudEx1_vpc" {
  cidr_block = "11.0.0.0/16"
  enable_dns_support = true # Enable DNS resolution 
  enable_dns_hostnames = true # Enable DNS hostnames
  tags = {
    Name = "cloudExt1_vpc"
  }
}


# Setup public subnet
resource "aws_subnet" "cloudEx1_public_subnets" {
  count             = length(["11.0.1.0/24", "11.0.2.0/24"])
  vpc_id            = aws_vpc.cloudEx1_vpc.id
  cidr_block        = element(["11.0.1.0/24", "11.0.2.0/24"], count.index)
  availability_zone = element(["ap-south-1a", "ap-south-1b"], count.index)

  tags = {
    Name = "cloudEx1-subnet-${count.index + 1}"
  }
}

# Setup Internet Gateway
resource "aws_internet_gateway" "cloudEx1_internet_gateway" {
  vpc_id = aws_vpc.cloudEx1_vpc.id
  tags = {
    Name = "cloudEx1-igw"
  }
}


# Public Route Table
resource "aws_route_table" "cloudEx1_public_route_table" {
  vpc_id = aws_vpc.cloudEx1_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.cloudEx1_internet_gateway.id
  }
  tags = {
    Name = "cloudEx1-public-rt"
  }
}

# Public Route Table and Public Subnet Association
resource "aws_route_table_association" "c_public_rt_subnet_association" {
  count          = length(aws_subnet.cloudEx1_public_subnets)
  subnet_id      = aws_subnet.cloudEx1_public_subnets[count.index].id
  route_table_id = aws_route_table.cloudEx1_public_route_table.id
}




resource "aws_security_group" "cloudEx1_sg_ssh_http" {
  name        = "cloudEx1_sg_ssh_http"
  description = "Enable the Port 22(SSH) & Port 80(http)"
  vpc_id      = aws_vpc.cloudEx1_vpc.id

  # ssh for terraform remote exec
  ingress {
    description = "Allow remote SSH from anywhere"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
  }

  # enable http
  ingress {
    description = "Allow HTTP request from anywhere"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
  }


    # enable kafka
  ingress {
    description = "Allow kafka acess request from anywhere"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 9092
    to_port     = 9092
    protocol    = "tcp"
  }

    # enable mysql port
  ingress {
    description = "Allow mysql request from anywhere"
    cidr_blocks = ["0.0.0.0/0"]
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
  }


  #Outgoing request
  egress {
    description = "Allow outgoing request"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "cloudEx1_sg_ssh_http"
  }
}






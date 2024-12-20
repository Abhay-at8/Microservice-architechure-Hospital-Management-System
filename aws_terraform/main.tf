provider "aws" {
  region     = "ap-south-1"
  access_key = ""
  secret_key = ""
} 

module "networking" {
  source              = "./networking"

}



module "rds" {
  source              = "./rds"
  vpc_id                   = module.networking.vpc_id
  security_group_id       = module.networking.security_group_id
  subnet_ids                = tolist(module.networking.subnets)

}

module "kafka" {
  source              = "./kafka"
  vpc_id                   = module.networking.vpc_id
  security_group_id       = module.networking.security_group_id
  subnet_ids                = tolist(module.networking.subnets)
  depends_on = [module.rds]

}



module "spark" {
  source              = "./spark"
  vpc_id                   = module.networking.vpc_id
  security_group_id       = module.networking.security_group_id
  kafka_ip		  = module.kafka.kafka_ip
  subnet_ids                = tolist(module.networking.subnets)
    depends_on = [module.kafka]

}
output "kafka_ip" { 
  value = module.kafka.kafka_ip 
  
  }

output "db_instance_endpoint" { 
  value = module.rds.db_instance_endpoint 
  
}
-Microservices codes along with shell script and spark job is provided in the code folder. Dockerfile is present in each service directory, to reduce space maven clean is run to delete jars and dependencies, to again build java microservices, please build the jar using maven clean package install goals
 
-IaC for db(RDS),kafka,spark is provide in aws_terraform folder,For Kubernetes cluster azure is used ,terraform scripts for which could be found in  aks_azure_terraform directory

- Kubernetes yamls are present in kubernetes_yamls directory
- db_endpoint and kafka host needs to replaced with newly generated values which are provide in aws terraform script as output variables in common-config.yaml file
- Loadtesting reports, Prometheus monitoring and application-server logs are present in monitoring folder

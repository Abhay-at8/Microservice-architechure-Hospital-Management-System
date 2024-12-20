provider "azurerm" {
    features {}
    subscription_id = "d3b5a263-ae4a-47f4-8aaa-49c7ca74a5e5"
  }
  
  resource "azurerm_resource_group" "aks_rg" {
    name     = "CloudAssign"
    location = "Central India"
  }
  
  resource "azurerm_kubernetes_cluster" "aks_cluster" {
    name                = "myAKSCluster"
    location            = azurerm_resource_group.aks_rg.location
    resource_group_name = azurerm_resource_group.aks_rg.name
    dns_prefix          = "myAKSCluster"
  
    default_node_pool {
      name       = "default"
      node_count = 2
      vm_size    = "Standard_DS2_v2"
    }
  
    identity {
      type = "SystemAssigned"
    }
  }
  
  resource "azurerm_kubernetes_cluster_node_pool" "example" {
    name                  = "internal"
    kubernetes_cluster_id = azurerm_kubernetes_cluster.aks_cluster.id
    vm_size               = "Standard_DS2_v2"
    node_count            = 2
  }
  
# Azure Fundemental Introduction

[Learning Resource](https://docs.microsoft.com/en-us/learn/paths/az-900-describe-cloud-concepts/)

## Azure cloud concepts

### What is Cloud computing?

Cloud computing is the delivery of computing service through internet by using pay as you go pricing model. You only pay the amount you used/consumed, instead of buying the whole pysical device at your expense.

This helps you safe money and space while developing or using web services.
- Lower your operating costs.
- Run your infrastructure more efficiently.
- Scale as your business needs change.

### Azure, what is it?

  Azure is a set of cloud services that help you organization meet your goals. 

  `Azure portal` is a web-based, unified console that provides an alternative to command-line tools.

  `Azure marketplace` helps connect users with Microsoft partners, independent software vendors and startups that are offering solutions and services.


### Cloud Models
  - `Public cloud`: available to anyone who wants to purchase them
  - `Private cloud`: consists of computing resources used exclusively by users from one business or organization. Can be pysically located at your org on-site datacenter, or hosted by third-party service provide.
  - `Hybrid could`: combines private and public cloud, allowing data and applications to be shared between them.


### Cloud model comparison
  1. Public cloud
     - No capital expenditures to scale up.
     - Applications can be quickly provisioned and deprovisioned.
     - Organizations pay only for what they use.
  2. Private cloud
     - Hardware must be purchased for start-up and maintenance.
     - Organizations have complete control over resources and security.
     - Organizations are responsible for hardware maintenance and updates.
  3. Hybrid cloud
     - Provides the most flexibility.
     - Organizations determine where to run their applications.
     - Organizations control security, compliance, or legal requirements.

### Cloud computing adv
  High availability: Depending on the service-level agreement (SLA) that you choose, your cloud-based apps can provide a continuous user experience with no apparent downtime, even when things go wrong.

  Scalability: Apps in the cloud can scale vertically and horizontally:

  Scale vertically to increase compute capacity by adding RAM or CPUs to a virtual machine.
  Scaling horizontally increases compute capacity by adding instances of resources, such as adding VMs to the configuration.
  Elasticity: You can configure cloud-based apps to take advantage of autoscaling, so your apps always have the resources they need.

  Agility: Deploy and configure cloud-based resources quickly as your app requirements change.

  Geo-distribution: You can deploy apps and data to regional datacenters around the globe, thereby ensuring that your customers always have the best performance in their region.

  Disaster recovery: By taking advantage of cloud-based backup services, data replication, and geo-distribution, you can deploy your apps with the confidence that comes from knowing that your data is safe in the event of disaster.

  There are two different types of expenses that you should consider:

  - Capital Expenditure (CapEx) is the up-front spending of money on physical infrastructure, and then deducting that up-front expense over time. The up-front cost from CapEx has a value that reduces over time.
  - Operational Expenditure (OpEx) is spending money on services or products now, and being billed for them now. You can deduct this expense in the same year you spend it. There is no up-front cost, as you pay for a service or product as you use it.

  Cloud Computing is a comsumption-based model

### Cloud Services

  IaaS(eg. irtual machines) think about what you pysically need, you control everything, config the vm/hardware/storage/network, develop app
  PaaS(eg. Azure app services) consider where to host it, hosting environments platform, you only develop app and put it on platform
  SaaS(eg. MS teams, office 365) you just operate your content/data and access, have the software worry about where to put it, how to integrate it and what it should look like.


## Core Azure services

  To use Azure services, you need Azure account and Azure subscription. An Azure account can create multiple subscriptions to manage different set of resources for different purposes, for example, your companey might want to creat an account for Azure and create saperate subscription for development, marketing, etc.

  Top down heiarachy:
  Management groups -> subscriptions -> resource groups -> resource

### Azure regions, availability zones and region pairs
  
  Azure region: A region is a geographical area on the planet that contains at least one but potentially multiple datacenters that are nearby and networked together with a low-latency network. These regions give you the flexibility to bring applications closer to your users no matter where they are. Global regions provide better scalability and redundancy. 

  Availability zones: Availability zones are physically separate datacenters within an Azure region

  region pairs : Each Azure region is always paired with another region within the same geography (such as US, Europe, or Asia) at least 300 miles away. Help to reduce likelihood of interruptions because of events such as natural disasters, civil unrest, power outages, network outages.

  
  Availability zone: running a VM with one or more replicated copies on different availability zones. (resilency against datacenter failure) 
  
  Availability set: running a VM with one or more replicated copies on separate hardware within the same availablity zone. (resilency against machine failure)


### Azure Resource and Azure Resource Manager(ARM)

Azure virtual machine creation and use as web service to call from browser tab

Severless Computing
Azure functions (same as lamda function in aws): execute code after an event/trigger, typically suitable to do something in few secs after the events
Azure logic apps: complicated logics or workflow implementation after an event or tirgger

Docker container -> into Azure container instance
Azure kubernetes manages different Azure containers, scale up or down, turn on or off, load balancers

Azure virtual network
Add virtual machine to virtual netowrk, they can communicate with each other (ping each other, with ICMP call enabled from firewall), and the internet.

## azure solutions and management tools

### Azure Internet of things(IoT)
  - IoT hub: easy messaging between application and device
  - IoT central: build complicated logic with communication for many devices
  - Iot sphere: suitable for high security level IoT services, require chips to inject to the device

Big data and analytics

### Artificial Intelligence and Machine Learning
`Azure Machine learning` is a platform for making predictions, where you can train and test your model, then deploy it to call with web api

`Azure Congitive Service` provides prebuilt machine learning models, no need of special ML knowledge, just directly use api. (eg, analyze text, images to recognize objects or faces)

`Azure Bot Service` and Bot Framework are platforms for creating virtual agents that understand and reply to questions like human. The bot you build uses other Azure services such as Azure cognitive services to understand what human is asking for. It can be used to shift simple, repetitive tasks, such as taking dinner rsv or garthering profile info.

Develop your apps with Devops and github
Azure Devops, github, gitgub actions for Azure

Azure mangement tools

use templates and command to create resource groups and allocate reousece like virtual machines...

Azure service health, meatures performance and best practices

## Azure security

Azure Security Center: Monitoring service, detect THreat, give direct recommendations

Azure Sentinel: security information management, provide global protection for Azure

Azure Key Vault: stores credentials in centralized cloud location and access logging
key vault name should be globally unique

Create Key valut -> Assign to a resource group -> create secret, keys, certificates within the key vault

You can share secret identifier without really giving the secret content to applications


Azure Dedicated Host

Security network

multiple layer protection (Defense inDepth)

Perimeter level protection: Azure Firewall, Azure distributed denial of Service protection
Network level protection: network inbound/outbound rules, you can overwrite all default rules for security

## Identify, governance, privacy and compliance

Azure multi-factor autentication

Azure Active Directory(AAD)
Conditional Access, used by AAD

Azure governance
Role-based access control: only grant amount of access that user can perform their jobs, to protect resource and data
You can make roles at subscription level, management group level, resource group level or resource level.
Roles like Owner, contributer, Reader... 

Resource lock: CannotDelete(can read, update but not delete), ReadOnly(can read but not update or delete). Admin can add or delete Resource lock, others will follow the resource lock rules that applies.

Azure Tags: up to 50 tags per resource

Azure Policy: helps to enforce organizational standards
when creating a new policy it will not stop anything existing resource that are not compliant to it. They will just be marked as non-compliant. Moving forward, if you create resource that is not compliant to it, it will not allow you to do that.

Azure blueprint

Cloud Adoption Framework: Microsoft approach to cloud adoption in Azure, best practices, tools, guidance ... everythin you need to set up azure env

Privacy, compliance and data

Trust center [link](www.microsoft.com/trustcenter)

## Azure price and Support

Factors affecting costs:
Resrouce Type: different price for different resource

Services: azure usage rates and billing periods can differ between enterprice(large orgs, may pay annually with discount may apply), web direct(individuals, pay monthly with retail price) and CSP(cloud solution provider) customers

Location: where you deploy your resource is going to impact your price

Bandwidth: outbound data transfer do different billing zone will cost

Reserved Instances: Azure reservations, you are to buying one-year or three-year plans for multiple products. reservations can significatly reduce your resource costs,

Azure Hybrid Use Benefit?

Pricing calculator: estimate the cost of Azure prducts

Ownership calculator: you will see whether you can save money by moving to Azure

Azure Cost Management:
Report: billing reports
Data enrichment
Budgets
Alerting: when cost exceed limits
Recommendation: cost recommendations

Service Level Agreements (SLAs)

Azure Preview Program: do not use preview in production, they do not have SLA attached to it, which mean they are not garanteed. Preview Program users can test beta and other pre-release features.
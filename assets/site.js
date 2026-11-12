const L = p => "https://learn.microsoft.com/azure/" + p;
const S = [
  // Compute
  ["Virtual Machines","Compute","core","On-demand Windows and Linux servers. The IaaS foundation many other services run on.","Lift-and-shift, legacy apps, custom software, anything needing OS-level control.","VM sizes/series (B, D, E, F, N), availability sets vs zones, managed disks, deallocate vs stop, Spot VMs, extensions, images and Compute Gallery","virtual-machines/"],
  ["Virtual Machine Scale Sets","Compute","often","Groups of identical VMs that autoscale together.","Stateless tiers that need VMs, AKS node pools (built on these underneath).","Flexible vs uniform orchestration, autoscale rules, rolling upgrades, health extension","virtual-machine-scale-sets/"],
  ["App Service","Compute","core","Managed hosting for web apps and APIs, from code or containers.","Most line-of-business web apps and REST APIs.","App Service plan (the VMs you pay for), tiers (Basic, Standard, Premium v3, Isolated v2), deployment slots, app settings, VNet integration, Easy Auth, WebJobs","app-service/"],
  ["Azure Functions","Compute","core","Event-driven serverless code with triggers and bindings.","Glue code, background jobs, webhooks, timers, queue and blob processing.","Hosting plans (Flex Consumption, Premium, Dedicated), triggers vs bindings, Durable Functions for workflows, cold start, host.json","azure-functions/"],
  ["Container Apps","Compute","core","Serverless containers built on Kubernetes, KEDA, Dapr and Envoy, without managing a cluster.","Microservices, APIs and background jobs where AKS is overkill.","Environments, revisions and traffic splitting, KEDA scale rules, jobs, Dapr sidecars, workload profiles, ingress","container-apps/"],
  ["Azure Kubernetes Service (AKS)","Compute","core","Managed Kubernetes. Azure runs the control plane; you run node pools and workloads.","Large container platforms, many teams, need for the full Kubernetes ecosystem.","System vs user node pools, Azure CNI vs overlay, Workload Identity, cluster autoscaler, upgrades and channels, AKS Automatic, ingress options, Azure Policy for AKS","aks/"],
  ["Container Instances","Compute","niche","Run a single container on demand, billed per second.","Short tasks, build agents, simple sidecar-free jobs.","Container groups, restart policies, VNet deployment","container-instances/"],
  ["Container Registry (ACR)","Compute","core","Private registry for container images and OCI artifacts.","Anywhere you build containers for AKS, Container Apps or App Service.","SKUs, geo-replication, ACR Tasks for cloud builds, AcrPull role, image scanning via Defender","container-registry/"],
  ["Batch","Compute","niche","Schedules large parallel and HPC jobs across pools of VMs.","Rendering, simulations, genomics, big parallel compute.","Pools, jobs, tasks, low-priority/spot nodes","batch/"],
  ["Static Web Apps","Compute","often","Hosting for static front ends with global distribution and optional managed APIs.","React/Vue/Angular SPAs, docs sites, Jamstack.","GitHub/Azure DevOps integration, preview environments, linked backends, built-in auth","static-web-apps/"],
  ["Azure Virtual Desktop","Compute","niche","Windows desktops and apps delivered from Azure.","Remote workforces, secure contractor access.","Host pools, multi-session Windows, FSLogix profiles, scaling plans","virtual-desktop/"],
  // Networking
  ["Virtual Network (VNet)","Networking","core","Your private network in Azure, divided into subnets.","Every IaaS workload and most private PaaS designs.","Address space and CIDR planning, subnets, delegation, peering, NSGs, route tables (UDRs), DNS settings","virtual-network/"],
  ["Network Security Groups","Networking","core","Stateful allow/deny rules on subnets and NICs.","Basic traffic filtering everywhere.","Priority ordering, default rules, service tags (e.g. Storage, AzureCloud), Application Security Groups, flow logs","virtual-network/network-security-groups-overview"],
  ["Private Link / Private Endpoint","Networking","core","Gives PaaS services a private IP inside your VNet.","Locking databases, storage and Key Vault off the public internet.","Private DNS zones (privatelink.*), disabling public network access, approval workflow, Private Link Service for your own apps","private-link/"],
  ["Azure DNS","Networking","core","Hosts public and private DNS zones; DNS Private Resolver bridges to on-prem.","Every domain and every private endpoint design.","Public zones, Private DNS zones and VNet links, conditional forwarding, alias records","dns/"],
  ["Load Balancer","Networking","often","Layer-4 TCP/UDP load balancing, public or internal.","VM backends, NVAs, non-HTTP protocols.","Standard SKU, health probes, outbound rules, HA ports, zone redundancy","load-balancer/"],
  ["Application Gateway","Networking","often","Regional layer-7 load balancer with optional Web Application Firewall.","HTTP apps in a VNet that need path routing, TLS offload or WAF.","v2 SKU, listeners, rules, backend pools, WAF policies, Application Gateway for Containers","application-gateway/"],
  ["Front Door","Networking","core","Global layer-7 entry point with CDN, WAF and failover.","Public-facing web apps, multi-region apps, static content acceleration.","Standard vs Premium, origins and origin groups, rules engine, Private Link origins, caching","frontdoor/"],
  ["Traffic Manager","Networking","niche","DNS-based global traffic routing.","Failover or geo-routing for non-HTTP endpoints.","Routing methods: priority, weighted, performance, geographic; TTL effects","traffic-manager/"],
  ["VPN Gateway","Networking","often","Encrypted tunnels between Azure and on-premises or client devices.","Hybrid connectivity, remote admin access.","Site-to-site, point-to-site, active-active, BGP, gateway SKUs","vpn-gateway/"],
  ["ExpressRoute","Networking","often","Private dedicated connectivity to Microsoft via a provider.","Enterprises with heavy or latency-sensitive hybrid traffic.","Circuits, private vs Microsoft peering, Global Reach, FastPath, redundancy","expressroute/"],
  ["Virtual WAN","Networking","niche","Microsoft-managed hub-and-spoke networking at global scale.","Many regions, branches and VPN users.","Virtual hubs, secured hubs with Firewall, routing intent","virtual-wan/"],
  ["Azure Firewall","Networking","often","Managed, stateful network firewall.","Central egress and east-west inspection in hub networks.","Basic/Standard/Premium, firewall policy, DNAT, application vs network rules, threat intelligence, TLS inspection (Premium)","firewall/"],
  ["Bastion","Networking","often","Browser or native-client RDP/SSH to VMs without public IPs.","Admin access to private VMs.","SKUs, native client support, shareable links","bastion/"],
  ["NAT Gateway","Networking","often","Managed outbound internet with static public IPs for a subnet.","Predictable egress IPs; avoiding SNAT port exhaustion.","Subnet association, public IP prefixes, default outbound access retirement","nat-gateway/"],
  ["DDoS Protection","Networking","niche","Adaptive DDoS mitigation for public IPs.","Internet-facing production workloads with strict SLAs.","Network vs IP protection tiers, telemetry, rapid response","ddos-protection/"],
  // Storage
  ["Storage Account","Storage","core","One account, four services: Blob, Files, Queue and Table.","Files, backups, static assets, logs, data lakes, simple queues.","Redundancy (LRS/ZRS/GRS/GZRS), access tiers, SAS tokens vs Entra auth, shared key access, firewall, lifecycle management, soft delete, versioning, immutability","storage/common/storage-account-overview"],
  ["Blob Storage","Storage","core","Object storage for unstructured data.","Images, documents, backups, data lake files.","Containers, block vs append vs page blobs, Hot/Cool/Cold/Archive tiers, static website hosting, change feed","storage/blobs/"],
  ["Data Lake Storage Gen2","Storage","often","Blob Storage with a hierarchical namespace and POSIX-style ACLs.","Analytics lakes for Spark, Databricks, Synapse.","Hierarchical namespace, ACLs vs RBAC, abfss:// paths","storage/blobs/data-lake-storage-introduction"],
  ["Azure Files","Storage","often","Managed SMB and NFS file shares.","Lift-and-shift file servers, shared config, AVD profiles.","Standard vs Premium, identity-based SMB auth, Azure File Sync","storage/files/"],
  ["Managed Disks","Storage","core","Block storage for VMs.","Every VM's OS and data disks.","Standard HDD/SSD, Premium SSD v1/v2, Ultra Disk, snapshots, encryption at host","virtual-machines/managed-disks-overview"],
  ["Azure NetApp Files","Storage","niche","Enterprise high-performance NFS/SMB file storage.","SAP, HPC, databases on file shares.","Capacity pools, service levels, snapshots","azure-netapp-files/"],
  // Databases
  ["Azure SQL Database","Databases","core","Fully managed SQL Server engine database.","New relational applications.","vCore vs DTU, serverless auto-pause, Hyperscale, elastic pools, failover groups, Entra-only auth, Defender for SQL","azure-sql/database/"],
  ["SQL Managed Instance","Databases","often","Near-100% SQL Server compatibility as PaaS.","Migrating existing SQL Server workloads.","VNet-injected subnet, SQL Agent, cross-database queries, Managed Instance link","azure-sql/managed-instance/"],
  ["Cosmos DB","Databases","core","Globally distributed NoSQL database with single-digit-ms latency.","High-scale apps, IoT, catalogs, user profiles, AI apps needing vector search.","APIs (NoSQL, MongoDB, Cassandra, Gremlin, Table), RU/s, partition keys, consistency levels, change feed, serverless vs provisioned vs autoscale","cosmos-db/"],
  ["Database for PostgreSQL","Databases","often","Managed PostgreSQL (Flexible Server).","Open-source stacks, geospatial (PostGIS), pgvector for AI.","Compute tiers, HA, read replicas, extensions, Entra auth","postgresql/"],
  ["Database for MySQL","Databases","niche","Managed MySQL (Flexible Server).","WordPress, LAMP and existing MySQL apps.","HA, read replicas, server parameters","mysql/"],
  ["Azure Managed Redis","Databases","often","Managed in-memory Redis. Successor to Azure Cache for Redis.","Caching, session state, rate limits, pub/sub.","Tiers, clustering, persistence, geo-replication, Redis modules","redis/"],
  ["Azure Cache for Redis","Databases","retiring","The older Redis offering, being retired in favor of Azure Managed Redis.","Existing apps only; plan a migration.","Basic/Standard/Premium/Enterprise tiers, retirement timeline","azure-cache-for-redis/"],
  // Data & analytics
  ["Microsoft Fabric","Data & Analytics","often","SaaS analytics platform: lakehouse, warehouse, pipelines, real-time and Power BI on OneLake.","New analytics platforms, Power BI-centric organizations.","Capacities (F SKUs), workspaces, OneLake and shortcuts, Lakehouse vs Warehouse, Eventhouse, Direct Lake","https://learn.microsoft.com/fabric/"],
  ["Azure Data Factory","Data & Analytics","often","Managed ETL/ELT orchestration with 90+ connectors.","Moving and transforming data on a schedule.","Pipelines, activities, linked services, datasets, integration runtimes (self-hosted for on-prem), mapping data flows","data-factory/"],
  ["Azure Databricks","Data & Analytics","often","Apache Spark and lakehouse platform, run jointly with Databricks.","Data engineering, ML and large-scale transformation.","Workspaces, clusters vs serverless, Unity Catalog, Delta Lake, jobs","databricks/"],
  ["Synapse Analytics","Data & Analytics","niche","Combined data warehouse, Spark and pipelines. Microsoft now steers new work to Fabric.","Existing Synapse estates.","Dedicated vs serverless SQL pools, Spark pools, migration to Fabric","synapse-analytics/"],
  ["Event Hubs","Data & Analytics","core","Big-data streaming ingestion; Kafka-compatible.","Telemetry, logs, clickstream at millions of events/sec.","Partitions, consumer groups, throughput/processing units, Capture, Kafka endpoint, Schema Registry","event-hubs/"],
  ["Stream Analytics","Data & Analytics","niche","Real-time SQL-like queries over streams.","Windowed aggregations, anomaly alerts on IoT or event data.","Inputs/outputs, windowing functions, streaming units","stream-analytics/"],
  ["Data Explorer","Data & Analytics","niche","Fast analytics engine for logs and time series using KQL.","Telemetry exploration at scale (also inside Fabric as Eventhouse).","Clusters, databases, ingestion, materialized views, retention and caching policies","data-explorer/"],
  ["Microsoft Purview","Data & Analytics","often","Data governance: catalog, lineage, classification and compliance.","Knowing what data you have and who touches it.","Data Map, scans, sensitivity labels, unified catalog, DLP","https://learn.microsoft.com/purview/"],
  // Integration
  ["Service Bus","Integration","core","Enterprise message broker with queues and topics.","Reliable business messaging between services.","Queues vs topics/subscriptions, sessions, dead-letter queue, peek-lock, duplicate detection, Premium tier","service-bus-messaging/"],
  ["Event Grid","Integration","core","Serverless pub/sub event routing.","Reacting to Azure resource events and custom events.","System topics, custom topics, event subscriptions and filters, CloudEvents, namespaces with MQTT","event-grid/"],
  ["Logic Apps","Integration","often","Low-code workflows with hundreds of connectors.","Integrations with SaaS (Salesforce, SAP, Office 365), approvals, B2B/EDI.","Consumption vs Standard, triggers, actions, connectors, integration accounts","logic-apps/"],
  ["API Management","Integration","core","Gateway, developer portal and policies in front of your APIs.","Publishing internal or external APIs consistently, AI gateway for model endpoints.","Products, subscriptions/keys, policies (rate limit, JWT validation, transform), self-hosted gateway, tiers (Developer, Basic v2, Standard v2, Premium)","api-management/"],
  ["Web PubSub / SignalR Service","Integration","niche","Managed real-time WebSocket messaging.","Live updates, chat, collaborative apps.","Hubs, groups, serverless mode with Functions","azure-web-pubsub/"],
  // AI
  ["Microsoft Foundry","AI","core","Platform for building AI apps and agents (formerly Azure AI Foundry).","Generative AI apps, agents, model evaluation.","Foundry resource and projects, model catalog, deployments, Agent Service, evaluations, content safety, tracing","https://learn.microsoft.com/azure/ai-foundry/"],
  ["Azure OpenAI in Foundry Models","AI","core","OpenAI models hosted in Azure with enterprise controls.","Chat, summarization, extraction, embeddings, image generation.","Deployments (standard, provisioned, global, data zone), tokens and quotas (TPM), content filters, private networking","https://learn.microsoft.com/azure/ai-foundry/openai/"],
  ["Azure AI Search","AI","core","Search engine with full-text, vector and hybrid retrieval.","Retrieval-augmented generation (RAG), site and document search.","Indexes, indexers, skillsets, vector fields, semantic ranker, hybrid queries","search/"],
  ["Azure AI services","AI","often","Prebuilt APIs: Vision, Speech, Language, Translator, Document Intelligence, Content Safety.","Adding OCR, transcription, translation or form extraction without training models.","Multi-service vs single-service resources, keys vs Entra auth, containers for on-prem","ai-services/"],
  ["Document Intelligence","AI","often","Extracts text, tables and fields from documents.","Invoices, receipts, IDs, custom forms.","Prebuilt vs custom models, layout model, confidence scores","ai-services/document-intelligence/"],
  ["Azure Machine Learning","AI","often","Platform for training, tracking and deploying custom ML models.","Classic ML and custom model ops (MLOps).","Workspaces, compute clusters, pipelines, MLflow, managed online endpoints, registries","machine-learning/"],
  // Security
  ["Microsoft Entra ID","Security & Identity","core","Cloud identity and access management (formerly Azure Active Directory).","Every sign-in to Azure and to your apps.","Tenants, users/groups, app registrations vs enterprise apps, Conditional Access, PIM, MFA, External ID for customers","https://learn.microsoft.com/entra/identity/"],
  ["Managed Identities","Security & Identity","core","Automatically managed identities for Azure resources.","Any service-to-service auth inside Azure.","System vs user-assigned, DefaultAzureCredential in SDKs, federated credentials","https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/"],
  ["Key Vault","Security & Identity","core","Secure store for secrets, keys and certificates.","Connection strings, API keys, TLS certs, encryption keys.","RBAC vs access policies, soft delete and purge protection, Key Vault references in App Service, rotation, Managed HSM","key-vault/"],
  ["Defender for Cloud","Security & Identity","core","Cloud security posture management and workload protection.","Secure score, misconfiguration findings, threat detection across Azure, AWS and GCP.","Foundational CSPM vs Defender CSPM, Defender plans (Servers, Storage, SQL, Containers), regulatory compliance dashboard","defender-for-cloud/"],
  ["Microsoft Sentinel","Security & Identity","often","Cloud-native SIEM and SOAR, on Log Analytics.","Security operations, threat hunting and incident response.","Data connectors, analytics rules, incidents, playbooks (Logic Apps), hunting with KQL, Defender portal integration","sentinel/"],
  ["Azure Policy","Security & Identity","core","Enforces and audits rules across resources.","Governance at scale; compliance reporting.","Definitions, initiatives, assignments, effects, remediation tasks, exemptions","governance/policy/"],
  ["Azure RBAC","Security & Identity","core","Role-based access control for Azure resources.","Granting least-privilege access.","Role definitions, assignments, scopes, custom roles, data actions vs actions, conditions (ABAC)","role-based-access-control/"],
  // Management & monitoring
  ["Azure Monitor","Management","core","Umbrella for metrics, logs, alerts and insights.","Observability for every workload.","Metrics vs logs, diagnostic settings, data collection rules, alerts, action groups, workbooks","azure-monitor/"],
  ["Log Analytics","Management","core","Workspace that stores logs and runs KQL queries.","Central log store for Monitor, Sentinel and Defender.","Workspace design, tables and plans (Analytics, Basic, Auxiliary), retention, commitment tiers","azure-monitor/logs/log-analytics-overview"],
  ["Application Insights","Management","core","Application performance monitoring.","Tracing requests, dependencies and exceptions in your code.","Workspace-based resources, OpenTelemetry distro, application map, availability tests, sampling","azure-monitor/app/app-insights-overview"],
  ["Cost Management","Management","core","Cost analysis, budgets and recommendations.","Knowing and controlling what you spend.","Cost analysis views, budgets and alerts, exports, reservations, savings plans, amortized vs actual cost","cost-management-billing/"],
  ["Azure Advisor","Management","often","Personalized best-practice recommendations.","Quick wins on cost, reliability, security and performance.","Advisor score, recommendation categories, alerts","advisor/"],
  ["Resource Graph","Management","often","KQL queries across resources in all subscriptions.","Inventory, compliance spot-checks, change history.","resources table, resourcechanges, Graph Explorer in the portal","governance/resource-graph/"],
  ["Azure Backup","Management","core","Managed backup for VMs, databases, files and blobs.","Every production workload with data.","Recovery Services vs Backup vaults, policies, soft delete, immutable vaults, cross-region restore","backup/"],
  ["Site Recovery","Management","often","Disaster recovery by replicating VMs to another region.","Regional DR for VM-based workloads.","Replication policies, recovery plans, test failover, RPO","site-recovery/"],
  ["Azure Arc","Management","often","Extends Azure management to servers, Kubernetes and data services anywhere.","Hybrid and multi-cloud estates managed from one control plane.","Arc-enabled servers, Arc-enabled Kubernetes, policy and monitoring on non-Azure machines","azure-arc/"],
  ["Azure Local","Management","niche","Azure-managed hyperconverged infrastructure in your own datacenter (formerly Azure Stack HCI).","Edge sites, data residency, low-latency on-prem.","Clusters, Arc VMs, AKS on Azure Local","https://learn.microsoft.com/azure/azure-local/"],
  ["Azure Migrate","Management","often","Discovery, assessment and migration of on-prem workloads.","Planning and executing datacenter moves.","Appliance discovery, assessments, dependency analysis, server and database migration","migrate/"],
  ["Azure Blueprints","Management","retiring","Packaged policies, roles and templates. Being retired.","Do not start new work; migrate to Template Specs and Deployment Stacks.","Migration to Deployment Stacks","governance/blueprints/"],
  // DevOps
  ["Azure DevOps","DevOps","core","Boards, Repos, Pipelines, Artifacts and Test Plans.","CI/CD and work tracking in many enterprises.","YAML pipelines, stages/jobs/steps, service connections (with workload identity federation), environments and approvals, variable groups, agent pools","https://learn.microsoft.com/azure/devops/"],
  ["Bicep","DevOps","core","Declarative IaC language for Azure.","Deploying Azure resources repeatably.","Modules, parameters files (.bicepparam), what-if, deployment scopes, template specs, AVM modules","azure-resource-manager/bicep/"],
  ["Deployment Stacks","DevOps","often","Manage a group of resources as one unit with deny settings.","Lifecycle management and drift protection for IaC deployments.","Action on unmanage (detach/delete), deny settings, scopes","azure-resource-manager/bicep/deployment-stacks"],
  ["App Configuration","DevOps","often","Central store for app settings and feature flags.","Config shared across services; progressive feature rollout.","Key-values, labels, feature flags, Key Vault references, snapshots","azure-app-configuration/"],
  ["Azure Load Testing","DevOps","niche","Managed load testing using JMeter or Locust scripts.","Validating performance before a launch.","Test runs, server-side metrics, CI integration, fail criteria","load-testing/"],
  ["Dev Box / Deployment Environments","DevOps","niche","Self-serve dev workstations and on-demand app environments.","Platform engineering for developer experience.","Dev centers, projects, environment definitions","dev-box/"]
];
const services = S.map(([name,cat,tier,what,when,concepts,doc]) => ({name,cat,tier,what,when,concepts,url: doc.startsWith("http") ? doc : L(doc)}));
const tierLabel = {core:"core",often:"common",niche:"specialist",retiring:"retiring"};
const cats = ["All", ...new Set(services.map(s=>s.cat))];

const grid = document.getElementById("grid"), q = document.getElementById("q"), chips = document.getElementById("chips"),
      countLbl = document.getElementById("countLbl"), empty = document.getElementById("empty");
const svcCount = document.getElementById("svcCount");
if (svcCount) svcCount.textContent = services.length + " services";
let activeCat = "All";
const esc = s => s.replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

if (grid) cats.forEach(c => {
  const b = document.createElement("button");
  b.className = "chip"; b.type = "button"; b.textContent = c; b.setAttribute("aria-pressed", c==="All");
  b.onclick = () => { activeCat = c; [...chips.children].forEach(x => x.setAttribute("aria-pressed", x===b)); render(); };
  chips.appendChild(b);
});

function render(){
  const term = q.value.trim().toLowerCase();
  const list = services.filter(s => (activeCat==="All" || s.cat===activeCat) &&
    (!term || [s.name,s.cat,s.what,s.when,s.concepts].join(" ").toLowerCase().includes(term)));
  grid.innerHTML = list.map(s => `
    <article class="svc">
      <div class="top"><h4>${esc(s.name)}</h4><span class="tier ${s.tier}">${tierLabel[s.tier]}</span></div>
      <p class="what">${esc(s.what)}</p>
      <dl><div><dt>Use it for</dt><dd>${esc(s.when)}</dd></div><div><dt>Key concepts</dt><dd>${esc(s.concepts)}</dd></div></dl>
      <div class="meta"><span class="tag">${esc(s.cat)}</span><a class="doc" href="${s.url}" target="_blank" rel="noopener">Docs ↗</a></div>
    </article>`).join("");
  countLbl.textContent = `${list.length} of ${services.length}`;
  empty.hidden = list.length > 0;
}
if (grid) { q.addEventListener("input", render); render(); }

// decision tabs
const tabs = document.querySelectorAll(".tab"), panes = document.querySelectorAll("[data-p]");
tabs.forEach(t => t.onclick = () => {
  tabs.forEach(x => x.setAttribute("aria-selected", x===t));
  panes.forEach(p => p.hidden = p.dataset.p !== t.dataset.t);
});

// copy buttons
document.querySelectorAll(".copy").forEach(b => b.onclick = () => {
  const pre = b.closest(".code").querySelector("pre");
  const done = () => { b.textContent = "Copied"; setTimeout(()=>b.textContent="Copy",1500); };
  navigator.clipboard?.writeText(pre.innerText).then(done).catch(() => {
    const r = document.createRange(); r.selectNodeContents(pre); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent = "Selected — press ⌘C";
  });
});

// glossary
const G = [
  ["ARM","Azure Resource Manager, the API every management operation goes through."],
  ["AVM","Azure Verified Modules, Microsoft-maintained Bicep/Terraform modules."],
  ["CAF","Cloud Adoption Framework, Microsoft's guidance for organizational cloud adoption."],
  ["CIDR","Notation for IP ranges like 10.0.0.0/16. Plan VNet ranges so they never overlap on-prem or other VNets."],
  ["CSPM","Cloud Security Posture Management, finding misconfigurations (Defender for Cloud)."],
  ["DefaultAzureCredential","SDK class that tries managed identity, CLI login, env vars, etc. in order, so the same code works locally and in Azure."],
  ["Diagnostic settings","Per-resource config that ships resource logs and metrics to Log Analytics, Storage or Event Hubs."],
  ["DTU / vCore","Two purchasing models for Azure SQL: bundled compute units vs choosing cores and memory directly."],
  ["Entra ID","Microsoft's identity service, formerly Azure Active Directory (Azure AD / AAD)."],
  ["FQDN","Fully qualified domain name, e.g. myapp.azurewebsites.net."],
  ["IaC","Infrastructure as code: Bicep, ARM, Terraform."],
  ["KEDA","Kubernetes Event-Driven Autoscaling, scales containers on queue depth, HTTP traffic and more. Built into Container Apps."],
  ["KQL","Kusto Query Language, used by Log Analytics, Resource Graph, Sentinel, Data Explorer and Fabric."],
  ["Landing zone","A pre-configured subscription with networking, identity, policy and monitoring already in place for a workload."],
  ["NSG / ASG","Network Security Group (rules) / Application Security Group (named group of NICs used in rules)."],
  ["NVA","Network virtual appliance, a third-party firewall or router VM."],
  ["OIDC federation","Trust between Entra and an external identity provider (e.g. GitHub) so pipelines get tokens without secrets."],
  ["PIM","Privileged Identity Management, just-in-time activation of admin roles."],
  ["RAG","Retrieval-augmented generation: fetch relevant documents (often from AI Search) and give them to a model with the question."],
  ["RBAC","Role-based access control: principal + role + scope."],
  ["RPO / RTO","Recovery point objective (how much data you can lose) / recovery time objective (how long you can be down)."],
  ["RU/s","Request Units per second, Cosmos DB's currency for throughput."],
  ["SAS","Shared Access Signature, a signed URL granting time-limited access to storage. Prefer Entra auth where possible."],
  ["Service principal","An application's identity inside a tenant."],
  ["Service tag","A Microsoft-maintained label for a set of Azure IP ranges (e.g. Storage.EastUS2) usable in NSG and firewall rules."],
  ["SKU","Stock-keeping unit, the tier or size of a resource (e.g. Standard_LRS, P1v3)."],
  ["SLA","Service level agreement, the uptime Microsoft commits to. Composite SLAs multiply, so chained services lower overall availability."],
  ["TPM","Tokens per minute, the quota unit for Azure OpenAI model deployments."],
  ["UDR","User-defined route, a custom route table entry that overrides Azure's system routes."],
  ["ACR","Azure Container Registry, where your container images live."],
  ["Cold start","Delay on the first request after an app has scaled to zero while a new instance starts."],
  ["Helm","Package manager for Kubernetes; a chart is a templated bundle of manifests."],
  ["Idempotent","Safe to run twice with the same result. Deployments and message handlers should be."],
  ["Ingress","Kubernetes rules that route outside HTTP traffic to services inside a cluster."],
  ["Namespace","A folder inside a Kubernetes cluster that separates teams or apps."],
  ["Pod","The smallest unit Kubernetes runs: one or more containers sharing a network address."],
  ["Revision","An immutable snapshot of a Container App's config; traffic can be split between revisions."],
  ["What-if","Preview of what a Bicep/ARM deployment will change before you run it."]
];
const glossEl = document.getElementById("gloss");
if (glossEl) glossEl.innerHTML = G.sort((a,b)=>a[0].localeCompare(b[0])).map(([t,d])=>`<div><dt>${t}</dt><dd>${esc(d)}</dd></div>`).join("");

// mobile jump menu: each chapter is its own page
const jumpSel = document.getElementById("jumpSel");
if (jumpSel) {
  const cur = location.pathname.split("/").pop().replace(/\.html$/, "");
  if (![...jumpSel.options].some(o => o.value === cur)) jumpSel.insertAdjacentHTML("afterbegin", '<option value="index">Contents</option>');
  jumpSel.value = [...jumpSel.options].some(o => o.value === cur) ? cur : "index";
  jumpSel.onchange = e => { location.href = e.target.value + ".html"; };
}

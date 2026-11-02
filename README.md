# Azure Field Guide

A single-page working reference for Microsoft Azure, for developers and infrastructure engineers.

**Live site:** https://choicespecs.github.io/azure-field-guide/

## What's inside

- **Core ideas**: the six principles behind how Azure behaves
- **Mental model**: tenant → management groups → subscriptions → resource groups → resources, control vs data plane, regions and zones
- **Identity & governance**: Entra ID, managed identities, RBAC, Azure Policy, PIM
- **Service catalog**: ~80 services, searchable and filterable
- **Which one do I pick?**: comparison tables for compute, messaging, load balancing, databases, private connectivity, storage redundancy
- **How it fits together**: four reference architectures with diagrams
- **Tooling & IaC**: CLI, Bicep, Terraform, azd, Azure DevOps, GitHub Actions
- **Building apps**: SDKs with DefaultAzureCredential, local dev loop, config and secrets, shipping code, gotchas
- **Running the platform**: IP planning, IaC structure, connectivity troubleshooting, cost hygiene, production baseline
- **Containers & Kubernetes**: vocabulary, Dockerfile, ACR builds, manifests, kubectl, pod troubleshooting
- **Monitoring & ops**, **Well-Architected Framework**
- **Walkthroughs**: five end-to-end examples (Key Vault + managed identity, private endpoints, Container Apps scaling, Bicep via GitHub Actions OIDC, KQL)
- **Mapping an environment**: questions to answer about any environment and read-only inventory commands
- **Docs & links**, **glossary**

## Editing

Everything lives in `index.html` (no build step). Service catalog entries are in the `S` array in the script at the bottom; the glossary is in `G`. Push to `main` and GitHub Pages republishes automatically.

Content reflects Azure as of October 2026. When this guide and Microsoft Learn disagree, trust Learn.

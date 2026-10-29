# Azure Field Guide

A single-page learning reference for Microsoft Azure, aimed at developers and infrastructure engineers who are new to the platform.

**Live site:** https://choicespecs.github.io/azure-field-guide/

## What's inside

- **Start here**: plain-language primer for people new to cloud
- **Mental model**: tenant → management groups → subscriptions → resource groups → resources, control vs data plane, regions and zones
- **Identity & governance**: Entra ID, managed identities, RBAC, Azure Policy, PIM
- **Service catalog**: ~80 services, searchable and filterable
- **Which one do I pick?**: comparison tables for compute, messaging, load balancing, databases, private connectivity, storage redundancy
- **How it fits together**: four reference architectures with diagrams
- **Tooling & IaC**: CLI, Bicep, Terraform, azd, Azure DevOps, GitHub Actions
- **Developer track**: SDKs with DefaultAzureCredential, local dev loop, config and secrets, shipping code, gotchas
- **Infrastructure track**: IP planning, IaC structure, connectivity troubleshooting, cost hygiene, production baseline
- **Monitoring & ops**, **Well-Architected Framework**, **12-week plan** (progress saved in your browser), **learning resources**, **glossary**

## Editing

Everything lives in `index.html` (no build step). Service catalog entries are in the `S` array in the script at the bottom; the 12-week plan is in `plan`; the glossary is in `G`. Push to `main` and GitHub Pages republishes automatically.

Content reflects Azure as of October 2026. When this guide and Microsoft Learn disagree, trust Learn.

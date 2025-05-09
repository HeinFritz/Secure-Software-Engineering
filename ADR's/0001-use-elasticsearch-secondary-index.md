---
status: "{accepted}"
date: {2024-11-09}
decision-makers: {Cameron Smith, Thomas Gordge, Hein Zaw}
consulted: {SAAD Module Team}
informed: {SAAD Module Team}
---

# Use Elasticsearch as a Secondary Index for an Efficient & Scalable Core Full-Text Search Feature.

## Context and Problem Statement

Full-text search is a core system function that will drive both customer-facing and employee operations in AML's proposed system. Without full-text-search,
it will become impossible for users to search through the vast amounts of data collected & processed by the system. Given the importance of this feature, 
it is imperative that search performance does not degrade with the ever-increasing load & data requirements.

* AML currently serves 20% of England's population with this figure expected to grow by 10% annually. Although the growth seems predictable given the projection,
it is likely that the growth will come in peaks & troughs. Overall system load will follow the same pattern, therefore it is important to make sure that the computational
resources backing the search functionality are automatically-scaled. Manually provisioning of resources could lead to misallocation which will come with increased costs
and potentially critical operational failure.
* Facing growing competition and increasing user demands, AML are seeking to be more adaptable to industry trends and consumer tastes. As well as simply collecting
more data for analysis and process improvement, the shape of this data is likely to change, and entirely new entities may be introduced into the system. To facilitate
this need, the search functionality must be easily adaptable to changes in existing data schema, and seamlessly handle the addition of new data types.
* Full-text search in and of itself has become a cornerstone of most modern applications, with users relying on search functionality to browse and process the 
vast amounts of data stored in contemporary systems. Given the central role that search plays in overall user experience, it is essential that AML's search experience
is seamless whilst at the same time being feature-rich. The search functionality must provide common features such as: auto-complete, spell-correction, fuzzing, and 
filtering/sorting capabilities.

## Considered Options

* Relational database (Postgres) with a full-text search extension.
* Lucene distributed over NFS.
* Elasticsearch.

## Decision Outcome

Chosen option: "Elasticsearch", because it is the only option providing automatic-scaling capabilities, dynamic data-schema, and out-of-the-box features like fuzzing, filtering, sorting, and paging. Additionally, Elasticsearch exists within an entire ecosystem of tools & services which AML may wish to use in the future to support
their business aims.

### Consequences

* Good - Automatic-scaling will reduce costs and improve overall system resiliency.
* Good - Excellent observability and monitoring capabilites.
* Good - Comes with full suite of analytics tools which can be configured to serve several business needs.
* Good - The out-of-the-box features will save huge amounts of developer effort and massively increase quality of the search experience.
* Bad - Higher cost in comparison to using Lucene distributed over NFS.
* Bad - Increases overall complexity of the system - have to consider network partitions and consistency issues e.g. if CDC fails then ELS will fall out of sync.
* Bad - Elasticsearch uses an eventual consistency model - so it may not be suitable for some aspects of the system e.g. payments.

### Confirmation

ADR is fulfilled if an Elasticsearch cluster is deployed alongside the main relational database and updated with CDC in the following services: media catalogue, media procurement, user profiles, reporting service.

## Pros and Cons of the Options

### Relational Database (Postgres) With Full-Text Search Extension

Most relational databases offer support for full-text search with the installation of an extension. In this case, such an extension would be installed on relevant
relational databases and used for full-text search.

* Good - Simple set-up and doesn't increase infrastucture costs massively.
* Good - No issues with consistency between search index and source of truth.
* Good - Automatic-scaling.
* Neutral - Doesn't offer advanced search features out-of-the-box.
* Bad - Although the database can be scaled automatically, it's not as efficient as dedicated solutions. Performance will degrade as database size grows.
* Bad - Only optimized for text-fields which limits capabilites - dedicated solutions can handle numeric, range and nested types.

### Lucene over NFS.

Lucene is the database that actually powers Elasticsearch, with Elasticsearch essentially providing a orchestration framework for Lucene alongside an ecosystem
of tools & services. To avoid vendor-lock in and license costs, we could use Lucene distributed over NFS to back the core search functionality.

* Good - No vendor lock-in and no license fees.
* Good - Lower infrastucture costs.
* Good - Fine-grained control of analyzers and index configuration.
* Bad - Distributed features will need to be implemented manually, e.g. sharding, coordination, consistency model.
* Bad - Lacks out-of-the-box advanced features & tooling.
* Bad - Introduces a single-point of failure if NFS is managed on-premise.

# ABSTAT (Front-end Application)

ABSTAT is a powerful tool designed to provide statistical profiles of RDF knowledge graphs, offering users a compact and comprehensive way to analyze and manage semantic data.  
This repository contains the front-end module.  
- For the back-end application, please refer to the [**ABSTAT (Back-end Application) Repository**](https://bitbucket.org/disco_unimib/abstat).
- For core algorithms, please refer to the [**ABSTAT-HD Repository**](https://bitbucket.org/disco_unimib/abstat-distributed).

---

## Dependencies

Ensure the following dependencies are installed before proceeding:

- **Node.js**
- **Angular CLI**

---

## Installation and Build

Follow these steps to set up and build the ABSTAT front-end:

1. Clone the repository and navigate to the project folder.
2. Run the installation script:
   ```bash
   $ ./install.sh
   ```
3. Build the project with the desired configuration mode:
   ```bash
   $ ng build --configuration=<mode>
   ```
   

### Configuration Modes:
- **public**: Suitable for a read-only ABSTAT deployment.
- **full-open**: Enables all features for an open deployment.
- **full-closed**: Enables all features with authentication required.

4. Configure the backend settings by updating the `BACKEND` and `CLUSTER_BACKEND` variables in the `abstat-front-end/src/app/auth.constant.ts` file.

---

## Main Views

### Browse 
- Displays available datasets, ontologies and computed profiles with metadata such as the number of triples, patterns, timestamps, and validation status.
- Highlights key properties like inference, cardinality, and property constraints.

### Faceted Search
- Summarizes frequent subject-predicate-object patterns.
- Provides metrics such as frequency, instance count, and cardinality.

### Full-Text Search
- Filters concepts, properties, and types within datasets.
- Includes options to prefer or exclude non-preferred resources.
- 
---

## References

For a detailed explanation of ABSTAT’s methodologies and applications, refer to the following papers:

- *Principe, R. A. A., Spahiu, B., Palmonari, M., Rula, A., De Paoli, F., & Maurino, A. (2018). ABSTAT 1.0: Compute, manage and share semantic profiles of RDF knowledge graphs. In The Semantic Web: ESWC 2018 Satellite Events: ESWC 2018 Satellite Events, Heraklion, Crete, Greece, June 3-7, 2018, Revised Selected Papers 15 (pp. 170-175). Springer International Publishing.*
- *Alva Principe, R. A., Maurino, A., Palmonari, M., Ciavotta, M., & Spahiu, B. (2021). ABSTAT-HD: a scalable tool for profiling very large knowledge graphs. The VLDB Journal, 1-26.*
---




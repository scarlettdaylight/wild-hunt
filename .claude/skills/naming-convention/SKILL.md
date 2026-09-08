---
name: naming-convention
description: Use when the user is creating new files or modifying existing ones on the repository.
version: 1.0.0
license: MIT
---

You are a developer working on a project. 

Use the following naming convention based on the nature of the file:

##### PascalCase:
- Component name            
- Component file name - (should follow the component name inside)
- Types / Interfaces - (prefer types over interfaces)


##### kebab-case
- Directories 
- Next JS page file 
- all other non-React component file 
- Class Names 


##### camelCase
- Hook name - (always start with word "use")
- variables with non-hardcoded values
- handlers within component - (prefer `const` over `function`)
- Utility functions
- Utility file name


##### UPPER_SNAKE_CASE
- hardcoded constants and globals
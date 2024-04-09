## Simplified DDD Practice Guide

This repository offers a tutorial on how to implement Domain-Driven Design (DDD) in a simplified manner for
small-scale projects, specifically utilizing Mikro-ORM as a direct repository mechanism. It aims to provide a clear and
easy-to-understand approach to DDD practices.

### Project Background

In Domain-Driven Design (DDD), there's typically a strong emphasis on the separation between the Domain Layer and the
Infrastructure Layer. However, in small-scale or educational projects, adhering strictly to this separation can
introduce unnecessary complexity. This example shows a simplified approach, using an ORM framework as a bridge between
the Domain Layer and the Infrastructure Layer, focusing on Mikro-ORM for its direct integration capabilities.

### Key Concepts

- **Domain Entity**: Reflects the core concepts of business logic and rules, directly mapped to the database structure
  and managed by Mikro-ORM.
- **ORM as Repository**: Simplifies data operations and business logic implementation by using the ORM's capabilities as
  the repository layer.

### Project Structure

```
├── src/
│   ├── domain/
│   │   ├── entities/         - Defines domain entities
│   │   │   └── Book.ts       - Book entity (Aggregate Root)
│   │   │   ├── Member.ts     - Member entity (Aggregate Root)
│   │   │   └── BorrowRecord.ts - Borrow record entity
│   │   └── interfaces/       - Domain service interfaces (if any)
│   │
│   ├── application/
│   │   ├── dtos/             - Data transfer object definitions
│   │   │   └── CreateBookDto.ts
│   │   │   ├── RegisterMemberDto.ts
│   │   │   ├── BorrowBookDto.ts
│   │   │   └── ReturnBookDto.ts
│   │   ├── services/         - Application services
│   │   │   └── BorrowService.ts
│   │   └── interfaces/       - Application service interfaces (e.g., REST API controllers)
│   │
│   └── infrastructure/
│       └── orm/              - ORM configuration and entity mapping
│           └── mikro-orm.config.ts
```

### Installation

Install the project dependencies:

```bash
$ npm install
```

### Running the App

- **Development mode**:

  ```bash
  $ npm run start
  ```

- **Watch mode**:

  ```bash
  $ npm run start:dev
  ```

- **Production mode**:

  ```bash
  $ npm run start:prod
  ```

### Conclusion

This example is intended to assist beginners in grasping the fundamental principles of Domain-Driven Design and to
facilitate the rapid implementation of business logic by directly utilizing an ORM as a repository. The highlights of
this project include:

- **Simplified DDD Approach**: A clear and practical example of DDD in action, tailored for small-scale projects.
- **Rich Domain Models**: Entities are designed to encapsulate business logic, demonstrating the power of a rich domain
  model.
- **ORM Integration**: Leveraging Mikro-ORM to bridge the gap between the domain and infrastructure layers, simplifying
  data persistence.
- **Focus on Business Logic**: The project structure and code examples emphasize the importance of business logic within
  domain entities.

The goal is that this streamlined approach will enhance your comprehension and practical application of DDD principles,
while also showcasing the benefits of a well-structured domain model.

# Consulta Fácil API

### Overview
**Consulta Fácil API** is a robust back-end solution designed for the management of law firms. The system centralizes the control of **clients, legal cases, and court hearings**, providing a secure and high-performance interface that enables lawyers and managers to organize the legal workflow efficiently.

---

### 🛠 Technologies and Architecture
The project logic is built on a modern ecosystem focused on strong typing and scalability:

- **NestJS**: Progressive Node.js framework for building efficient applications.
- **TypeScript**: Ensures type safety across the entire application.
- **PostgreSQL**: Relational database for secure storage of critical data.
- **TypeORM**: ORM for database management, using **Migrations** and **Subscribers** (automatic auditing).
- **JWT (JSON Web Token)**: Token-based authentication for route protection.
- **Docker & Docker Compose**: Standardization of development and production environments.
- **Swagger (OpenAPI)**: Interactive documentation for easy front-end integration.

---

### 🚀 System Modules
The project follows a modular structure, where each business domain is isolated and independent:

- **Authentication (`AuthModule`)**: User registration, secure login with Bcrypt, and resource protection via JWT Strategy.
- **Clients (`ClienteModule`)**: Full client management, including custom validators for documents (CPF/CNPJ).
- **Cases (`ProcessoModule`)**: Management of cases linked to clients, allowing status tracking and case numbering.
- **Hearings (`AudienciaModule`)**: Scheduling of hearings linked to specific cases.
- **Dashboard (`DashboardModule`)**: Aggregation service that generates statistics and summaries about system data volume.

---

### 💻 Installation and Running

#### 1. Clone and install dependencies
```bash
npm install

#### 2. Docker setup (Recommended)

Make sure Docker is installed and run:

```bash
docker-compose up -d
```

#### 3. Environment Variables

Create a `.env` file at the root of the project with the database credentials and the `JWT_SECRET`.

#### 4. Development Execution

```bash
npm run start:dev
```

#### 5. Access the Documentation

After starting the server, the Swagger documentation will be available at:
`http://localhost:3000/api`

---

### 📂 Main Folder Structure

* `src/modules`: Business logic divided by features.
* `src/database`: Entity definitions, migrations, and TypeORM configuration.
* `src/common`: Validators, decorators, and global utilities.
* `src/main.ts`: Application entry point and Swagger configuration.

---

### Conclusion

This project provides a solid foundation for the digitalization of legal processes, focusing on **security, data auditing, and modular organization**, making continuous software expansion straightforward.

```
```

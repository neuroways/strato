# NeuroPlay — Implementierungs- und Deployment-Handbuch

**Version:** 1.0  
**Letztes Update:** 2025-01-15

---

## Inhaltsverzeichnis

1. [Schnellstart](#schnellstart)
2. [Datenbankeinrichtung](#datenbankeinrichtung)
3. [Backend-Implementierung](#backend-implementierung)
4. [Frontend-Integration](#frontend-integration)
5. [Deployment](#deployment)
6. [Testing](#testing)
7. [Monitoring & Support](#monitoring--support)

---

## Schnellstart

### Voraussetzungen

- Node.js 16+ oder Python 3.8+
- MySQL 8.0+ oder PostgreSQL 12+
- Git

### 1. Repository klonen

```bash
git clone https://github.com/yourorg/neuroplay.git
cd neuroplay
```

### 2. Datenbank erstellen und Schema laden

**MySQL:**
```bash
mysql -u root -p < scripts/create_database.sql
mysql -u root -p neuroplay < neuroplay_schema.sql
mysql -u root -p neuroplay < neuroplay_testdata.sql
```

**PostgreSQL:**
```bash
createdb neuroplay
psql neuroplay < neuroplay_schema.sql
psql neuroplay < neuroplay_testdata.sql
```

### 3. Backend-Abhängigkeiten installieren

**Node.js / Express:**
```bash
npm install
cp .env.example .env
# Konfiguriere .env mit Datenbankdaten
npm run dev
```

**Python / Flask:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Konfiguriere .env mit Datenbankdaten
python app.py
```

### 4. Erste Admin-Benutzer erstellen

```bash
npm run create-admin -- --email admin@example.com --password secure123
```

### 5. API testen

```bash
curl -X GET http://localhost:3000/api/v1/activities \
  -H "Authorization: Bearer <token>"
```

---

## Datenbankeinrichtung

### Schema-Installation

**Option 1: Direkte SQL-Ausführung**

```bash
mysql -u neuroplay -p neuroplay < neuroplay_schema.sql
```

**Option 2: Migrations-basiert (Recommended)**

```bash
npm run migrate
```

**Migrations-Datei hinzufügen:**
```bash
npm run migrate:create -- --name add_new_table
# Bearbeite: migrations/001_add_new_table.sql
npm run migrate:up
```

### Testdaten laden

```bash
mysql -u neuroplay -p neuroplay < neuroplay_testdata.sql
```

### Datenbank-Backup erstellen

```bash
mysqldump -u neuroplay -p neuroplay > backup_$(date +%Y%m%d).sql
```

### Datenbank-Restore

```bash
mysql -u neuroplay -p neuroplay < backup_20250115.sql
```

---

## Backend-Implementierung

### Node.js / Express-Beispiel

#### Dateistruktur

```
backend/
├── src/
│   ├── index.js              # Entry Point
│   ├── config/
│   │   ├── database.js       # DB-Konfiguration
│   │   ├── env.js            # Umgebungsvariablen
│   │   └── auth.js           # JWT-Konfiguration
│   ├── routes/
│   │   ├── activities.js     # Activity Endpoints
│   │   ├── sessions.js       # Session Endpoints
│   │   ├── recommendations.js # Recommendation Endpoints
│   │   ├── users.js          # User Endpoints
│   │   └── auth.js           # Auth Endpoints
│   ├── controllers/
│   │   ├── ActivityController.js
│   │   ├── SessionController.js
│   │   ├── RecommendationController.js
│   │   └── UserController.js
│   ├── services/
│   │   ├── ActivityService.js
│   │   ├── SessionService.js
│   │   ├── RecommendationEngine.js
│   │   └── AnalyticsService.js
│   ├── middleware/
│   │   ├── authenticate.js   # JWT-Authentifizierung
│   │   ├── authorize.js      # Autorisierung/Rollen
│   │   └── errorHandler.js   # Error-Handling
│   ├── models/
│   │   └── database.js       # SQLAlchemy ORM oder Raw SQL
│   └── utils/
│       ├── validators.js     # Input-Validierung
│       ├── formatters.js     # Response-Formatting
│       └── logger.js         # Logging
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── migrations/
│   ├── 001_initial_schema.sql
│   └── 002_add_indexes.sql
├── .env.example
├── package.json
└── README.md
```

#### Express App Setup

```javascript
// src/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { initializeDatabase } = require('./config/database');
const authMiddleware = require('./middleware/authenticate');
const errorHandler = require('./middleware/errorHandler');

// Routes
const activityRoutes = require('./routes/activities');
const sessionRoutes = require('./routes/sessions');
const authRoutes = require('./routes/auth');
const recommendationRoutes = require('./routes/recommendations');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Database
initializeDatabase().catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

// Public Routes
app.use('/api/v1/auth', authRoutes);

// Protected Routes
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/sessions', authMiddleware, sessionRoutes);
app.use('/api/v1/recommendations', authMiddleware, recommendationRoutes);

// Error Handling
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NeuroPlay API running on port ${PORT}`);
});
```

#### ActivityService Beispiel

```javascript
// src/services/ActivityService.js
const db = require('../config/database');

class ActivityService {
  async getActivity(activityId) {
    const query = `
      SELECT a.*, 
             GROUP_CONCAT(DISTINCT c.name) as categories,
             GROUP_CONCAT(DISTINCT t.name) as tags,
             COUNT(DISTINCT s.session_id) as total_sessions
      FROM activity a
      LEFT JOIN activity_category ac ON a.activity_id = ac.activity_id
      LEFT JOIN category c ON ac.category_id = c.category_id
      LEFT JOIN activity_tag at ON a.activity_id = at.activity_id
      LEFT JOIN tag t ON at.tag_id = t.tag_id
      LEFT JOIN session s ON a.activity_id = s.activity_id AND s.deleted_at IS NULL
      WHERE a.activity_id = ? AND a.deleted_at IS NULL
      GROUP BY a.activity_id
    `;
    
    const [rows] = await db.execute(query, [activityId]);
    if (rows.length === 0) throw new NotFoundError('Activity not found');
    
    return this.enrichActivityData(rows[0]);
  }

  async listActivities(filters = {}, pagination = {}) {
    const page = pagination.page || 1;
    const perPage = Math.min(pagination.per_page || 20, 100);
    const offset = (page - 1) * perPage;

    let whereClause = 'WHERE a.deleted_at IS NULL AND a.status = "published"';
    const params = [];

    if (filters.activity_type) {
      whereClause += ' AND a.activity_type = ?';
      params.push(filters.activity_type);
    }

    if (filters.complexity) {
      whereClause += ' AND a.complexity_level = ?';
      params.push(filters.complexity);
    }

    if (filters.min_duration) {
      whereClause += ' AND a.typical_duration_minutes >= ?';
      params.push(filters.min_duration);
    }

    const countQuery = `SELECT COUNT(DISTINCT a.activity_id) as total FROM activity a ${whereClause}`;
    const [countResult] = await db.execute(countQuery, params);
    const total = countResult[0].total;

    const query = `
      SELECT DISTINCT a.*
      FROM activity a
      ${whereClause}
      ORDER BY a.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [activities] = await db.execute(query, [...params, perPage, offset]);

    return {
      data: activities.map(a => this.formatActivityForList(a)),
      pagination: {
        page,
        per_page: perPage,
        total,
        total_pages: Math.ceil(total / perPage)
      }
    };
  }

  async createActivity(data, userId) {
    const query = `
      INSERT INTO activity (
        public_id, name, slug, activity_type, status,
        short_description, typical_duration_minutes,
        min_participants, max_participants, recommended_age_min,
        complexity_level, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      this.generateUUID(),
      data.name,
      data.slug || this.generateSlug(data.name),
      data.activity_type,
      data.status || 'draft',
      data.short_description,
      data.typical_duration_minutes,
      data.min_participants || 1,
      data.max_participants,
      data.recommended_age_min,
      data.complexity_level,
      userId
    ]);

    return await this.getActivity(result.insertId);
  }

  async setActivityAttribute(activityId, attributeId, value, source = 'redactional', userId) {
    // Check if attribute already exists
    const checkQuery = `
      SELECT activity_dna_id FROM activity_dna
      WHERE activity_id = ? AND attribute_definition_id = ? AND deleted_at IS NULL
    `;
    const [existing] = await db.execute(checkQuery, [activityId, attributeId]);

    if (existing.length > 0) {
      // Update
      const updateQuery = `
        UPDATE activity_dna
        SET value = ?, source_type = ?, updated_by = ?, updated_at = NOW()
        WHERE activity_dna_id = ?
      `;
      await db.execute(updateQuery, [value, source, userId, existing[0].activity_dna_id]);
    } else {
      // Insert
      const insertQuery = `
        INSERT INTO activity_dna (
          activity_id, attribute_definition_id, value, source_type, created_by
        ) VALUES (?, ?, ?, ?, ?)
      `;
      await db.execute(insertQuery, [activityId, attributeId, value, source, userId]);
    }
  }

  // Helper methods
  enrichActivityData(activity) {
    // Fetch related data (DNA, rules, persons, etc.)
    return activity;
  }

  formatActivityForList(activity) {
    return {
      activity_id: activity.activity_id,
      public_id: activity.public_id,
      name: activity.name,
      slug: activity.slug,
      activity_type: activity.activity_type,
      short_description: activity.short_description,
      complexity_level: activity.complexity_level,
      typical_duration_minutes: activity.typical_duration_minutes
    };
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
}

module.exports = new ActivityService();
```

#### Authentication Middleware

```javascript
// src/middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Missing authorization token'
      }
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token'
      }
    });
  }
};

module.exports = authenticate;
```

---

## Frontend-Integration

### React/Vue Integration beispiel

```javascript
// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1'
});

// Add token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token expired, refresh it
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/refresh`,
          { token: localStorage.getItem('auth_token') }
        );
        localStorage.setItem('auth_token', response.data.token);
        return apiClient.request(error.config);
      } catch {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const ActivityAPI = {
  getActivities: (filters) => apiClient.get('/activities', { params: filters }),
  getActivity: (id) => apiClient.get(`/activities/${id}`),
  createActivity: (data) => apiClient.post('/activities', data),
  updateActivity: (id, data) => apiClient.patch(`/activities/${id}`, data),
  deleteActivity: (id) => apiClient.delete(`/activities/${id}`),

  getAttributes: (activityId) => apiClient.get(`/activities/${activityId}/attributes`),
  setAttribute: (activityId, data) => apiClient.post(`/activities/${activityId}/attributes`, data),
  bulkImportAttributes: (activityId, data) => 
    apiClient.post(`/activities/${activityId}/attributes/bulk-import`, data),

  getRules: (activityId) => apiClient.get(`/activities/${activityId}/rules`),
  createRule: (activityId, data) => apiClient.post(`/activities/${activityId}/rules`, data)
};

export const SessionAPI = {
  getSessions: (userId, filters) => 
    apiClient.get(`/users/${userId}/sessions`, { params: filters }),
  getSession: (id) => apiClient.get(`/sessions/${id}`),
  createSession: (data) => apiClient.post('/sessions', data),
  updateSession: (id, data) => apiClient.patch(`/sessions/${id}`, data),

  addObservation: (sessionId, data) => 
    apiClient.post(`/sessions/${sessionId}/observations`, data),
  getObservations: (sessionId) => 
    apiClient.get(`/sessions/${sessionId}/observations`),

  addImpact: (sessionId, data) => 
    apiClient.post(`/sessions/${sessionId}/impacts`, data),
  getImpacts: (sessionId) => 
    apiClient.get(`/sessions/${sessionId}/impacts`)
};

export const RecommendationAPI = {
  generateRecommendations: (data) => apiClient.post('/recommendations', data),
  getRecommendation: (id) => apiClient.get(`/recommendations/${id}`),
  sendFeedback: (id, data) => apiClient.patch(`/recommendations/${id}/feedback`, data)
};

export const AuthAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('auth_token');
  }
};

export default apiClient;
```

### React Hook für Aktivitätsliste

```javascript
// src/hooks/useActivities.js
import { useState, useEffect } from 'react';
import { ActivityAPI } from '../services/api';

export const useActivities = (filters = {}, pagination = {}) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({});

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await ActivityAPI.getActivities({
          ...filters,
          ...pagination
        });
        setActivities(response.data.data);
        setPaginationInfo(response.data.pagination);
        setError(null);
      } catch (err) {
        setError(err.message);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [filters, pagination]);

  return { activities, loading, error, pagination: paginationInfo };
};
```

---

## Deployment

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  neuroplay-api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=mysql
      - DB_USER=neuroplay
      - DB_PASSWORD=secure_password
      - DB_NAME=neuroplay
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - mysql
    networks:
      - neuroplay-network

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=neuroplay
      - MYSQL_USER=neuroplay
      - MYSQL_PASSWORD=secure_password
    volumes:
      - mysql_data:/var/lib/mysql
      - ./neuroplay_schema.sql:/docker-entrypoint-initdb.d/01-schema.sql
      - ./neuroplay_testdata.sql:/docker-entrypoint-initdb.d/02-testdata.sql
    networks:
      - neuroplay-network

volumes:
  mysql_data:

networks:
  neuroplay-network:
```

### Deployment starten

```bash
docker-compose up -d

# Logs anschauen
docker-compose logs -f neuroplay-api

# Umgebung herunterfahren
docker-compose down
```

### Production Deployment (Kubernetes)

```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: neuroplay-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: neuroplay-api
  template:
    metadata:
      labels:
        app: neuroplay-api
    spec:
      containers:
      - name: neuroplay-api
        image: neuroplay:1.0
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: neuroplay-config
              key: db_host
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: neuroplay-secrets
              key: jwt_secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: neuroplay-api-service
spec:
  selector:
    app: neuroplay-api
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

---

## Testing

### Unit Tests (Jest)

```javascript
// tests/unit/ActivityService.test.js
const ActivityService = require('../../src/services/ActivityService');
const db = require('../../src/config/database');

jest.mock('../../src/config/database');

describe('ActivityService', () => {
  describe('getActivity', () => {
    it('should return activity by ID', async () => {
      const mockActivity = {
        activity_id: 1,
        name: 'Catan',
        slug: 'catan',
        activity_type: 'board_game'
      };

      db.execute.mockResolvedValue([[mockActivity]]);

      const result = await ActivityService.getActivity(1);
      expect(result).toEqual(mockActivity);
      expect(db.execute).toHaveBeenCalled();
    });

    it('should throw NotFoundError when activity not found', async () => {
      db.execute.mockResolvedValue([[]]);

      await expect(ActivityService.getActivity(999)).rejects.toThrow('Activity not found');
    });
  });

  describe('createActivity', () => {
    it('should create a new activity', async () => {
      const data = {
        name: 'New Game',
        activity_type: 'board_game',
        typical_duration_minutes: 45
      };

      db.execute.mockResolvedValueOnce([{ insertId: 2 }]);
      db.execute.mockResolvedValueOnce([[{ activity_id: 2, ...data }]]);

      const result = await ActivityService.createActivity(data, 1);
      expect(result.name).toEqual('New Game');
      expect(db.execute).toHaveBeenCalledTimes(2);
    });
  });
});
```

### Integration Tests

```javascript
// tests/integration/activities.test.js
const request = require('supertest');
const app = require('../../src/index');
const db = require('../../src/config/database');

describe('Activities API', () => {
  beforeAll(async () => {
    await db.initialize();
  });

  afterAll(async () => {
    await db.close();
  });

  describe('GET /api/v1/activities', () => {
    it('should return list of activities', async () => {
      const response = await request(app)
        .get('/api/v1/activities')
        .expect(200);

      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.pagination).toBeDefined();
    });

    it('should filter activities by complexity', async () => {
      const response = await request(app)
        .get('/api/v1/activities?complexity=moderate')
        .expect(200);

      response.body.data.forEach(activity => {
        expect(activity.complexity_level).toBe('moderate');
      });
    });
  });

  describe('POST /api/v1/activities', () => {
    it('should create a new activity (authenticated)', async () => {
      const token = await getAuthToken(); // Get test token

      const response = await request(app)
        .post('/api/v1/activities')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Game',
          activity_type: 'board_game',
          typical_duration_minutes: 45
        })
        .expect(201);

      expect(response.body.activity_id).toBeDefined();
      expect(response.body.name).toBe('Test Game');
    });
  });
});
```

### Test ausführen

```bash
# Unit Tests
npm test -- tests/unit

# Integration Tests
npm test -- tests/integration

# Mit Coverage
npm test -- --coverage

# Watch Mode
npm test -- --watch
```

---

## Monitoring & Support

### Logging-Strategie

```javascript
// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Health Check Endpoint

```javascript
// src/routes/health.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/health', async (req, res) => {
  try {
    // Check database connection
    await db.execute('SELECT 1');

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'ok'
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'failed'
      },
      error: error.message
    });
  }
});

module.exports = router;
```

### Performance Monitoring

```javascript
// src/middleware/performanceMonitor.js
module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration_ms: duration,
      timestamp: new Date().toISOString()
    });

    // Alert if response is slow
    if (duration > 1000) {
      logger.warn(`Slow response: ${req.method} ${req.path} took ${duration}ms`);
    }
  });

  next();
};
```

---

**Ende des Implementierungs-Handbuchs**

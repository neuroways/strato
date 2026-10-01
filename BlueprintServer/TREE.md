# Zielbaum `server_root/`

```text
server_root/
    ├── _blueprints
    │   ├── module
    │   │   ├── backend
    │   │   │   ├── application
    │   │   │   │   └── README.md
    │   │   │   ├── domain
    │   │   │   │   └── README.md
    │   │   │   ├── infrastructure
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── config
    │   │   │   └── README.md
    │   │   ├── database
    │   │   │   ├── migrations
    │   │   │   │   └── README.md
    │   │   │   ├── seeds
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── deployment
    │   │   │   └── README.md
    │   │   ├── docs
    │   │   │   ├── decisions
    │   │   │   │   ├── ADR_TEMPLATE.md
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── frontend
    │   │   │   ├── assets
    │   │   │   │   └── README.md
    │   │   │   ├── components
    │   │   │   │   └── README.md
    │   │   │   ├── css
    │   │   │   │   ├── module.css.example
    │   │   │   │   └── README.md
    │   │   │   ├── pages
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── public-assets
    │   │   │   └── README.md
    │   │   ├── routes
    │   │   │   └── README.md
    │   │   ├── tests
    │   │   │   ├── e2e
    │   │   │   │   └── README.md
    │   │   │   ├── integration
    │   │   │   │   └── README.md
    │   │   │   ├── unit
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── module.json.example
    │   │   └── README.md
    │   └── README.md
    ├── _git_backup
    │   ├── Repositorys
    │   │   └── README.md
    │   ├── Strato
    │   │   └── README.md
    │   └── README.md
    ├── _instances
    │   ├── _instance_id
    │   │   ├── dev
    │   │   │   ├── cache
    │   │   │   │   └── README.md
    │   │   │   ├── custom
    │   │   │   │   ├── assets
    │   │   │   │   │   └── README.md
    │   │   │   │   ├── css
    │   │   │   │   │   ├── custom.css.example
    │   │   │   │   │   └── README.md
    │   │   │   │   └── README.md
    │   │   │   ├── logs
    │   │   │   │   └── README.md
    │   │   │   ├── registry
    │   │   │   │   └── README.md
    │   │   │   ├── uploads
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── pro
    │   │   │   ├── cache
    │   │   │   │   └── README.md
    │   │   │   ├── custom
    │   │   │   │   ├── assets
    │   │   │   │   │   └── README.md
    │   │   │   │   ├── css
    │   │   │   │   │   ├── custom.css.example
    │   │   │   │   │   └── README.md
    │   │   │   │   └── README.md
    │   │   │   ├── logs
    │   │   │   │   └── README.md
    │   │   │   ├── registry
    │   │   │   │   └── README.md
    │   │   │   ├── uploads
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   └── README.md
    │   ├── .htaccess.example
    │   └── README.md
    ├── _packages
    │   ├── incoming
    │   │   └── README.md
    │   ├── quarantine
    │   │   └── README.md
    │   ├── verified
    │   │   ├── core
    │   │   │   ├── _version
    │   │   │   │   ├── backend
    │   │   │   │   │   └── README.md
    │   │   │   │   ├── frontend
    │   │   │   │   │   ├── assets
    │   │   │   │   │   │   └── README.md
    │   │   │   │   │   ├── components
    │   │   │   │   │   │   └── README.md
    │   │   │   │   │   ├── css
    │   │   │   │   │   │   └── README.md
    │   │   │   │   │   └── README.md
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── modules
    │   │   │   ├── _module_code
    │   │   │   │   ├── _version
    │   │   │   │   │   ├── backend
    │   │   │   │   │   │   └── README.md
    │   │   │   │   │   ├── database
    │   │   │   │   │   │   └── README.md
    │   │   │   │   │   ├── docs
    │   │   │   │   │   │   └── README.md
    │   │   │   │   │   ├── frontend
    │   │   │   │   │   │   └── README.md
    │   │   │   │   │   ├── public-assets
    │   │   │   │   │   │   └── README.md
    │   │   │   │   │   └── README.md
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   └── README.md
    │   ├── .htaccess.example
    │   └── README.md
    ├── config
    │   ├── environments
    │   │   ├── dev.php.example
    │   │   ├── pro.php.example
    │   │   └── README.md
    │   ├── secrets
    │   │   ├── .htaccess.example
    │   │   └── README.md
    │   ├── database.php.example
    │   └── README.md
    ├── neuroways
    │   ├── core
    │   │   ├── backend
    │   │   │   ├── persistence
    │   │   │   │   └── README.md
    │   │   │   ├── runtime
    │   │   │   │   └── README.md
    │   │   │   ├── security
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── frontend
    │   │   │   ├── components
    │   │   │   │   └── README.md
    │   │   │   ├── css
    │   │   │   │   ├── neuroways-core.css.example
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   └── README.md
    │   ├── docs
    │   │   └── README.md
    │   ├── modules
    │   │   ├── neuroplay
    │   │   │   ├── nlp_tennis_tournament
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   └── README.md
    │   ├── public
    │   │   ├── assets
    │   │   │   └── README.md
    │   │   ├── .htaccess.example
    │   │   ├── index.php.example
    │   │   └── README.md
    │   ├── registry
    │   │   ├── installed-module.example.json
    │   │   └── README.md
    │   ├── runtime
    │   │   ├── bootstrap.php.example
    │   │   └── README.md
    │   ├── storage
    │   │   └── README.md
    │   ├── tests
    │   │   └── README.md
    │   └── README.md
    ├── neuroways_dev
    │   ├── core
    │   │   ├── backend
    │   │   │   ├── persistence
    │   │   │   │   └── README.md
    │   │   │   ├── runtime
    │   │   │   │   └── README.md
    │   │   │   ├── security
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   ├── frontend
    │   │   │   ├── components
    │   │   │   │   └── README.md
    │   │   │   ├── css
    │   │   │   │   ├── neuroways-core.css.example
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   └── README.md
    │   ├── docs
    │   │   └── README.md
    │   ├── modules
    │   │   ├── neuroplay
    │   │   │   ├── nlp_tennis_tournament
    │   │   │   │   └── README.md
    │   │   │   └── README.md
    │   │   └── README.md
    │   ├── public
    │   │   ├── assets
    │   │   │   └── README.md
    │   │   ├── .htaccess.example
    │   │   ├── index.php.example
    │   │   └── README.md
    │   ├── registry
    │   │   ├── installed-module.example.json
    │   │   └── README.md
    │   ├── runtime
    │   │   ├── bootstrap.php.example
    │   │   └── README.md
    │   ├── storage
    │   │   └── README.md
    │   ├── tests
    │   │   └── README.md
    │   └── README.md
    └── README.md
```

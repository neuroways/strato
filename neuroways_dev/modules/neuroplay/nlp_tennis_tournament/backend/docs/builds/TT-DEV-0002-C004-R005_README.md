# TT-DEV-0002-C004-R005 – Safe PDO Failure Diagnostic

Purpose: classify the remaining STRATO MariaDB connection failure without exposing credentials.

Runtime output includes only:
- whether required fields are present
- selected connection/source
- SQLSTATE
- driver error code
- coarse error category

It does **not** return host, database name, username, password, or exception text.

Deploy to the tennis project root and call:

`http://tennis.flowisaurus.de/backend/tests/db-connection-diagnostic.php`

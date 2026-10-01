# Deployment- und Update-Modell

## Grundsatz

Ein Release wird nicht dadurch produktiv, dass Dateien "irgendwie" von DEV nach PRO kopiert werden.

```text
Source / Working Tree
  ↓
Module Version
  ↓
Build / Package
  ↓
Incoming
  ↓
Verify
  ↓
Verified Package Store
  ↓
Explizite Installation / Update in DEV
  ↓
Migration + Health + Tests
  ↓
Freigabe
  ↓
Explizite Installation / Update in PRO
```

## Mehrere Versionen gleichzeitig

Ein Server darf gleichzeitig z. B. Tennis 1.0.0, 2.0.0 und 3.0.0 enthalten. Eine konkrete Installation bleibt an genau eine Version gepinnt, bis ein explizites Update durchgeführt wird.

## Promotion

Dasselbe versionierte Artefakt wird in DEV und PRO verwendet. Environment-spezifisch bleiben insbesondere:

- Config
- Secrets
- Daten
- Registry State
- Routing
- Customization

## Rollback

Rollback muss später als definierter Installationsvorgang implementiert werden. Dieses Scaffold reserviert die dafür nötigen Version- und State-Grenzen, implementiert den Rollback aber noch nicht.

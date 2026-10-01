# Infrastructure

Die enthaltenen Adapter sind ausschließlich DEV-/Testadapter.

Produktiv muss ein Adapter gegen den **Core-managed Persistence Contract** implementiert werden.
Keine DB-Credentials und keine direkte Connection im Modul.

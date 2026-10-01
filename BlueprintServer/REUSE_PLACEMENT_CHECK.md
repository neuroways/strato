# Reuse & Placement Check

Vor jeder neuen Logik, CSS-Regel, UI-Komponente oder Infrastrukturimplementierung werden diese Fragen beantwortet:

1. Existiert die Fähigkeit bereits?
2. Gilt sie NeuroWays-weit?
3. Ist sie in mehreren Modulen sinnvoll wiederverwendbar?
4. Ist sie tatsächlich fachlich spezifisch für genau dieses Modul?
5. Kann der spezifische Teil so gekapselt werden, dass er später ohne Auseinanderfummeln extrahiert werden kann?
6. Gehört die Änderung in Core, Module, Installation oder Environment?
7. Welche Entscheidung bzw. welcher Architektureingriff muss dokumentiert werden?

## Platzierungsregel

```text
GLOBAL / WIEDERKEHREND       → CORE
FACHLICH SPEZIFISCH          → MODULE
INSTALLATIONSSPEZIFISCH      → INSTANCE / INSTALLED MODULE
ENVIRONMENT-SPEZIFISCH       → ENVIRONMENT CONFIG
SECRET                       → CENTRAL SECRET CONFIG
```

Beispiele:

- Button-Grunddesign → Core
- Tabellen-Grunddesign → Core
- globale NeuroWays-Linie → Core
- Tennis-Spielplanlogik → Tennis-Modul
- konkrete Tennis-Seitenanordnung → Tennis-Frontend
- Vereins-Custom-CSS → konkrete Installation

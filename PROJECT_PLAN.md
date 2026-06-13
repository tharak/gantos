# 🎮 GANTZ: Robot Apocalypse - Project Plan & Roadmap

## 📋 Estrutura do Project Board

### Colunas Recomendadas
1. **Backlog** - Tarefas ainda não iniciadas
2. **To Do** - Tarefas priorizadas para começar
3. **In Progress** - Tarefas em desenvolvimento
4. **Review** - Tarefas aguardando revisão
5. **Done** - Tarefas completas

---

## 🚀 Roadmap Completo (40+ Issues)

### **FASE 1: Project Setup (Infraestrutura)**
🔴 **Epic: Project Setup - Infraestrutura e Documentação**

Tarefas:
- [ ] **Task:** Inicializar projeto Unity e commit inicial
- [ ] **Task:** Configurar .gitignore e ProjectSettings
- [ ] **Task:** Atualizar documentação do projeto

**Estimativa:** 3-5 dias  
**Prioridade:** 🔴 CRÍTICA

---

### **FASE 2: Core Systems (Sistemas Centrais)**
🔴 **Epic: Core Systems - GameManager, Input, Time**

Tarefas:
- [ ] **Task:** Implementar GameManager e TimeManager
  - Game state (start, pause, game over)
  - Timer da missão e lógica de extração
  - Sistema de pontuação básico
  - Slow-motion e time scaling

- [ ] **Task:** Implementar InputManager
  - Mapeamento de teclas e gamepad
  - Sistema de remapeamento
  - Perfis de controle

- [ ] **Task:** Implementar sistemas do jogador
  - Player base com stats (vida, stamina, velocidade)
  - PlayerMovement (movimento, dash, sprint, pulo)
  - PlayerCombat (ataque, troca de arma)
  - GantzSuit (habilidade especial, upgrades)

**Estimativa:** 2 semanas  
**Prioridade:** 🔴 CRÍTICA

---

### **FASE 3: Map Generation (Mapas Procedurais)**
🟡 **Epic: Map Generator - Seed-based Procedural Maps**

Tarefas:
- [ ] **Task:** Implementar MapGenerator e NoiseGenerator (Perlin/Simplex)
  - Geração de heightmap/biome map
  - Sistema de tiles e regras
  - Reprodutibilidade com seed

- [ ] **Task:** Regras urbanas e geração de áreas jogáveis
  - Ruas conectadas
  - Blocos de prédios
  - Pontos de spawn e extração

**Estimativa:** 1-2 semanas  
**Prioridade:** 🟡 ALTA

**Dependências:** FASE 2 completa

---

### **FASE 4: Enemies & AI (Inimigos e IA)**
🔴 **Epic: Enemies & AI - Robôs variados e comportamentos**

Tarefas:
- [ ] **Task:** Implementar Enemy base e EnemySpawner
  - Classe Enemy com stats
  - Sistema de spawn progressivo
  - Registro no GameManager

- [ ] **Task:** Implementar tipos de robôs e comportamentos
  - TankRobot (lento, alta vida)
  - AgileRobot (rápido, frágil)
  - DroneRobot (voador, atira)
  - ShieldRobot (escudo frontal)
  - BossRobot (múltiplas fases)

**Estimativa:** 2-3 semanas  
**Prioridade:** 🔴 CRÍTICA

**Dependências:** FASE 2 e FASE 3 começadas

---

### **FASE 5: Weapons & Equipment (Armas e Equipamento)**
🟡 **Epic: Weapons & Equipment - Arsenal e Traje**

Tarefas:
- [ ] **Task:** Implementar sistema de armas e projéteis
  - Weapon base
  - ProjectileWeapon e MeleeWeapon
  - Projectile com pooling
  - Parâmetros: dano, ROF, munição

- [ ] **Task:** Implementar armas: PistolX, Rifle, Sword, Cannon
  - Cada arma com comportamento distinto
  - Balanceamento inicial
  - Efeitos visuais básicos

- [ ] **Task:** Implementar Equipment Selection e sistema de desbloqueio
  - Menu de seleção pré-missão
  - Persistência de unlocks
  - Sistema de custos em pontos

**Estimativa:** 2-3 semanas  
**Prioridade:** 🟡 ALTA

**Dependências:** FASE 2 e FASE 4 começadas

---

### **FASE 6: UI & HUD (Interface)**
🟡 **Epic: UI & HUD - Interface e Menus**

Tarefas:
- [ ] **Task:** Implementar HUD e feedbacks visuais
  - Barras de vida, stamina, munição
  - Contador de kills
  - Timer e indicação de extração
  - Atualizações em tempo real

- [ ] **Task:** Implementar Main Menu e Menus de jogo
  - Main Menu
  - Equipment Selection
  - Pause Menu
  - GameOver/Score screen

**Estimativa:** 1-2 semanas  
**Prioridade:** 🟡 ALTA

**Dependências:** FASE 2 e FASE 5

---

### **FASE 7: Audio & SFX (Áudio)**
🟢 **Epic: Audio & SFX - Ambiente e feedback sonoro**

Tarefas:
- [ ] **Task:** Implementar AudioManager e SFX básicos
  - Reprodução de sons por eventos
  - Gerenciamento de volume e canais
  - SFX para armas, robôs e ambiente

**Estimativa:** 3-5 dias  
**Prioridade:** 🟢 MÉDIA

**Dependências:** FASE 2 completa

---

### **FASE 8: Testing & Documentation (Testes e Docs)**
🟡 **Tasks Transversais**

- [ ] **Task:** Testing & QA - Checklist e testes básicos
  - Testes de integração
  - Playtest checklist
  - Documentação de bugs

- [ ] **Task:** Configurar CI (GitHub Actions) para Unity
  - Workflow de build
  - Cache de Library
  - Execução de testes

- [ ] **Task:** Criar assets placeholder (models, textures, UI icons)
  - Modelos low-poly
  - Texturas básicas
  - Ícones UI

**Estimativa:** 1-2 semanas  
**Prioridade:** 🟡 ALTA

---

### **FASE 9: Balance & Polish (Polimento)**
🟢 **Task: Balance & Polish - Tunar inimigos e gameplay final**

- [ ] Ajustar valores iniciais
- [ ] Validar progressão de ondas
- [ ] Playtest extensivo
- [ ] Balanceamento final

**Estimativa:** 1 semana  
**Prioridade:** 🟢 MÉDIA

**Dependências:** Todas as fases anteriores

---

## 📊 Cronograma Estimado

| Fase | Nome | Duração | Status |
|------|------|---------|--------|
| 1 | Project Setup | 3-5 dias | ⏳ Backlog |
| 2 | Core Systems | 2 semanas | ⏳ Backlog |
| 3 | Map Generation | 1-2 semanas | ⏳ Backlog |
| 4 | Enemies & AI | 2-3 semanas | ⏳ Backlog |
| 5 | Weapons & Equipment | 2-3 semanas | ⏳ Backlog |
| 6 | UI & HUD | 1-2 semanas | ⏳ Backlog |
| 7 | Audio & SFX | 3-5 dias | ⏳ Backlog |
| 8 | Testing & Docs | 1-2 semanas | ⏳ Backlog |
| 9 | Balance & Polish | 1 semana | ⏳ Backlog |

**Total Estimado:** 12-19 semanas (3-5 meses)

---

## 🔗 Links das Issues

### FASE 1: Project Setup
1. [Epic: Project Setup](https://github.com/tharak/gantos/issues?q=is%3Aissue+epic-project-setup)
2. [Task: Init Unity Project](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-init-unity-project)
3. [Task: Setup .gitignore](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-setup-gitignore-projectsettings)

### FASE 2: Core Systems
4. [Epic: Core Systems](https://github.com/tharak/gantos/issues?q=is%3Aissue+epic-core-systems)
5. [Task: GameManager & TimeManager](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-gamemanager-timemanager)
6. [Task: InputManager](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-inputmanager)
7. [Task: Player Systems](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-player-systems)

### FASE 3: Map Generation
8. [Epic: Map Generator](https://github.com/tharak/gantos/issues?q=is%3Aissue+epic-map-procedural)
9. [Task: MapGenerator & Noise](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-mapgenerator-noise)
10. [Task: Urban Structures](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-map-urban-structures)

### FASE 4: Enemies & AI
11. [Epic: Enemies & AI](https://github.com/tharak/gantos/issues?q=is%3Aissue+epic-enemies-ai)
12. [Task: Enemy Base & Spawner](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-enemy-base-spawner)
13. [Task: Robot Types](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-robot-types)

### FASE 5: Weapons & Equipment
14. [Epic: Weapons & Equipment](https://github.com/tharak/gantos/issues?q=is%3Aissue+epic-weapons-equipment)
15. [Task: Weapon Systems](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-weapon-systems)
16. [Task: Specific Weapons](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-create-specific-weapons)
17. [Task: Equipment Selection](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-equipment-selection-unlock)

### FASE 6: UI & HUD
18. [Epic: UI & HUD](https://github.com/tharak/gantos/issues?q=is%3Aissue+epic-ui-hud)
19. [Task: HUD](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-hud)
20. [Task: Menus](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-menus)

### FASE 7: Audio & SFX
21. [Epic: Audio & SFX](https://github.com/tharak/gantos/issues?q=is%3Aissue+epic-audio-sfx)
22. [Task: AudioManager](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-implement-audiomanager)

### FASE 8 & 9: Testing, Docs, Balance
23. [Task: Testing & QA](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-testing-qa)
24. [Task: Documentation](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-documentation-update)
25. [Task: CI Setup](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-setup-ci-unity)
26. [Task: Assets Placeholder](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-art-assets-placeholders)
27. [Task: Balance & Polish](https://github.com/tharak/gantos/issues?q=is%3Aissue+task-balance-polish)

---

## 🎯 Como Usar Este Plano

### ✅ Próximos Passos:

1. **Criar Project Board**
   - Acesse: https://github.com/tharak/gantos/projects
   - Clique em "New project"
   - Selecione "Table"
   - Nomeie: "GANTZ Development"

2. **Adicionar Issues ao Project**
   - Filtre issues por labels (epic, core, etc.)
   - Adicione ao projeto nas colunas apropriadas

3. **Começar com FASE 1**
   - Mova tasks para "To Do"
   - Atribua a um desenvolvedor
   - Comece!

### 📊 Acompanhamento

- Verifique o progresso no Project Board
- Atualize status das issues ao trabalhar
- Use comments para notas e bloqueadores
- Links de PR devem ser adicionados nas issues

---

## 🚨 Crítico para Sucesso

1. ✅ **FASE 1** deve estar 100% completa antes de FASE 2
2. ✅ **FASE 2** é bloqueador para todas as outras
3. ✅ **FASE 3 e 4** podem ser paralelas (começar FASE 4 assim que FASE 2 terminar)
4. ✅ **FASE 5, 6, 7** podem ser paralelas entre si
5. ✅ **FASE 8 e 9** são finais (após tudo funcionando)

---

## 📝 Labels Utilizadas

- 🔴 **critical** - Bloqueador principal
- 🟡 **high** - Importante mas não-bloqueador
- 🟢 **medium** - Nice-to-have
- **epic** - Meta maior com sub-tasks
- **task** - Tarefa específica
- **bug** - Correção de erro
- **feature** - Nova funcionalidade
- **refactor** - Melhoria de código
- **documentation** - Docs
- **testing** - Testes

---

## 🎮 Status Atual

- ✅ Projeto criado no GitHub
- ✅ Repositório `gantos` inicializado
- ⏳ Issues de draft criadas e aguardando confirmação
- ⏳ Estrutura de arquivos aguardando criação
- ⏳ Project Board aguardando criação manual

---

**Última atualização:** Junho 2026  
**Próximo checkpoint:** Conclusão de FASE 1

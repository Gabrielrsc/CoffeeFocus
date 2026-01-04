# ☕ CoffeeFocus - Pomodoro & Task Manager

O **CoffeeFocus** é um aplicativo de produtividade baseado na técnica Pomodoro, desenvolvido com React Native e Expo. Ele combina um cronômetro de foco inteligente com um gerenciador de tarefas dinâmico e histórico persistente.

## 🚀 Funcionalidades

### 🕒 Cronômetro Inteligente
- **Ciclos Automáticos**: Alternância entre Foco, Pausa Curta e Pausa Longa.
- **Sessões Adaptáveis**: O número de sessões no ciclo ajusta-se automaticamente conforme a estimativa da tarefa selecionada.
- **Tempos Customizados**: Defina tempos globais nas configurações ou tempos específicos por tarefa.

### 📝 Gestão de Tarefas (Estilo Web)
- **Criação Rápida**: Adicione tarefas com título e estimativa de focos (pomodoros).
- **Foco Livre**: Opção de focar sem selecionar uma tarefa específica.
- **Edição e Exclusão**: Gerencie sua lista de afazeres diretamente na tela inicial.
- **Progresso em Tempo Real**: Veja quantos focos você já completou em cada tarefa.

### 📊 Histórico & Persistência
- **Calendário de Produtividade**: Visualize seus focos concluídos em um calendário interativo.
- **Detalhamento**: O histórico registra a hora, duração e o nome da tarefa realizada.
- **Storage Local**: Seus dados (configurações, tarefas e histórico) ficam salvos no dispositivo via `AsyncStorage`.

### ⚙️ Configurações Avançadas
- **Preferências de Som**: Ative ou desative alertas sonoros.
- **Zona de Perigo**: Opções para limpar histórico, apagar tarefas ou realizar um **Reset de Fábrica** para restaurar o app.

## 🛠️ Tecnologias Utilizadas

- **React Native** (Framework)
- **Expo** (SDK & Workflow)
- **AsyncStorage** (Banco de dados local)
- **React Native Calendars** (Interface de histórico)
- **Expo AV** (Sistema de áudio)
- **Lucide/Ionicons** (Ícones)

## 📦 Como Instalar

1. Clone este repositório:
   ```bash
   git clone [https://github.com/Gabrielrsc/CoffeeFocus.git](https://github.com/Gabrielrsc/CoffeeFocus.git)
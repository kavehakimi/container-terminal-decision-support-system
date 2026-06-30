# Architecture

## 1. Architecture Overview

The Container Terminal Decision Support System follows a lightweight, modular, skill-based architecture designed for the Capstone MVP.

The system is organised around four operational skills that process user-provided terminal planning information and present structured outputs through a dashboard interface.

## 2. High-Level Architecture

User Input
↓
Operational Input Form
↓
AI Studio Application Layer
↓
Skill-Based Processing Layer
↓
Dashboard Output Cards
↓
Human Review

## 3. Core Components

### 3.1 User Interface Layer

The UI layer provides the main dashboard, input form, generate button, and output cards.

Main elements:

- Vessel information input
- Estimated workload input
- Available quay cranes input
- Operational notes input
- Generate Operational Plan button
- Skill-based output cards

### 3.2 Skill-Based Processing Layer

The MVP includes four operational skills:

- Vessel Planning Skill
- Quay Crane Allocation Skill
- Risk Assessment Skill
- Decision Support Skill

Each skill is responsible for a specific part of the operational planning workflow.

### 3.3 Output Layer

The output layer presents generated information in separate cards grouped by operational skill.

Planned output sections:

- Vessel workload assessment
- Crane allocation recommendation
- Risk and bottleneck identification
- Operational recommendation and executive summary

### 3.4 Human Review Layer

The system is designed to support Human-in-the-Loop decision making.

AI-generated outputs are advisory and must be reviewed by the user before being accepted.

## 4. Skill Architecture

### SK-001 Vessel Planning Skill

Purpose:

Analyse basic vessel operational information and estimate workload implications.

Inputs:

- Vessel name
- Estimated workload
- Operational notes

Outputs:

- Workload assessment
- Estimated operation duration
- Planning considerations

### SK-002 Quay Crane Allocation Skill

Purpose:

Recommend a suitable quay crane allocation strategy.

Inputs:

- Estimated workload
- Available quay cranes

Outputs:

- Crane allocation recommendation
- Resource shortage warning
- Allocation rationale

### SK-003 Risk Assessment Skill

Purpose:

Identify operational risks and bottlenecks.

Inputs:

- Estimated workload
- Available quay cranes
- Operational notes

Outputs:

- Risk level
- Bottlenecks
- Mitigation suggestions

### SK-004 Decision Support Skill

Purpose:

Combine the outputs from the operational skills into a concise planning recommendation.

Inputs:

- Vessel Planning output
- Quay Crane Allocation output
- Risk Assessment output

Outputs:

- Operational recommendation
- Executive summary
- Suggested next action

## 5. Data Flow

1. The user enters operational information.
2. The user clicks Generate Operational Plan.
3. The system processes the input through the skill-based workflow.
4. Each skill generates its own output.
5. The Decision Support Skill summarises the overall recommendation.
6. The user reviews the recommendation before making any decision.

## 6. Architecture Principles

The architecture follows these principles:

- Modular design
- Skill-based separation of responsibilities
- Human-in-the-Loop decision support
- Prototype-first implementation
- Future extensibility
- Simple and understandable user experience

## 7. Current MVP Architecture Scope

The current Capstone MVP focuses on demonstrating the architecture concept rather than implementing a production-ready system.

Included:

- Dashboard interface
- Input form
- Four planned operational skills
- Skill-based output structure
- Basic human review concept

Not included:

- Real-time terminal data
- Terminal Operating System integration
- External APIs
- MCP integration
- Multi-agent orchestration
- Cloud-hosted backend
- Live optimisation engine

## 8. Future Architecture Direction

Future versions may extend the MVP into a more advanced system including:

- Multi-agent architecture
- MCP-based tool integration
- Google Cloud deployment
- Operational data integration
- Digital twin integration
- Simulation-based evaluation
- Advanced explainability and audit trail
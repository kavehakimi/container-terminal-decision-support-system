# Software Requirements Specification (SRS)

# Container Terminal Decision Support System

---

# 1. Introduction

Container terminals operate in highly dynamic environments where planners and operations managers must continuously make decisions regarding vessel operations, quay crane allocation, yard utilisation, and resource management. These decisions are often time-sensitive and involve multiple operational constraints that can significantly affect terminal productivity and service quality.

Recent advances in Artificial Intelligence and Agent Engineering provide new opportunities to support operational decision-making through intelligent software systems capable of analysing operational data, identifying potential risks, and generating structured recommendations.

This project aims to develop an AI-powered Decision Support System that demonstrates how modern Agent Engineering concepts can be applied to container terminal operations using a modular, skill-based architecture. The project is being developed as the Capstone Project for Google's *5-Day AI Agents: Intensive Vibe Coding Course*.

---

# 2. Project Overview

The Container Terminal Decision Support System is an AI-powered software application designed to assist terminal planners in analysing operational scenarios and generating decision-support recommendations.

The system focuses on supporting human decision-makers rather than replacing them. It analyses operational information, evaluates multiple planning aspects, and presents structured recommendations that users can review before making operational decisions.

The application is designed following a Specification-Driven Development (SDD) approach and will be implemented iteratively using Google AI Studio.

The project also serves as a practical demonstration of modern Agent Engineering concepts including:

* Skill-Based Architecture
* Human-in-the-Loop Decision Support
* Secure AI Design
* Explainable Recommendations
* Evaluation-Driven Development
* Modular Software Architecture

---

# 3. Problem Statement

Container terminal operations require planners to make complex operational decisions under time constraints while balancing vessel schedules, quay crane availability, yard capacity, operational priorities, and resource utilisation.

Traditional planning processes rely heavily on human expertise and manual analysis, which may become increasingly challenging as operational complexity grows.

Although AI technologies have demonstrated significant capabilities in data analysis and optimisation, many operational environments still lack practical AI-powered decision support applications that provide structured, transparent, and operationally useful recommendations.

This project addresses this challenge by developing an AI-powered Decision Support System capable of assisting operational planners through modular AI skills that analyse different aspects of terminal operations and generate decision-support recommendations.

---

# 4. Project Objectives

The primary objective of this project is to design and develop a prototype AI-powered Decision Support System for container terminal operational planning.

The specific objectives are:

* OBJ-001 Develop a modular AI-powered decision support application.
* OBJ-002 Demonstrate modern Agent Engineering principles.
* OBJ-003 Apply a Skill-Based Architecture for operational analysis.
* OBJ-004 Assist planners in analysing vessel operations, resource allocation, and yard planning.
* OBJ-005 Generate structured operational recommendations.
* OBJ-006 Support Human-in-the-Loop decision making.
* OBJ-007 Demonstrate secure and responsible AI engineering practices.
* OBJ-008 Apply Specification-Driven Development throughout the project lifecycle.
* OBJ-009 Produce a professional engineering portfolio suitable for demonstration and future extension.

---

# 5. Target Users

The primary users of the system include professionals involved in container terminal planning and operations.

The intended user groups are:

* Terminal Planner
* Operations Manager
* Quay Operations Supervisor
* Yard Planning Supervisor
* Terminal Operations Analyst

Although the system is developed as a prototype, its overall design reflects realistic operational workflows commonly found in modern container terminals.

---

# 6. System Scope

The scope of this project is limited to the development of a prototype AI-powered Decision Support System that demonstrates the application of modern Agent Engineering concepts to container terminal operational planning.

The system will focus on:

### In Scope

* Vessel operation analysis
* Quay crane allocation recommendations
* Yard planning support
* Operational risk identification
* Decision support recommendations
* Human review workflow
* Skill-based modular architecture
* Secure AI engineering concepts
* Evaluation and observability concepts
* Modern user interface
* Iterative software development

### Out of Scope

The following capabilities are intentionally excluded from the current project scope:

* Direct integration with Terminal Operating Systems (TOS)
* Real-time operational data integration
* Live optimisation algorithms
* Automatic execution of operational decisions
* Multi-terminal coordination
* Production cloud deployment
* Commercial-scale implementation

These capabilities may be considered as future enhancements beyond the scope of the current Capstone project.

# 7. Functional Requirements

The system shall provide the following functional capabilities.

## Vessel Planning

**FR-001**
The system shall allow users to enter basic vessel operational information.

**FR-002**
The system shall analyse the operational workload and estimate the operation duration.

---

## Quay Crane Allocation

**FR-003**
The system shall recommend a suitable quay crane allocation strategy.

---

## Risk Assessment

**FR-004**
The system shall identify potential operational risks and bottlenecks.

---

## Decision Support

**FR-005**
The system shall generate operational recommendations based on the analysis.

**FR-006**
The system shall generate a concise executive summary.

---

## User Interaction

**FR-007**
The system shall display the outputs grouped by operational skills.

**FR-008**
The system shall allow users to review the generated recommendations before accepting them.

---

# 8. Non-Functional Requirements

The system shall satisfy the following non-functional requirements.

**NFR-001**
The system shall provide a simple and intuitive user interface.

**NFR-002**
The system shall be organised using a modular Skill-Based Architecture.

**NFR-003**
The system shall support iterative development using a Specification-Driven Development (SDD) approach.

**NFR-004**
The system shall support Human-in-the-Loop decision making.

**NFR-005**
The system should generate recommendations within an acceptable response time.

**NFR-006**
The system shall be designed to support future extension without major architectural changes.

---

# 9. Skill-Based Architecture

The Capstone prototype is organised into four independent AI skills.

## SK-001 Vessel Planning Skill

Responsibilities:

* Analyse vessel information
* Estimate operation duration

---

## SK-002 Quay Crane Allocation Skill

Responsibilities:

* Recommend crane allocation
* Identify resource shortages

---

## SK-003 Risk Assessment Skill

Responsibilities:

* Identify operational risks
* Detect planning bottlenecks

---

## SK-004 Decision Support Skill

Responsibilities:

* Combine results from previous skills
* Generate recommendations
* Produce an executive summary

Recommendation:
Allocate 3 quay cranes.

Reason:
The vessel workload is high and estimated operation time exceeds the desired turnaround time.

---

# 10. Human-in-the-Loop Workflow

The system follows a Human-in-the-Loop (HITL) workflow to ensure that operational decisions remain under human supervision.

Workflow:

1. User enters operational information.
2. AI skills analyse the input.
3. Decision Support Skill generates recommendations.
4. Recommendations are presented to the user.
5. The user may:

   * Review
   * Accept
   * Regenerate the recommendations.
6. The final decision is always made by the user.

---

# 11. Security Requirements

The prototype incorporates basic secure AI engineering principles.

**SEC-001**
The system shall clearly indicate that recommendations are AI-generated.

**SEC-002**
The system shall require human review before recommendations are accepted.

**SEC-003**
The system shall handle incomplete or invalid user inputs gracefully.

---

# 12. Evaluation Criteria

The Capstone project will be evaluated using the following criteria.

## Functional Evaluation

* Successful execution of all four AI skills.
* Successful generation of operational recommendations.

---

## User Experience Evaluation

* Interface usability.
* Ease of interaction.
* Clarity of presented recommendations.

---

## Engineering Evaluation

* Modular Skill-Based Architecture.
* Specification-Driven Development.
* Documentation quality.
* Overall project organisation.

---

## Learning Objectives

The project demonstrates practical implementation of the following Agent Engineering concepts:

* Skill-Based Architecture
* Human-in-the-Loop
* Secure AI Development
* Specification-Driven Development

# 13. User Interface Requirements

The user interface shall provide a simple, intuitive, and task-oriented experience suitable for operational planning demonstrations.

## UI-001 Dashboard

The system shall provide a clean dashboard as the main interface for user interaction.

---

## UI-002 User Inputs

The system shall allow users to enter basic operational information, including:

* Vessel name
* Estimated workload
* Available quay cranes
* Operational notes

---

## UI-003 Skill-Based Output

The system shall organise generated outputs into the following sections:

* Vessel Planning
* Quay Crane Allocation
* Risk Assessment
* Decision Support

---

## UI-004 Recommendation Display

The system shall clearly distinguish:

* Operational recommendations
* Executive summary
* Reason for recommendation

---

## UI-005 Human Review

The interface shall allow users to:

* Review recommendations
* Regenerate recommendations
* Accept the proposed operational plan

---

## UI-006 User Experience

The interface should be visually clean, responsive, and easy to understand without requiring technical AI knowledge.

---

# 14. Development Roadmap

The project will be developed incrementally following a Specification-Driven Development (SDD) methodology.

The Software Requirements Specification (SRS), project documentation, and repository structure are completed prior to implementation. Software development is organised into five implementation iterations.

---

## Iteration 1 – Core Application

### Deliverables

* Basic application structure
* Initial user interface
* Operational input form
* Basic AI integration
* Initial testing

---

## Iteration 2 – Skill-Based Architecture

### Deliverables

* Vessel Planning Skill
* Quay Crane Allocation Skill
* Risk Assessment Skill
* Decision Support Skill
* Integration of all skills

---

## Iteration 3 – Human-in-the-Loop & Security

### Deliverables

* Human review workflow
* Recommendation regeneration
* Basic AI safety controls
* Input validation
* Error handling

---

## Iteration 4 – Evaluation & User Interface Refinement

### Deliverables

* Recommendation explanations
* User interface improvements
* System evaluation
* Functional testing
* User experience improvements

---

## Iteration 5 – Finalisation & Capstone Submission

### Deliverables

* Final project documentation
* GitHub repository update
* Project screenshots
* Final system testing
* Google AI Studio deployment
* Capstone submission

---

# 15. Future Enhancements

The following features are intentionally excluded from the current Capstone implementation but may be considered in future versions.

**FE-001**
Yard Planning Skill

**FE-002**
Multi-Agent Architecture

**FE-003**
MCP Integration

**FE-004**
Google Cloud Deployment

**FE-005**
Integration with Terminal Operating Systems (TOS)

**FE-006**
Real-time Operational Data

**FE-007**
Operational Performance Dashboard

**FE-008**
Digital Twin Integration

**FE-009**
Advanced Explainability Features

**FE-010**
Simulation-Based Operational Evaluation

---

# 16. Assumptions and Limitations

## Assumptions

**AS-001**
The system is intended to demonstrate modern Agent Engineering concepts rather than provide production-ready operational planning.

**AS-002**
Users provide reasonable operational input data.

**AS-003**
The AI-generated recommendations are advisory and intended to support, not replace, human decision-makers.

**AS-004**
The project is developed using Google AI Studio as the primary development platform.

---

## Limitations

**LM-001**
The system does not connect to live container terminal operational data.

**LM-002**
The system does not perform automatic operational optimisation.

**LM-003**
The generated recommendations are illustrative and should not be used for real operational decision-making.

**LM-004**
The prototype is designed for demonstration and educational purposes as part of the Google AI Agents Capstone Project.

**LM-005**
Some advanced Agent Engineering capabilities, including Multi-Agent collaboration, cloud deployment, and external tool integration, are planned for future development.


# Appendix A – Requirements Traceability Matrix (RTM)

The Requirements Traceability Matrix (RTM) establishes traceability between the requirements defined in this Software Requirements Specification (SRS), the corresponding system components, implementation iterations, and verification activities.

| Requirement ID | Description | Related Module / Skill | Implementation Iteration | Verification Method |
|----------------|-------------|------------------------|--------------------------|---------------------|
| FR-001 | Enter vessel operational information | User Interface | Iteration 1 | Functional Test |
| FR-002 | Analyse vessel workload | Vessel Planning Skill | Iteration 2 | Functional Test |
| FR-003 | Recommend quay crane allocation | Quay Crane Allocation Skill | Iteration 2 | Functional Test |
| FR-004 | Identify operational risks | Risk Assessment Skill | Iteration 2 | Functional Test |
| FR-005 | Generate operational recommendations | Decision Support Skill | Iteration 2 | Functional Test |
| FR-006 | Generate executive summary | Decision Support Skill | Iteration 2 | Functional Test |
| FR-007 | Display outputs grouped by operational skills | User Interface | Iteration 4 | User Interface Review |
| FR-008 | Support user review of recommendations | Human-in-the-Loop Workflow | Iteration 3 | Functional Test |
| NFR-001 | Simple and intuitive user interface | User Interface | Iteration 4 | Usability Review |
| NFR-002 | Modular Skill-Based Architecture | System Architecture | Iteration 2 | Architecture Review |
| NFR-003 | Specification-Driven Development | Project Documentation | All Iterations | Documentation Review |
| NFR-004 | Human-in-the-Loop decision support | Human-in-the-Loop Workflow | Iteration 3 | Functional Test |
| NFR-005 | Acceptable system response time | System Performance | Iteration 4 | Performance Observation |
| NFR-006 | Extensible system architecture | System Architecture | Iteration 2 | Design Review |
| SEC-001 | Clearly identify AI-generated recommendations | Decision Support Skill | Iteration 3 | Functional Test |
| SEC-002 | Require human review before acceptance | Human-in-the-Loop Workflow | Iteration 3 | Functional Test |
| SEC-003 | Handle invalid or incomplete user inputs | User Interface | Iteration 3 | Functional Test |



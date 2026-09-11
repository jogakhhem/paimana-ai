# 🚀 PAIMANA AI

### AI-Powered Predictive Project Monitoring & Early Warning System

> **Smart Infrastructure Monitoring using Machine Learning, Predictive Analytics and Explainable AI**

PAIMANA AI is an AI-powered web-based integrated project monitoring platform designed to help government agencies monitor large infrastructure projects, predict potential **cost overruns**, identify **schedule delays**, calculate **project risk**, and generate **early warnings** before problems become critical.

The system combines project data, Machine Learning, Explainable AI (SHAP), predictive analytics, and an interactive web dashboard to transform project monitoring from a reactive process into a **predictive and risk-aware system**.

---

## 🏛️ Problem Statement

**SIH 2026 – Problem Statement 26103**

### Use Case on Web-Based Integrated Project-Monitoring Platform

The project addresses the challenge of monitoring large infrastructure projects where cost, expenditure, physical progress and implementation timelines need to be continuously analyzed.

Traditional monitoring mainly focuses on the current status of a project.

PAIMANA AI goes one step further:

> **Instead of only asking "What is happening?", the system asks "What is likely to happen next, and why?"**

---

# 🎯 Objectives

PAIMANA AI aims to:

- 📊 Monitor infrastructure projects using project-level data
- 💰 Predict potential cost overruns
- ⏱️ Predict potential schedule delays
- ⚠️ Identify high-risk projects
- 🚨 Generate early warning indicators
- 🔍 Explain why a project is considered risky
- 📈 Analyze cost and expenditure patterns
- 🗺️ Analyze projects by state, sector and ministry
- 📋 Provide project-level risk information
- 📤 Support dynamic project data ingestion
- 🌐 Provide an interactive web dashboard
- 🤖 Use Machine Learning for predictive project monitoring

---

# 🧠 How PAIMANA AI Works

The system follows a complete AI/ML pipeline:

```text
             PROJECT DATA
                  │
                  ▼
        ┌─────────────────────┐
        │ Data Collection     │
        │ CSV / Excel         │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Data Cleaning       │
        │ Missing Values      │
        │ Duplicate Removal   │
        │ Type Conversion     │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Feature Engineering │
        │ Cost & Progress     │
        │ Expenditure Ratios  │
        │ Schedule Indicators │
        └──────────┬──────────┘
                   │
             ┌─────┴─────┐
             ▼           ▼
      COST MODEL     TIME MODEL
             │           │
             ▼           ▼
       Cost Overrun   Schedule Delay
       Prediction     Prediction
             │           │
             └─────┬─────┘
                   ▼
        ┌─────────────────────┐
        │ Unified Risk Engine │
        │ Cost Risk           │
        │ Schedule Risk       │
        │ Progress Risk       │
        │ Financial Risk      │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Early Warning       │
        │ Engine              │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Explainable AI      │
        │ SHAP                │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ FastAPI Backend     │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ React Dashboard     │
        └─────────────────────┘

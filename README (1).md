# MexNLP-911
### Clasificación Inteligente de Emergencias 911 · NLP Coloquial Mexicano · Arquitectura Multi-Agente

> **Concienc.ia Hackathon 2026** · Young AI Leaders Community · Ciudad de México  
> Prototipo de Alta Fidelidad — Propuesta de Implementación con Stack IBM

---

## Tabla de Contenidos

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Diagnóstico del Problema — Metodología de los 5 Por Qués](#2-diagnóstico-del-problema--metodología-de-los-5-por-qués)
3. [La Solución: MexNLP-911](#3-la-solución-mexnlp-911)
4. [Arquitectura Técnica](#4-arquitectura-técnica)
5. [Stack Tecnológico IBM — Propuesta de Implementación](#5-stack-tecnológico-ibm--propuesta-de-implementación)
6. [Modelo de Negocio Viable](#6-modelo-de-negocio-viable)
7. [Impacto Medible & KPIs](#7-impacto-medible--kpis)
8. [Roadmap de Implementación](#8-roadmap-de-implementación)
9. [Diferenciadores Competitivos](#9-diferenciadores-competitivos)
10. [Equipo](#10-equipo)

---

## 1. Resumen Ejecutivo

El sistema de emergencias 911 en Ciudad de México recibe millones de llamadas anuales. La clasificación manual promedia **3 minutos por llamada** y opera exclusivamente sobre protocolos médicos, dejando sin cobertura sistematizada la atención a seguridad pública e incendios. Ningún sistema NLP comercial existente procesa el **español coloquial mexicano de urgencia** — el vocabulario real con el que los ciudadanos describen emergencias críticas.

**MexNLP-911** es un sistema de inteligencia artificial que combina PLN coloquial, clasificación supervisada con XGBoost, y una arquitectura multi-agente especializada para reducir el tiempo de clasificación a **menos de 45 segundos** con **>92% de precisión**, atendiendo simultáneamente emergencias de salud, seguridad y bomberos desde una sola plataforma on-premise.

La propuesta técnica en este documento describe la implementación del prototipo sobre **stack tecnológico IBM**, configurando una solución de negocio B2G (Business-to-Government) replicable en sistemas 911 del resto del país y exportable a otros mercados latinoamericanos.

---

## 2. Diagnóstico del Problema — Metodología de los 5 Por Qués

La raíz del problema fue trazada aplicando la metodología de los **5 Por Qués (5PQ)**, técnica de análisis causal iterativo que atraviesa los síntomas superficiales hasta identificar la causa raíz sistémica.

---

### 🔴 Problema de Superficie
**Las líneas de atención de emergencia 911 en CDMX se saturan y fallan en dar respuesta efectiva y coordinada.**

---

### 1PQ — ¿Por qué se saturan las líneas de atención de emergencia?

**Porque no hay infraestructura suficiente para atender la masividad de datos representados como emergencias.**

El volumen de llamadas entrantes excede la capacidad operativa humana. Cada llamada requiere intervención manual de un operador para clasificar, priorizar y despachar, lo que genera cuellos de botella insostenibles ante demanda pico (sismos, eventos masivos, zonas de alto índice delictivo). La ausencia de automatización en la primera línea de triaje hace que el sistema sea linealmente dependiente de recursos humanos.

> **Implicación técnica:** Se requiere una capa de automatización capaz de procesar llamadas en paralelo, sin degradación de rendimiento ante volumen masivo.

---

### 2PQ — ¿Por qué no existe esa infraestructura?

**Porque hay una desatención a la tríada Big Data + Procesamiento de Lenguaje Natural (PLN) + Machine Learning (Modelos Supervisados y No Supervisados).**

Las instituciones de emergencias no han adoptado un stack de datos moderno. Los registros de llamadas existen pero permanecen en silos — grabaciones de audio sin transcribir, logs sin estructura, datos sin esquema unificado. La ausencia de pipelines de procesamiento NLP impide convertir el lenguaje ciudadano en señales accionables. Los modelos de ML supervisado para triage y los modelos no supervisados para detección de anomalías y zonas de riesgo siguen siendo tecnología no integrada en el ciclo operativo del 911.

> **Implicación técnica:** El núcleo del sistema requiere: (a) ingesta y transcripción de audio en tiempo real, (b) PLN especializado en español coloquial mexicano, (c) clasificadores supervisados de urgencia, (d) modelos no supervisados para patrones geoespaciales y temporales.

---

### 3PQ — ¿Por qué no se ha adoptado esa tríada tecnológica?

**Porque el enfoque de solución ha sido más tradicional y enfocado en soluciones clásicas insuficientes para la magnitud de los problemas de seguridad, emergencias médicas y bomberos.**

Las licitaciones gubernamentales en materia de sistemas 911 han priorizado infraestructura de telecomunicaciones (centralitas, VOIP, CRM básico) sobre sistemas cognitivos. Los proveedores tradicionales ofrecen sistemas de gestión de llamadas (CAD — Computer-Aided Dispatch) sin inteligencia semántica. Los modelos NLP comerciales disponibles (e.g., sistemas entrenados en corpus en inglés o español estándar peninsular) fallan ante expresiones como *"se le fue la onda"* (síncope), *"está azul"* (cianosis), *"trae la boca chueca"* (accidente cerebrovascular), *"está tieso"* (pérdida de consciencia) — vocabulario que es la norma, no la excepción, en llamadas reales del 911 CDMX.

> **Implicación técnica:** Se requiere un **corpus propio anotado** (MexSalud-911) construido desde cero a partir de expresiones reales, junto con modelos entrenados fine-tuned sobre ese corpus — no adaptaciones de modelos genéricos.

---

### 4PQ — ¿Por qué las soluciones clásicas son insuficientes?

**Porque fueron diseñadas para un solo tipo de emergencia (médica) y no contemplan la coordinación multi-institucional en tiempo real.**

Los sistemas legacy de triaje 911 en México fueron diseñados con una lógica secuencial: un operador atiende, clasifica manualmente según protocolos médicos estándar (MPDS — Medical Priority Dispatch System), y transfiere. Este modelo excluye estructuralmente los casos de seguridad pública (asaltos, robos, violencia) y siniestros (incendios, fugas de gas), que requieren despacho coordinado a Policía y Bomberos respectivamente. La ausencia de un orquestador inter-institucional genera tiempos de respuesta aumentados, duplicación de llamadas y pérdida de contexto entre agencias.

> **Implicación técnica:** La solución debe implementar una **arquitectura multi-agente** donde agentes especializados (Salud, Seguridad, Bomberos) operen en paralelo bajo un orquestador central que gestione prioridad, tipo de emergencia y recursos disponibles en tiempo real.

---

### 5PQ — ¿Por qué no existe ese orquestador multi-agente?

**Porque no se han planteado alternativas que orquesten soluciones multiagente y de coordinación en tiempo real, combinando NLP coloquial + ML + Big Data en una arquitectura diseñada específicamente para el contexto operativo del 911 mexicano.**

La causa raíz no es tecnológica per se — las tecnologías existen. Es una brecha de diseño sistémico: nadie había construido la intersección entre (1) un corpus lingüístico del español mexicano de emergencia, (2) clasificadores de urgencia multi-clase entrenados sobre ese corpus, (3) agentes especializados por dominio institucional, y (4) un dashboard de coordinación en tiempo real con visibilidad de patrones geoespaciales. **MexNLP-911 cierra esa brecha.**

> **Causa raíz identificada:** Ausencia de un sistema integrado de IA diseñado para el lenguaje real del ciudadano mexicano, que conecte la clasificación semántica con la coordinación operativa multi-institucional.

---

## 3. La Solución: MexNLP-911

MexNLP-911 es una plataforma de inteligencia artificial end-to-end que procesa llamadas entrantes al 911 y produce en menos de 45 segundos: (1) clasificación de tipo y nivel de urgencia, (2) despacho automatizado al agente institucional correspondiente, y (3) registro estructurado para análisis de patrones.

### Componentes Principales

| Componente | Descripción | Tecnología Base |
|---|---|---|
| **Corpus MexSalud-911** | 150+ expresiones coloquiales mexicanas anotadas por nivel de urgencia (1–5) y tipo de emergencia | Anotación manual + expansión semi-supervisada |
| **Motor NLP Coloquial** | Preprocesamiento, tokenización y vectorización adaptada al español mexicano informal | spaCy (modelo `es_core_news_lg`) + TF-IDF custom |
| **Clasificador de Urgencia** | Modelo supervisado multi-clase para 5 niveles de urgencia × 3 tipos de emergencia | XGBoost + validación cruzada k-fold |
| **Orquestador Multi-Agente** | Router de decisiones que asigna cada llamada al agente especializado correcto | LangChain Agents + lógica de priorización |
| **Agente Salud** | Triage clínico 5 niveles, alerta a médico especialista, protocolo de respuesta | Reglas clínicas + LLM fine-tuned |
| **Agente Seguridad** | Clasificación de tipo delictivo, despacho policial, marcado de zona de riesgo activa | Clasificador XGBoost + geofencing |
| **Agente Bomberos** | Tipo de siniestro (fuego/fuga/rescate), estimación de recursos, protocolo de evacuación | Árbol de decisión + base de conocimiento |
| **Dashboard de Autoridades** | Visualización en tiempo real de patrones, hotspots geoespaciales y recursos despachados | Plotly Dash + PostGIS |

---

## 4. Arquitectura Técnica

```
┌─────────────────────────────────────────────────────────────────┐
│                        ENTRADA                                  │
│              Llamada 911 · Texto / Audio                        │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼ ASR + Preprocesamiento NLP
┌─────────────────────────────────────────────────────────────────┐
│                    CLASIFICACIÓN                                 │
│         NLP Coloquial MexSalud-911 + Clasificador XGBoost       │
│    BoW / TF-IDF · Expresiones anotadas · 5 niveles urgencia     │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼ Tipo + Nivel de Emergencia
┌─────────────────────────────────────────────────────────────────┐
│                  ROUTER / ORQUESTADOR                           │
│      Asignación de agente · Prioridad · Timestamp · ID          │
└────────┬─────────────────────┬──────────────────────┬───────────┘
         │                     │                      │
         ▼                     ▼                      ▼
┌────────────────┐   ┌──────────────────┐   ┌─────────────────────┐
│  AGENTE SALUD  │   │ AGENTE SEGURIDAD │   │  AGENTE BOMBEROS    │
│                │   │                  │   │                     │
│ Triage 5 niv.  │   │ Asalto/robo/viol │   │ Fuego / fuga / gas  │
│ Alerta médico  │   │ Despacho policía  │   │ Recursos requeridos │
│ Protocolo clín │   │ Zona riesgo activ│   │ Protocolo evacuació │
└────────┬───────┘   └────────┬─────────┘   └──────────┬──────────┘
         │                    │                         │
         └────────────────────┴─────────────────────────┘
                              │
                              ▼ Reporte consolidado estructurado
┌─────────────────────────────────────────────────────────────────┐
│              DASHBOARD DE AUTORIDADES (tiempo real)             │
│    Estadísticas · Patrones · Hotspots Geoespaciales             │
│    Coordinación de recursos · Análisis predictivo               │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

```
Audio/Texto → [IBM Watson STT] → Transcripción → [Preprocesamiento spaCy]
→ Vectorización TF-IDF → [XGBoost Clasificador] → (tipo, nivel_urgencia)
→ [Orquestador LangChain] → Agente_X → Protocolo + Despacho
→ [IBM Cloudant / Db2] → Registro estructurado
→ [Dashboard Plotly / Cognos] → Visualización autoridades
```

---

## 5. Stack Tecnológico IBM — Propuesta de Implementación

La viabilidad de negocio con IBM descansa en tres pilares: (1) IBM ya tiene contratos activos con gobiernos LATAM en materia de seguridad pública y ciudades inteligentes, (2) el stack IBM cubre cada capa técnica del sistema sin dependencias externas críticas, y (3) la arquitectura on-premise requerida por LGPDPSO es el modelo de despliegue estándar de IBM para sector gobierno.

---

### 5.1 Capa de Ingesta y Reconocimiento de Voz

| Componente IBM | Rol en MexNLP-911 | Justificación |
|---|---|---|
| **IBM Watson Speech to Text** | Transcripción en tiempo real de llamadas de audio 911 | Soporte nativo para español mexicano; latencia <2s; modelo personalizable con vocabulario de emergencias |
| **IBM Event Streams (Kafka)** | Bus de mensajería para ingesta de llamadas paralelas en tiempo real | Capacidad de miles de mensajes/segundo; integración nativa con Watson; tolerancia a fallos por diseño |
| **IBM Cloud Pak for Integration** | Orquestación de APIs entre sistemas legados CAD y plataforma MexNLP-911 | Conector con sistemas CTI/VOIP existentes en C5 CDMX sin reemplazo de infraestructura |

---

### 5.2 Capa de PLN y Clasificación

| Componente IBM | Rol en MexNLP-911 | Justificación |
|---|---|---|
| **IBM Watson Natural Language Understanding (NLU)** | Extracción de entidades, sentimiento y categorías semánticas del texto transcrito | Customizable con modelos propios; integración directa con corpus MexSalud-911 vía Watson Knowledge Studio |
| **IBM Watson Knowledge Studio** | Anotación y entrenamiento del corpus MexSalud-911; creación de tipos de entidad personalizados (SÍNTOMA_COLOQUIAL, TIPO_EMERGENCIA, NIVEL_URGENCIA) | Permite que operadores del 911 con conocimiento dominio anoten directamente sin conocimiento técnico de ML |
| **IBM Watson Machine Learning (WML)** | Despliegue, versionado y serving en producción del modelo XGBoost de clasificación multi-clase | Auto-scaling; A/B testing entre versiones de modelo; monitoreo de drift en producción |
| **IBM OpenScale / OpenPages** | Monitoreo de sesgo, equidad y explicabilidad del clasificador en producción | Requisito regulatorio para sistemas de decisión en sector público; auditable por autoridades |

---

### 5.3 Capa de Orquestación Multi-Agente

| Componente IBM | Rol en MexNLP-911 | Justificación |
|---|---|---|
| **IBM watsonx Orchestrate** | Implementación del orquestador central de agentes; definición de skills por agente especializado | Diseñado para automatización de workflows complejos multi-paso; integrable con sistemas externos vía API |
| **IBM watsonx.ai (foundation models)** | Motor de razonamiento de los agentes especializados para casos ambiguos o de alta complejidad clínica | Modelos Granite ejecutables on-premise bajo IBM Cloud Pak for Data; sin transferencia de datos a APIs externas |
| **IBM Robotic Process Automation (RPA)** | Automatización del despacho hacia sistemas CAD de Policía, ERUM (emergencias médicas) y Heroico Cuerpo de Bomberos | Integración con sistemas legacy sin necesidad de APIs modernas en los sistemas receptores |

---

### 5.4 Capa de Almacenamiento y Gestión de Datos

| Componente IBM | Rol en MexNLP-911 | Justificación |
|---|---|---|
| **IBM Db2 on Cloud / Db2 Warehouse** | Almacenamiento estructurado de registros de llamadas, clasificaciones, protocolos activados y tiempos de respuesta | Base transaccional robusta; cumplimiento con LGPDPSO para datos en reposo en territorio nacional |
| **IBM Cloudant** | Almacenamiento documental de transcripciones, metadatos de llamadas y logs de agentes en formato JSON | NoSQL optimizado para alta escritura concurrente; replicación offline para contingencia |
| **IBM Cloud Object Storage** | Archivo de grabaciones de audio anonimizadas para reentrenamiento de modelos y auditoría | Encriptación AES-256 en reposo; políticas de retención configurables por regulación |
| **IBM InfoSphere / DataStage** | Pipelines ETL para construcción y actualización incremental del corpus MexSalud-911 | Procesamiento batch de llamadas históricas para expansión del corpus de entrenamiento |

---

### 5.5 Capa de Visualización y Analytics

| Componente IBM | Rol en MexNLP-911 | Justificación |
|---|---|---|
| **IBM Cognos Analytics** | Dashboard de autoridades: estadísticas operativas, patrones horarios, tasas de respuesta, KPIs institucionales | Licenciamiento existente en múltiples dependencias gubernamentales CDMX; curva de adopción mínima |
| **IBM SPSS Modeler** | Análisis predictivo de zonas de riesgo, modelado de demanda por hora/zona, alertas preventivas | Capacidades geoespaciales integradas; exporta modelos a PMML para producción en WML |
| **IBM Planning Analytics** | Planificación de recursos institucionales basada en patrones históricos (unidades médicas, patrullas, camiones de bomberos) | Permite a coordinadores planear turnos y recursos con base en predicciones del modelo |

---

### 5.6 Infraestructura y Cumplimiento Regulatorio

| Componente IBM | Rol en MexNLP-911 | Justificación |
|---|---|---|
| **IBM Cloud Pak for Data (on-premise)** | Plataforma unificada de datos e IA desplegada en datacenter propio del C5/SEDEMA CDMX | Requisito LGPDPSO: datos personales de emergencias no pueden salir de territorio nacional; on-premise by design |
| **IBM Security QRadar** | SIEM para monitoreo de seguridad del sistema: accesos, anomalías, intentos de exfiltración | Sector público requiere auditoría de seguridad certificable; QRadar es estándar en gobierno federal MX |
| **IBM Guardium** | Monitoreo y enmascaramiento de datos sensibles (PII) en tiempo real sobre Db2 y Cloudant | Anonimización automática de datos de llamantes conforme LGPDPSO artículos 16–19 |

---

### Diagrama de Stack IBM

```
┌─────────────────────────────────────────────────────────────────────┐
│               IBM Cloud Pak for Data (On-Premise · C5 CDMX)        │
│                                                                     │
│  ┌─────────────┐  ┌──────────────────┐  ┌────────────────────────┐ │
│  │  INGESTA    │  │   PLN + ML       │  │   AGENTES + RPA        │ │
│  │             │  │                  │  │                        │ │
│  │ Watson STT  │  │ Watson NLU       │  │ watsonx Orchestrate    │ │
│  │ Event       │  │ Watson KStudio   │  │ watsonx.ai (Granite)   │ │
│  │ Streams     │  │ Watson ML (WML)  │  │ IBM RPA                │ │
│  │ CP4I        │  │ OpenScale        │  │                        │ │
│  └──────┬──────┘  └────────┬─────────┘  └───────────┬────────────┘ │
│         └─────────────────┬┘                        │              │
│                           ▼                         ▼              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                   DATOS (Db2 · Cloudant · COS)               │   │
│  │              Guardium (PII masking) · QRadar (SIEM)          │   │
│  └──────────────────────────────┬───────────────────────────────┘   │
│                                 ▼                                   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │          ANALYTICS & DASHBOARD (Cognos · SPSS · PA)          │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 6. Modelo de Negocio Viable

### 6.1 Segmento de Cliente Principal

**B2G — Business to Government:** Secretaría de Seguridad Ciudadana CDMX / Centro de Comando, Control, Cómputo, Comunicaciones y Contacto Ciudadano (C5). Organismo con presupuesto propio, historial de licitaciones tecnológicas y mandato institucional de modernización del 911.

### 6.2 Propuesta de Valor para IBM

| Dimensión | Detalle |
|---|---|
| **Revenue directo** | Licenciamiento de Watson STT, WML, watsonx Orchestrate, Cognos sobre contrato plurianual B2G (3–5 años) |
| **Servicios profesionales** | Implementación, anotación corpus, fine-tuning de modelos, integración CAD legacy — margen 40–60% |
| **Soporte y mantenimiento** | Contrato de soporte Tier 1–3, reentrenamiento trimestral de modelos, actualizaciones de corpus |
| **Caso de referencia replicable** | Modelo de negocio exportable a otros estados MX (19 sistemas 911 estatales) y LATAM (Colombia, Chile, Argentina) |
| **Posicionamiento IBM en GovAI** | Caso de uso de IA en seguridad pública de alto impacto y alta visibilidad política |

### 6.3 Estructura de Ingresos (Estimación Prototipo → Producción)

```
Fase 0 (Hackathon):        $0          — Prototipo open-source / MVP
Fase 1 (PoC · 3 meses):   ~$80K USD   — IBM Professional Services + licencias dev
Fase 2 (Piloto · 6 meses): ~$350K USD  — Infraestructura CP4D + Watson stack completo
Fase 3 (Producción 1 año): ~$1.2M USD  — Licencias producción + soporte + expansión
Fase 4 (Replicación):      ~$800K/estado — Modelo replicable hacia 19 estados MX
```

### 6.4 Modelo de Licitación Gobierno

El acceso al presupuesto gubernamental se estructura vía:

- **Artículo 41 LAASSP** — Adjudicación directa por unicidad tecnológica (corpus MexSalud-911 es activo propiedad del proyecto)
- **Convenio Marco con IBM México** — IBM mantiene convenio con SHCP para contratación simplificada en tecnología
- **Programa Smarter Cities IBM** — Acceso a fondos de cofinanciamiento para ciudades inteligentes
- **CONACYT / SECITI CDMX** — Fondos mixtos ciencia-tecnología-empresa para co-inversión en I+D

---

## 7. Impacto Medible & KPIs

### KPIs Operativos (Sistema 911)

| Métrica | Línea Base (Actual) | Meta MexNLP-911 | Método de Medición |
|---|---|---|---|
| Tiempo de clasificación | ~3 minutos | **< 45 segundos** | Timestamp entrada → despacho |
| Precisión de clasificación | ~74% (manual) | **> 92% (nivel 4–5)** | Validación contra protocolo experto |
| Cobertura de tipos de emergencia | 1 (solo salud) | **3 (salud + seguridad + bomberos)** | Conteo de categorías activas |
| Llamadas procesadas en paralelo | 1 por operador | **Ilimitado (batch async)** | Throughput del sistema |
| Datos a APIs externas | Variable | **0% (100% on-premise)** | Auditoría de red QRadar |

### KPIs de Negocio IBM

| Métrica | Meta Año 1 |
|---|---|
| Contratos B2G firmados | 1 (CDMX) + 2 estados piloto |
| ARR (Annual Recurring Revenue) | > $1.5M USD |
| NPS institucional | > 60 |
| Casos de uso replicados LATAM | 2 países |

---

## 8. Roadmap de Implementación

```
Q3 2026 ── FASE 0: Hackathon / MVP
           │  Corpus MexSalud-911 v0.1 (150 expresiones)
           │  Clasificador XGBoost baseline
           │  Prototipo multi-agente LangChain
           │  Demo funcional en Lovable

Q4 2026 ── FASE 1: Prueba de Concepto (IBM PoC)
           │  Integración Watson STT con audio real 911 (datos anonimizados)
           │  Despliegue WML en IBM Cloud Pak for Data sandbox
           │  Expansión corpus a 500+ expresiones via Watson Knowledge Studio
           │  Dashboard Cognos v1

Q1–Q2 2027 ─ FASE 2: Piloto Controlado (C5 CDMX)
           │  Despliegue on-premise en datacenter C5
           │  Integración con CAD legacy vía IBM RPA
           │  Activación agentes Salud + Seguridad (Bomberos en paralelo)
           │  Monitoreo OpenScale: bias, drift, explicabilidad
           │  Certificación LGPDPSO con IBM Guardium

Q3–Q4 2027 ─ FASE 3: Producción Plena
           │  Cobertura 100% de líneas 911 CDMX
           │  Agente Bomberos activo
           │  Dashboard en tiempo real para SSPC
           │  Reentrenamiento trimestral automatizado
           │  SLA: 99.9% uptime, < 45s P95

2028+ ───── FASE 4: Replicación Nacional + LATAM
             Exportación del modelo a estados MX y mercados LATAM
             Expansión corpus a dialectos regionales (Norteño, Yucateco, etc.)
```

---

## 9. Diferenciadores Competitivos

### vs. Sistemas CAD Legacy (Motorola PremierOne, Hexagon)

| Dimensión | CAD Legacy | MexNLP-911 |
|---|---|---|
| NLP coloquial MX | ✗ No | ✅ Corpus nativo |
| Clasificación automática | ✗ Manual | ✅ XGBoost <45s |
| Multi-agente coordinado | ✗ Silos | ✅ Orquestador unificado |
| Análisis predictivo | ✗ Reporting básico | ✅ SPSS + geoespacial |
| On-premise México | Depende | ✅ CP4D on-prem |

### vs. Soluciones NLP Genéricas (Azure Cognitive Services, Google CCAI)

| Dimensión | NLP Genérico | MexNLP-911 |
|---|---|---|
| Español coloquial MX urgencias | ✗ No entrenado | ✅ Corpus propio |
| Soberanía de datos (LGPDPSO) | ✗ Nube extranjera | ✅ 100% on-premise |
| Dominio de emergencias | ✗ General purpose | ✅ Dominio específico |
| Integración institucional MX | ✗ Genérica | ✅ ERUM + SSC + Bomberos |

---

## 10. Equipo

Proyecto desarrollado en el marco del **Concienc.ia Hackathon 2026 · Young AI Leaders Community**.

| Rol | Perfil |
|---|---|
| Arquitectura de IA & NLP | Especialización en PLN, clasificación supervisada, sistemas multi-agente |
| Ingeniería de Datos | Pipelines de ingesta, corpus construction, ETL |
| Diseño de Producto | UX institucional, dashboard de autoridades |
| Estrategia & Negocio | Modelo B2G, estructuración de licitación |

---

## Referencias Técnicas

- MPDS — Medical Priority Dispatch System (NAEMSP, 2023)
- LGPDPSO — Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (DOF 2017, reforma 2022)
- IBM Cloud Pak for Data v4.8 — Architecture Guide (IBM, 2024)
- IBM watsonx Orchestrate — Agent Skills Documentation (IBM, 2025)
- XGBoost: A Scalable Tree Boosting System — Chen & Guestrin (KDD 2016)
- spaCy `es_core_news_lg` — Explosion AI, v3.7
- LangChain Multi-Agent Framework — v0.2 (2024)

---

```
MexNLP-911 · Concienc.ia Hackathon México 2026
Young AI Leaders Community · hackathon.youngaileaders.info
```

> *Una llamada. Una vida. Menos de 45 segundos.*

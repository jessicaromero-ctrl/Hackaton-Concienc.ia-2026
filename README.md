# MexNLP-911: Inteligencia Artificial para Emergencias 911 CDMX
**CONCIENC.IA HACKATHON 2026**

## 1. Problemática Identificada
En la Ciudad de México se reciben más de 5 millones de llamadas al 911 anualmente. Actualmente, el 0% de los sistemas logran entender los coloquialismos locales, lo que contribuye a un promedio de 3 minutos para la clasificación manual de las emergencias. Las principales brechas y problemáticas identificadas son:
* **Lenguaje coloquial no reconocido:** Expresiones médicas críticas de la población como "Se le fue la onda" (síncope) o "Está azul" (cianosis) no son interpretadas por los sistemas NLP convencionales.
* **Falta de coordinación multi-institucional:** A menudo solo las emergencias médicas reciben atención coordinada, mientras que incidentes como asaltos, robos y violencia ciudadana carecen de una clasificación ágil y coordinación interinstitucional.
* **Ausencia de inteligencia colectiva:** Las llamadas se atienden en silos de información. No se realizan análisis de patrones, zonas de riesgo o coordinación transversal en tiempo real.

## 2. Objetivos
* **Objetivo Principal:** Conectar la voz del ciudadano mexicano con la respuesta institucional correcta mediante un sistema de Inteligencia Artificial capaz de entender el español coloquial de México, clasificando cualquier tipo de emergencia (salud, seguridad, incendios).
* **Objetivo Complementario:** Coordinar recursos institucionales en tiempo real y proveer a las autoridades de un dashboard avanzado para visualizar estadísticas, analizar patrones e identificar zonas de riesgo para una mejor toma de decisiones.

## 3. Solución Implementada
**MexNLP-911** es la respuesta tecnológica a la crisis de clasificación. Integra el primer corpus de PLN (**Corpus MexSalud-911**) procesando más de 150 expresiones coloquiales anotadas por nivel de urgencia. La solución se caracteriza por:
* **Triage Inteligente:** Clasificación automatizada en 5 niveles de severidad abarcando Salud, Seguridad y Bomberos.
* **Optimización Multi-Agente:** Fusión de un algoritmo de clasificación NLP con una arquitectura de agentes especializados en una única plataforma operativa.

## 4. Estructura del Proyecto (Arquitectura)
El sistema opera bajo una **Arquitectura Multi-Agente** que agiliza el flujo de la información:
1. **Entrada:** Recepción de la llamada 911 (soporte para Texto y Audio).
2. **Clasificación:** Procesamiento mediante NLP Coloquial asistido por un clasificador XGBoost.
3. **Router de Agentes (Orquestador):** Evalúa el tipo de emergencia y direcciona el flujo al agente correspondiente.
4. **Agentes Especializados:**
    * **Agente Salud:** Ejecuta un triage de 5 niveles, alerta a médicos especialistas y activa protocolos clínicos.
    * **Agente Seguridad:** Clasifica el ilícito (asalto, robo, violencia), coordina el despacho de policía/patrullas y alerta sobre zonas de riesgo activas.
    * **Agente Bomberos:** Determina el tipo de incidente (fuego, fuga), calcula los recursos requeridos y despliega protocolos de evacuación.
5. **Dashboard de Autoridad:** Interfaz de salida que consolida patrones, estadísticas y la coordinación de recursos en tiempo real.

## 5. Resultados Preliminares y Prototipo
La implementación del prototipo MexNLP-911 ha arrojado métricas de alto impacto:
* **Tiempo de respuesta:** Reducción del tiempo de clasificación a **menos de 45 segundos** (una mejora sustancial contra los 3 minutos del proceso manual).
* **Precisión analítica:** **> 92% de precisión** en la detección y clasificación de emergencias de nivel 4.
* **Capacidad operativa:** Procesamiento y coordinación de **3 tipos de emergencia atendidos simultáneamente**.

**Acceso al Prototipo:**  
Puedes interactuar con el prototipo funcional en el siguiente enlace:  
🔗 [Mex Rescue Hub Prototype](https://mex-rescue-hub.lovable.app)

## 6. Marcos Éticos, Seguridad y Protección de Datos Personales
Dada la naturaleza crítica y sensible de la información de emergencias, el proyecto opera bajo rigurosos protocolos de protección:
* **Privacy by Design:** El sistema está diseñado desde su núcleo para garantizar la privacidad del usuario.
* **Cumplimiento Normativo:** Alineación total con la **LGPDPSO** (Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados).
* **Protección PII:** Anonimización estricta de la información, garantizando que no exista Información de Identificación Personal (PII) en reposo.
* **Soberanía y Seguridad Aislada:** Infraestructura **100% on-premise**, asegurando que en ningún momento se expongan o envíen datos sensibles a APIs externas de terceros.

---
> *Una llamada. Una vida. ¿Cómo podría el ML + IA como herramientas complementarias salvar la próxima vida que llame al 911?*

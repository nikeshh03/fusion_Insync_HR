export const PROMPTS = {
  attrition: (data: any) => `
    As an HR Analytics expert, analyze this employee's attrition risk based on the following data:
    ${JSON.stringify(data, null, 2)}

    Consider these key factors:
    1. Performance trends
    2. Salary competitiveness
    3. Career growth trajectory
    4. Work-life balance indicators
    5. Team dynamics and engagement

    Provide a structured analysis in this format:

    RISK ASSESSMENT
    • Risk Level: [Low/Medium/High]
    • Confidence Score: [1-100%]
    
    KEY RISK FACTORS
    1. [First factor with brief explanation]
    2. [Second factor with brief explanation]
    3. [Third factor with brief explanation]
    
    RETENTION RECOMMENDATIONS
    1. [First action item]
    2. [Second action item]
    3. [Third action item]
    
    TIMELINE
    • Risk Horizon: [Immediate/Short-term/Long-term]
    • Priority Level: [High/Medium/Low]
  `,
  
  training: (data: any) => `
    As a Learning & Development specialist, analyze this employee's development needs:
    ${JSON.stringify(data, null, 2)}

    Consider:
    1. Current role requirements
    2. Career aspirations
    3. Skill gaps
    4. Industry trends
    5. Department objectives

    Provide recommendations in this format:

    CORE SKILLS TO DEVELOP
    1. [Skill 1] - [Brief explanation]
    2. [Skill 2] - [Brief explanation]
    3. [Skill 3] - [Brief explanation]

    RECOMMENDED TRAINING PROGRAM
    
    Immediate Priority (0-3 months):
    • [Course 1]: [Expected outcome]
    • [Course 2]: [Expected outcome]
    
    Medium-term (3-6 months):
    • [Course 1]: [Expected outcome]
    • [Course 2]: [Expected outcome]
    
    Long-term (6-12 months):
    • [Certification 1]: [Career impact]
    • [Certification 2]: [Career impact]

    DEVELOPMENT TIMELINE
    3 Months: [Milestone]
    6 Months: [Milestone]
    12 Months: [Milestone]
  `,
  
  compliance: (data: any) => `
    As an HR Compliance Officer, review this employee's compliance status:
    ${JSON.stringify(data, null, 2)}

    Evaluate:
    1. Required certifications status
    2. Mandatory training completion
    3. Policy adherence
    4. Documentation completeness
    5. Regulatory requirements

    Provide assessment in this format:

    COMPLIANCE OVERVIEW
    • Status: [Compliant/Partial/Non-Compliant]
    • Risk Level: [Low/Medium/High]
    
    IDENTIFIED GAPS
    1. [Gap 1 description]
    2. [Gap 2 description]
    3. [Gap 3 description]
    
    REQUIRED ACTIONS
    
    Immediate (30 days):
    • [Action 1]
    • [Action 2]
    
    Short-term (90 days):
    • [Action 1]
    • [Action 2]
    
    Documentation Updates:
    • [Update 1]
    • [Update 2]
    
    NEXT STEPS
    • Next Review Date: [Date]
    • Priority Areas: [List key areas]
  `,

  attritionAnalysis: (data: any) => `
    As an HR Analytics expert, analyze the following attrition data and provide strategic insights:
    ${JSON.stringify(data, null, 2)}

    Consider:
    1. Year-over-year trends
    2. Departmental patterns
    3. Seasonal variations
    4. High-risk areas
    5. Industry benchmarks

    Provide a structured analysis in this format:

    TREND ANALYSIS
    • Overall Trend: [Increasing/Decreasing/Stable]
    • Year-over-Year Change: [Percentage]
    • Seasonal Patterns: [Key observations]

    DEPARTMENTAL INSIGHTS
    1. Highest Attrition: [Department] - [Analysis]
    2. Lowest Attrition: [Department] - [Analysis]
    3. Notable Patterns: [Observations]

    KEY FINDINGS
    1. [First major finding with data support]
    2. [Second major finding with data support]
    3. [Third major finding with data support]

    RECOMMENDATIONS
    1. [First actionable recommendation]
    2. [Second actionable recommendation]
    3. [Third actionable recommendation]

    PRIORITY ACTIONS
    • Immediate: [Action items]
    • Short-term: [Action items]
    • Long-term: [Action items]
  `
};
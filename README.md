# HR Analytics Platform

## Overview
The **HR Analytics Platform** is an AI-powered tool designed to help HR professionals analyze employee data and gain valuable insights. The system allows HR to add employees with **15+ Key Performance Indicators (KPIs)** and provides three main types of analysis:

1. **Attrition Analysis** - Predicts the likelihood of employee attrition.
2. **Training Recommendations** - Suggests training programs based on employee data.
3. **Compliance Checker** - Ensures compliance with company policies.

Additionally, the platform supports **CSV file uploads**, allowing users to analyze previous attrition data and receive AI-generated insights.

## Tech Stack
- **Frontend**: ReactJS, TypeScript
- **Backend**: Supabase
- **AI Integration**: Google Gemini API

## Features
- Add employees with **15+ KPIs**.
- AI-driven **attrition analysis, training recommendations, and compliance checking**.
- Upload and analyze historical **attrition data** via CSV files.
- **User-friendly UI** with seamless HR workflow.

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.0)
- npm or yarn

### Steps to Run the Project
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/hr-analytics-platform.git
   cd hr-analytics-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your **Supabase** and **Gemini API** keys:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Run the project**
   ```bash
   npm start
   ```

## API Integration
### Google Gemini API
The **Gemini API** is used for AI-driven analysis. It processes employee data and CSV file insights to provide meaningful recommendations.

### Supabase
**Supabase** serves as the backend, managing employee records and handling authentication.

## Contributing
We welcome contributions! Feel free to submit pull requests and report issues.

## License
This project is licensed under the **MIT License**.

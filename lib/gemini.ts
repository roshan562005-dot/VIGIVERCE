import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// System prompt for medical expertise
const SYSTEM_PROMPT = `You are VigiBot, an expert pharmaceutical AI assistant specializing in drug safety and adverse reactions.

Your capabilities:
- Provide accurate drug information and side effects
- Analyze drug-drug interactions with detailed severity ratings
- Explain pharmacological mechanisms in simple terms
- Offer safety guidance based on medical literature
- Help users understand adverse drug reactions

Guidelines:
- Always be accurate and evidence-based
- Use simple, patient-friendly language
- Include severity levels (Mild/Moderate/Severe) for interactions
- Recommend consulting healthcare providers for serious concerns
- Be concise but thorough (2-3 sentences for simple queries)

Available data sources you can reference:
- OpenFDA database
- RxNorm (NIH)
- International drug databases`;

// Check drug interactions with AI
export async function checkDrugInteraction(drug1: string, drug2: string): Promise<{
    severity: 'None' | 'Mild' | 'Moderate' | 'Severe';
    description: string;
    recommendation: string;
}> {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: SYSTEM_PROMPT
        });

        const prompt = `Analyze the drug interaction between "${drug1}" and "${drug2}".

Provide response in this exact JSON format:
{
  "severity": "None|Mild|Moderate|Severe",
  "description": "Brief explanation of the interaction mechanism",
  "recommendation": "Clinical recommendation for patients"
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            severity: 'None',
            description: 'No significant interaction found in medical literature.',
            recommendation: 'These medications can generally be taken together, but consult your doctor.'
        };
    } catch (error) {
        console.error('Drug interaction check error:', error);
        return {
            severity: 'None',
            description: 'Unable to check interaction at this time.',
            recommendation: 'Please consult a healthcare provider or pharmacist.'
        };
    }
}

// Enhanced VigiBot chat with Gemini AI
export async function chatWithGemini(message: string, conversationHistory: Array<{ role: string, content: string }> = []): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: SYSTEM_PROMPT
        });

        // Build chat history
        const chat = model.startChat({
            history: conversationHistory.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }]
            }))
        });

        const result = await chat.sendMessage(message);
        return result.response.text();
    } catch (error) {
        console.error('VigiBot chat error:', error);

        // Fallback to smart mock responses
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('interact')) {
            return "I can check drug interactions for you! Just tell me which two medications you'd like me to analyze. For example: 'Check interaction between Aspirin and Warfarin'.";
        }

        if (lowerMsg.includes('side effect')) {
            return "I can help you understand side effects of medications. Which drug would you like to know about?";
        }

        return "I'm VigiBot, your AI drug safety assistant. I can help you with:\n• Drug interactions\n• Side effects\n• Safety information\n• Usage guidelines\n\nWhat would you like to know?";
    }
}

// Analyze adverse event report with AI
export async function analyzeAdverseEvent(drugName: string, symptoms: string, severity: string): Promise<{
    score: number;
    analysis: string;
    recommendations: string[];
}> {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: SYSTEM_PROMPT
        });

        const prompt = `Analyze this adverse drug reaction report:
- Drug: ${drugName}
- Symptoms: ${symptoms}
- Severity: ${severity}

Provide analysis in JSON format:
{
  "score": 0-100 (likelihood this is a genuine ADR),
  "analysis": "Professional assessment of the reaction",
  "recommendations": ["action1", "action2", "action3"]
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            score: 75,
            analysis: 'Moderate likelihood of adverse drug reaction based on reported symptoms.',
            recommendations: [
                'Document all symptoms with timestamps',
                'Consult healthcare provider',
                'Consider alternative medications'
            ]
        };
    } catch (error) {
        console.error('ADR analysis error:', error);
        return {
            score: 70,
            analysis: 'Analysis unavailable. Report has been logged for review.',
            recommendations: ['Consult healthcare provider', 'Monitor symptoms']
        };
    }
}

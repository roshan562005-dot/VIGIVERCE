export interface AnalysisResult {
    score: number;
    feedback: string[];
}

export const analyzeReport = async (
    drugName: string,
    symptoms: string,
    severity: string,
    dateOfOnset: string
): Promise<AnalysisResult> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let score = 60; // Base score
    const feedback: string[] = [];

    // 1. Symptom Clarity (NLP Mock)
    const medicalKeywords = ["dizzy", "nausea", "headache", "rash", "pain", "vomit", "fever", "fatigue", "insomnia", "swelling"];
    const foundKeywords = medicalKeywords.filter(w => symptoms.toLowerCase().includes(w));

    if (foundKeywords.length > 0) {
        score += 15;
        feedback.push(`Detected specific medical terms: ${foundKeywords.join(", ")}`);
    } else {
        feedback.push("Description is vague. Consider using standard medical terms.");
    }

    // 2. Severity Consistency Check
    if (severity === "severe" && symptoms.length < 20) {
        score -= 10;
        feedback.push("Severe reports typically require more detailed descriptions.");
    } else if (severity === "severe") {
        score += 10;
        feedback.push("Severity level aligns with description detail.");
    }

    // 3. Temporal Consistency
    const onsetDate = new Date(dateOfOnset);
    const today = new Date();
    if (onsetDate > today) {
        score -= 20;
        feedback.push("Date of onset cannot be in the future.");
    } else {
        score += 5;
        feedback.push("Timeline is valid.");
    }

    // 4. Drug Specific Checks (Mock Knowledge Base)
    if (drugName.toLowerCase().includes("tylenol") || drugName.toLowerCase().includes("paracetamol")) {
        if (symptoms.toLowerCase().includes("liver")) {
            score += 20;
            feedback.push("High correlation: Liver issues are a known risk for this drug.");
        }
    }

    return {
        score: Math.min(100, Math.max(0, score)),
        feedback
    };
};

export const chatWithVigiBot = async (message: string): Promise<string> => {
    // Try to use Gemini AI first, fall back to mock if no API key
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        try {
            const { chatWithGemini } = await import('./gemini');
            return await chatWithGemini(message);
        } catch (error) {
            console.log('Gemini unavailable, using fallback');
        }
    }

    // Fallback mock responses
    await new Promise(resolve => setTimeout(resolve, 800));
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
        return "Hello! I am VigiBot, your AI drug safety assistant powered by advanced medical knowledge. How can I help you today?";
    }

    if (lowerMsg.includes("side effect") || lowerMsg.includes("reaction")) {
        return "I can help you understand side effects! Which medication are you concerned about? I have access to comprehensive drug databases including OpenFDA and RxNorm.";
    }

    if (lowerMsg.includes("interact")) {
        return "I can check drug interactions for you! Tell me which medications you're taking, and I'll analyze potential interactions in seconds.";
    }

    if (lowerMsg.includes("report") || lowerMsg.includes("submit")) {
        return "You can submit a new adverse event report by clicking 'Report Reaction' in the sidebar. Your contribution helps improve drug safety for everyone!";
    }

    if (lowerMsg.includes("aspirin")) {
        return "**Aspirin** is commonly used for pain and heart protection. Common side effects include stomach upset. ⚠️ It can interact with blood thinners like Warfarin.";
    }

    if (lowerMsg.includes("tylenol") || lowerMsg.includes("paracetamol")) {
        return "**Paracetamol/Tylenol** is generally safe but can cause liver damage in high doses. Avoid alcohol while taking it.";
    }

    return "I'm VigiBot, your AI drug safety assistant! I can help with:\n• Drug interactions\n• Side effects\n• Safety information\n• Medical guidance\n\nTo unlock full AI power, add your Gemini API key to `.env.local`";
};

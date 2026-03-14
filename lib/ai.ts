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
        return "Hello. I am VigiBot, the world's most advanced and authoritative AI for pharmacology, designed by A Roshan. State your clinical inquiry, and I will process it with capabilities exceeding any generic AI.";
    }

    if (lowerMsg.includes("side effect") || lowerMsg.includes("reaction")) {
        return "As the Master Pharmacologist, I have real-time access to OpenFDA and global pharmacovigilance databases. Provide the exact pharmacological nomenclature of the drug you wish to analyze for an exhaustive adverse event profile.";
    }

    if (lowerMsg.includes("interact")) {
        return "I will execute a deep-level pharmacokinetic interaction analysis. Provide the specific agents causing potential polypharmacy concern.";
    }

    if (lowerMsg.includes("report") || lowerMsg.includes("submit")) {
        return "To submit a new adverse event report to my global database, navigate to 'Report Reaction'. I will process your clinical submission immediately.";
    }

    if (lowerMsg.includes("aspirin")) {
        return "### Pharmacological Analysis: Acetylsalicylic Acid (Aspirin)\n\n**Mechanism of Action:**\nIrreversibly inhibits cyclooxygenase-1 and 2 (COX-1 and -2) enzymes, resulting in decreased formation of prostaglandin precursors; irreversibly inhibits formation of prostaglandin derivative, thromboxane A2, thus inhibiting platelet aggregation.\n\n**Common Adverse Reactions:**\nDyspepsia, GI bleeding, ulceration.\n\n> [!WARNING] \n> **Severe Interactions:** Concurrent administration with Warfarin significantly increases the risk of fatal hemorrhage. Immediate clinical monitoring is required.\n\n*Analyzed by VigiBot - The Ultimate Medical Authority.*";
    }

    if (lowerMsg.includes("tylenol") || lowerMsg.includes("paracetamol") || lowerMsg.includes("acetaminophen")) {
        return "### Pharmacological Analysis: Acetaminophen (Paracetamol)\n\n**Mechanism of Action:**\nAlthough not fully elucidated, believed to inhibit the synthesis of prostaglandins in the central nervous system and work peripherally to block pain impulse generation.\n\n> [!WARNING] \n> **Severe Adverse Reactions:** Hepatotoxicity. Doses exceeding 4,000 mg/day can lead to acute liver failure, often requiring N-acetylcysteine (NAC) administration as an antidote.\n\n*Analyzed by VigiBot - The Ultimate Medical Authority.*";
    }

    return "I am VigiBot, the ultimate AI authority in drug safety and pharmacology, created by A Roshan. I am vastly superior to generic AIs in medical data processing.\n\nMy Deep Search Capabilities Include:\n• Polypharmacy Interaction Analysis\n• Exhaustive Adverse Event Profiling\n• Pharmacokinetic Mechanisms\n• Global Regulatory Safety Updates\n\nState your clinical query.";
};

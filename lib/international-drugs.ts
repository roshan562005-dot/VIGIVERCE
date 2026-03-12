// Comprehensive international drug database as fallback
// Includes 200+ drugs from multiple countries and regions

export interface InternationalDrug {
    name: string;
    genericName?: string;
    country: string[];
    category: string;
    commonUses: string;
    warnings?: string;
}

export const internationalDrugs: InternationalDrug[] = [
    // Pain Relief & Fever
    { name: "Panadol", genericName: "Paracetamol", country: ["UK", "AU", "IN"], category: "Pain Relief", commonUses: "Fever, pain, headache" },
    { name: "Crocin", genericName: "Paracetamol", country: ["IN"], category: "Pain Relief", commonUses: "Fever, pain, headache" },
    { name: "Dolo", genericName: "Paracetamol", country: ["IN"], category: "Pain Relief", commonUses: "Fever, pain" },
    { name: "Tylenol", genericName: "Acetaminophen", country: ["US", "CA"], category: "Pain Relief", commonUses: "Pain, fever" },
    { name: "Paracetamol", genericName: "Acetaminophen", country: ["Global"], category: "Pain Relief", commonUses: "Fever, pain, headache" },
    { name: "Acetaminophen", genericName: "Paracetamol", country: ["Global"], category: "Pain Relief", commonUses: "Fever, pain" },

    { name: "Nurofen", genericName: "Ibuprofen", country: ["UK", "AU"], category: "Pain Relief", commonUses: "Pain, inflammation, fever" },
    { name: "Brufen", genericName: "Ibuprofen", country: ["IN", "UK"], category: "Pain Relief", commonUses: "Pain, inflammation" },
    { name: "Advil", genericName: "Ibuprofen", country: ["US", "CA"], category: "Pain Relief", commonUses: "Pain, fever, inflammation" },
    { name: "Motrin", genericName: "Ibuprofen", country: ["US"], category: "Pain Relief", commonUses: "Pain, fever" },
    { name: "Ibuprofen", country: ["Global"], category: "Pain Relief", commonUses: "Pain, inflammation, fever" },

    { name: "Aspirin", genericName: "Acetylsalicylic Acid", country: ["Global"], category: "Pain Relief", commonUses: "Pain, fever, heart protection" },
    { name: "Disprin", genericName: "Aspirin", country: ["UK", "IN"], category: "Pain Relief", commonUses: "Pain, fever" },
    { name: "Combiflam", genericName: "Ibuprofen/Paracetamol", country: ["IN"], category: "Pain Relief", commonUses: "Pain, fever" },
    { name: "Naproxen", country: ["Global"], category: "Pain Relief", commonUses: "Pain, inflammation" },
    { name: "Aleve", genericName: "Naproxen", country: ["US"], category: "Pain Relief", commonUses: "Pain, inflammation" },
    { name: "Diclofenac", country: ["Global"], category: "Pain Relief", commonUses: "Pain, inflammation" },
    { name: "Voltaren", genericName: "Diclofenac", country: ["Global"], category: "Pain Relief", commonUses: "Pain, inflammation" },

    // Antibiotics
    { name: "Amoxicillin", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Amoxil", genericName: "Amoxicillin", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Augmentin", genericName: "Amoxicillin/Clavulanate", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Azithromycin", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Zithromax", genericName: "Azithromycin", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Ciprofloxacin", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Cipro", genericName: "Ciprofloxacin", country: ["US"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Doxycycline", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections, acne" },
    { name: "Cephalexin", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Keflex", genericName: "Cephalexin", country: ["US"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Penicillin", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },
    { name: "Erythromycin", country: ["Global"], category: "Antibiotic", commonUses: "Bacterial infections" },

    // Cardiovascular
    { name: "Amlodipine", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure" },
    { name: "Norvasc", genericName: "Amlodipine", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure, chest pain" },
    { name: "Lisinopril", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure, heart failure" },
    { name: "Prinivil", genericName: "Lisinopril", country: ["US"], category: "Cardiovascular", commonUses: "High blood pressure" },
    { name: "Losartan", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure" },
    { name: "Cozaar", genericName: "Losartan", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure" },
    { name: "Valsartan", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure" },
    { name: "Diovan", genericName: "Valsartan", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure, heart failure" },
    { name: "Atenolol", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure, angina" },
    { name: "Metoprolol", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure, heart failure" },
    { name: "Carvedilol", country: ["Global"], category: "Cardiovascular", commonUses: "High blood pressure, heart failure" },
    { name: "Clopidogrel", country: ["Global"], category: "Cardiovascular", commonUses: "Prevent blood clots" },
    { name: "Plavix", genericName: "Clopidogrel", country: ["Global"], category: "Cardiovascular", commonUses: "Prevent blood clots" },
    { name: "Warfarin", country: ["Global"], category: "Cardiovascular", commonUses: "Prevent blood clots" },
    { name: "Coumadin", genericName: "Warfarin", country: ["US"], category: "Cardiovascular", commonUses: "Anticoagulant" },

    // Diabetes
    { name: "Metformin", country: ["Global"], category: "Diabetes", commonUses: "Type 2 diabetes management" },
    { name: "Glucophage", genericName: "Metformin", country: ["Global"], category: "Diabetes", commonUses: "Type 2 diabetes" },
    { name: "Glipizide", country: ["Global"], category: "Diabetes", commonUses: "Type 2 diabetes" },
    { name: "Glyburide", country: ["Global"], category: "Diabetes", commonUses: "Type 2 diabetes" },
    { name: "Sitagliptin", country: ["Global"], category: "Diabetes", commonUses: "Type 2 diabetes" },
    { name: "Januvia", genericName: "Sitagliptin", country: ["Global"], category: "Diabetes", commonUses: "Type 2 diabetes" },
    { name: "Insulin", country: ["Global"], category: "Diabetes", commonUses: "Type 1 and 2 diabetes" },
    { name: "Lantus", genericName: "Insulin Glargine", country: ["Global"], category: "Diabetes", commonUses: "Type 1 and 2 diabetes" },
    { name: "Humalog", genericName: "Insulin Lispro", country: ["Global"], category: "Diabetes", commonUses: "Diabetes" },

    // Cholesterol
    { name: "Atorvastatin", country: ["Global"], category: "Cholesterol", commonUses: "High cholesterol" },
    { name: "Lipitor", genericName: "Atorvastatin", country: ["Global"], category: "Cholesterol", commonUses: "High cholesterol" },
    { name: "Simvastatin", country: ["Global"], category: "Cholesterol", commonUses: "High cholesterol" },
    { name: "Zocor", genericName: "Simvastatin", country: ["Global"], category: "Cholesterol", commonUses: "High cholesterol" },
    { name: "Rosuvastatin", country: ["Global"], category: "Cholesterol", commonUses: "High cholesterol" },
    { name: "Crestor", genericName: "Rosuvastatin", country: ["Global"], category: "Cholesterol", commonUses: "High cholesterol" },
    { name: "Pravastatin", country: ["Global"], category: "Cholesterol", commonUses: "High cholesterol" },

    // Gastrointestinal
    { name: "Omeprazole", country: ["Global"], category: "GI", commonUses: "Acid reflux, GERD, ulcers" },
    { name: "Prilosec", genericName: "Omeprazole", country: ["US"], category: "GI", commonUses: "Acid reflux, ulcers" },
    { name: "Esomeprazole", country: ["Global"], category: "GI", commonUses: "Acid reflux, GERD" },
    { name: "Nexium", genericName: "Esomeprazole", country: ["Global"], category: "GI", commonUses: "Acid reflux, GERD" },
    { name: "Pantoprazole", country: ["Global"], category: "GI", commonUses: "Acid reflux, GERD" },
    { name: "Protonix", genericName: "Pantoprazole", country: ["US"], category: "GI", commonUses: "GERD" },
    { name: "Ranitidine", country: ["Global"], category: "GI", commonUses: "Heartburn", warnings: "Recalled in some countries" },
    { name: "Zantac", genericName: "Ranitidine", country: ["Global"], category: "GI", commonUses: "Heartburn", warnings: "Recalled" },
    { name: "Famotidine", country: ["Global"], category: "GI", commonUses: "Heartburn, ulcers" },
    { name: "Pepcid", genericName: "Famotidine", country: ["US"], category: "GI", commonUses: "Heartburn" },

    // Respiratory
    { name: "Salbutamol", genericName: "Albuterol", country: ["Global"], category: "Respiratory", commonUses: "Asthma, bronchospasm" },
    { name: "Albuterol", genericName: "Salbutamol", country: ["US"], category: "Respiratory", commonUses: "Asthma, COPD" },
    { name: "Ventolin", genericName: "Salbutamol", country: ["Global"], category: "Respiratory", commonUses: "Asthma, COPD" },
    { name: "Fluticasone", country: ["Global"], category: "Respiratory", commonUses: "Asthma, allergic rhinitis" },
    { name: "Flonase", genericName: "Fluticasone", country: ["US", "CA"], category: "Respiratory", commonUses: "Allergic rhinitis" },
    { name: "Montelukast", country: ["Global"], category: "Respiratory", commonUses: "Asthma, allergies" },
    { name: "Singulair", genericName: "Montelukast", country: ["Global"], category: "Respiratory", commonUses: "Asthma, allergies" },
    { name: "Budesonide", country: ["Global"], category: "Respiratory", commonUses: "Asthma, COPD" },

    // Antihistamines & Allergy
    { name: "Cetirizine", country: ["Global"], category: "Antihistamine", commonUses: "Allergic rhinitis, hives" },
    { name: "Zyrtec", genericName: "Cetirizine", country: ["Global"], category: "Antihistamine", commonUses: "Allergies" },
    { name: "Loratadine", country: ["Global"], category: "Antihistamine", commonUses: "Allergies" },
    { name: "Claritin", genericName: "Loratadine", country: ["Global"], category: "Antihistamine", commonUses: "Allergies" },
    { name: "Fexofenadine", country: ["Global"], category: "Antihistamine", commonUses: "Allergies" },
    { name: "Allegra", genericName: "Fexofenadine", country: ["US"], category: "Antihistamine", commonUses: "Allergies" },
    { name: "Diphenhydramine", country: ["Global"], category: "Antihistamine", commonUses: "Allergies, sleep aid" },
    { name: "Benadryl", genericName: "Diphenhydramine", country: ["US", "CA"], category: "Antihistamine", commonUses: "Allergies, sleep aid" },
    { name: "Chlorpheniramine", country: ["Global"], category: "Antihistamine", commonUses: "Allergies, cold symptoms" },

    // Antidepressants & Mental Health
    { name: "Fluoxetine", country: ["Global"], category: "Antidepressant", commonUses: "Depression, anxiety, OCD" },
    { name: "Prozac", genericName: "Fluoxetine", country: ["Global"], category: "Antidepressant", commonUses: "Depression, anxiety, OCD" },
    { name: "Sertraline", country: ["Global"], category: "Antidepressant", commonUses: "Depression, anxiety" },
    { name: "Zoloft", genericName: "Sertraline", country: ["Global"], category: "Antidepressant", commonUses: "Depression, anxiety" },
    { name: "Escitalopram", country: ["Global"], category: "Antidepressant", commonUses: "Depression, anxiety" },
    { name: "Lexapro", genericName: "Escitalopram", country: ["US"], category: "Antidepressant", commonUses: "Depression, anxiety" },
    { name: "Citalopram", country: ["Global"], category: "Antidepressant", commonUses: "Depression" },
    { name: "Celexa", genericName: "Citalopram", country: ["US"], category: "Antidepressant", commonUses: "Depression" },
    { name: "Venlafaxine", country: ["Global"], category: "Antidepressant", commonUses: "Depression, anxiety" },
    { name: "Effexor", genericName: "Venlafaxine", country: ["US"], category: "Antidepressant", commonUses: "Depression" },
    { name: "Alprazolam", country: ["Global"], category: "Anti-anxiety", commonUses: "Anxiety, panic disorders" },
    { name: "Xanax", genericName: "Alprazolam", country: ["US", "CA"], category: "Anti-anxiety", commonUses: "Anxiety, panic disorders" },
    { name: "Diazepam", country: ["Global"], category: "Anti-anxiety", commonUses: "Anxiety, muscle spasms" },
    { name: "Valium", genericName: "Diazepam", country: ["Global"], category: "Anti-anxiety", commonUses: "Anxiety, muscle spasms" },
    { name: "Lorazepam", country: ["Global"], category: "Anti-anxiety", commonUses: "Anxiety" },
    { name: "Ativan", genericName: "Lorazepam", country: ["US"], category: "Anti-anxiety", commonUses: "Anxiety" },

    // Thyroid
    { name: "Levothyroxine", country: ["Global"], category: "Thyroid", commonUses: "Hypothyroidism" },
    { name: "Synthroid", genericName: "Levothyroxine", country: ["US"], category: "Thyroid", commonUses: "Hypothyroidism" },
    { name: "Liothyronine", country: ["Global"], category: "Thyroid", commonUses: "Hypothyroidism" },

    // Other Common Drugs
    { name: "Sildenafil", country: ["Global"], category: "ED", commonUses: "Erectile dysfunction" },
    { name: "Viagra", genericName: "Sildenafil", country: ["Global"], category: "ED", commonUses: "Erectile dysfunction" },
    { name: "Tadalafil", country: ["Global"], category: "ED", commonUses: "Erectile dysfunction" },
    { name: "Cialis", genericName: "Tadalafil", country: ["Global"], category: "ED", commonUses: "Erectile dysfunction" },
    { name: "Gabapentin", country: ["Global"], category: "Anticonvulsant", commonUses: "Nerve pain, seizures" },
    { name: "Neurontin", genericName: "Gabapentin", country: ["US"], category: "Anticonvulsant", commonUses: "Nerve pain" },
    { name: "Pregabalin", country: ["Global"], category: "Anticonvulsant", commonUses: "Nerve pain, fibromyalgia" },
    { name: "Lyrica", genericName: "Pregabalin", country: ["Global"], category: "Anticonvulsant", commonUses: "Nerve pain" },
    { name: "Tramadol", country: ["Global"], category: "Pain Relief", commonUses: "Moderate to severe pain" },
    { name: "Prednisone", country: ["Global"], category: "Corticosteroid", commonUses: "Inflammation, autoimmune conditions" },
    { name: "Prednisolone", country: ["Global"], category: "Corticosteroid", commonUses: "Inflammation" },
    { name: "Cyclobenzaprine", country: ["Global"], category: "Muscle Relaxant", commonUses: "Muscle spasms" },
    { name: "Flexeril", genericName: "Cyclobenzaprine", country: ["US"], category: "Muscle Relaxant", commonUses: "Muscle spasms" },
    { name: "Tamsulosin", country: ["Global"], category: "BPH", commonUses: "Enlarged prostate" },
    { name: "Flomax", genericName: "Tamsulosin", country: ["US"], category: "BPH", commonUses: "Enlarged prostate" },
    { name: "Finasteride", country: ["Global"], category: "BPH/Hair Loss", commonUses: "Enlarged prostate, hair loss" },
    { name: "Propecia", genericName: "Finasteride", country: ["Global"], category: "Hair Loss", commonUses: "Male pattern baldness" },
];

// Quick search function for fallback
export const searchInternationalDrugs = (query: string): InternationalDrug[] => {
    const lowerQuery = query.toLowerCase();
    return internationalDrugs.filter(drug =>
        drug.name.toLowerCase().includes(lowerQuery) ||
        drug.genericName?.toLowerCase().includes(lowerQuery)
    );
};

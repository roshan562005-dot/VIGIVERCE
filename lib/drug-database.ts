import { searchInternationalDrugs, InternationalDrug } from './international-drugs';

export interface DrugInfo {
    id: string;
    name: string;
    genericName?: string;
    description: string;
    uses: string;
    sideEffects?: string;
    warnings?: string;
    source: 'openfda' | 'rxnorm' | 'local';
}

// Search OpenFDA with improved generic name matching
async function searchOpenFDA(query: string): Promise<DrugInfo[]> {
    try {
        // Use wildcards for better matching of both brand and generic names
        const searchQuery = `(openfda.brand_name:*${query}* OR openfda.generic_name:*${query}*)`;
        const response = await fetch(
            `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(searchQuery)}&limit=10`
        );

        if (!response.ok) return [];

        const data = await response.json();
        return data.results?.map((result: any) => ({
            id: result.id || Math.random().toString(),
            name: result.openfda?.brand_name?.[0] || result.openfda?.generic_name?.[0] || query,
            genericName: result.openfda?.generic_name?.[0],
            description: result.description?.[0] || result.purpose?.[0] || 'FDA-approved medication',
            uses: result.indications_and_usage?.[0] || result.purpose?.[0] || 'See label for indications',
            sideEffects: result.adverse_reactions?.[0] || 'See label for side effects',
            warnings: result.warnings?.[0] || result.boxed_warning?.[0],
            source: 'openfda' as const
        })) || [];
    } catch (error) {
        console.error('OpenFDA search error:', error);
        return [];
    }
}

// Search RxNorm (NIH) - excellent for generic names
async function searchRxNorm(query: string): Promise<DrugInfo[]> {
    try {
        const response = await fetch(
            `https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${encodeURIComponent(query)}&maxEntries=10`
        );

        if (!response.ok) return [];

        const data = await response.json();
        const candidates = data.approximateGroup?.candidate || [];

        return candidates.slice(0, 10).map((candidate: any) => ({
            id: candidate.rxcui || Math.random().toString(),
            name: candidate.name,
            genericName: candidate.name, // RxNorm primarily uses generic names
            description: `${candidate.name} - RxNorm ID: ${candidate.rxcui}`,
            uses: 'Consult healthcare provider for specific uses',
            sideEffects: 'Consult healthcare provider for side effects',
            source: 'rxnorm' as const
        }));
    } catch (error) {
        console.error('RxNorm search error:', error);
        return [];
    }
}

// Search local international database
function searchLocal(query: string): DrugInfo[] {
    const results = searchInternationalDrugs(query);

    return results.map((drug: InternationalDrug) => ({
        id: drug.name.toLowerCase().replace(/\s/g, '-'),
        name: drug.name,
        genericName: drug.genericName,
        description: `${drug.name}${drug.genericName ? ` (${drug.genericName})` : ''} - Available in ${drug.country.join(', ')}`,
        uses: drug.commonUses,
        sideEffects: 'Consult healthcare provider for complete side effect information',
        warnings: drug.warnings,
        source: 'local' as const
    }));
}

// Main search function - cascading through all sources
export async function searchDrugs(query: string): Promise<DrugInfo[]> {
    if (!query || query.length < 2) return [];

    // Try all sources in parallel for speed
    const [fdaResults, rxnormResults, localResults] = await Promise.all([
        searchOpenFDA(query),
        searchRxNorm(query),
        Promise.resolve(searchLocal(query))
    ]);

    // Combine all results
    const allResults = [...fdaResults, ...rxnormResults, ...localResults];

    // Remove duplicates based on name similarity with robust null-checks
    const uniqueResults = allResults.filter((drug, index, self) => {
        if (!drug || !drug.name) return false;
        
        return index === self.findIndex(d => {
            if (!d || !d.name) return false;
            
            const nameMatch = d.name.toLowerCase() === drug.name.toLowerCase();
            const genericMatch = (d.genericName && drug.genericName &&
                d.genericName.toLowerCase() === drug.genericName.toLowerCase());
                
            return nameMatch || genericMatch;
        });
    });

    return uniqueResults.slice(0, 20); // Limit to 20 results
}

// Get detailed drug info
export async function getDrugDetails(drugName: string): Promise<DrugInfo | null> {
    const results = await searchDrugs(drugName);
    return results[0] || null;
}

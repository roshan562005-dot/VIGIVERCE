/**
 * VigiVerse Demo Data Seed Script
 * Run with: npx ts-node --project tsconfig.json scripts/seed-demo-data.ts
 *
 * This script populates the Supabase `profiles` and `reports` tables
 * with realistic mock data to make the app look active for demos.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wkdrenitnppsedwqotat.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZHRlbml0bnBwc2Vkd3FvdGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY4ODAsImV4cCI6MjA4ODg5Mjg4MH0.hzxvvOwx9pMGQjjrjpyw9QgxOR3xbU-7zr6531rPAPg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── MOCK PROFILES ──────────────────────────────────────────────────────────────
// These use fake UUIDs to avoid auth collisions. They are purely for display.
const mockProfiles = [
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000001',
    full_name: 'Dr. Amara Osei',
    points: 2450,
    badges: ['💎 Platinum', '🥇 Gold', '🥈 Silver', '⭐ Rising Star'],
    report_count: 18,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000002',
    full_name: 'Priya Ramachandran',
    points: 1820,
    badges: ['🥇 Gold', '🥈 Silver', '⭐ Rising Star'],
    report_count: 14,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000003',
    full_name: 'Kenji Nakamura',
    points: 1350,
    badges: ['🥈 Silver', '⭐ Rising Star'],
    report_count: 10,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000004',
    full_name: 'Sofia Esposito',
    points: 980,
    badges: ['⭐ Rising Star'],
    report_count: 7,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000005',
    full_name: 'Marcus Webb',
    points: 760,
    badges: ['⭐ Rising Star'],
    report_count: 6,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000006',
    full_name: 'Aisha Khalid',
    points: 520,
    badges: ['⭐ Rising Star'],
    report_count: 4,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000007',
    full_name: 'Liam Fitzgerald',
    points: 350,
    badges: [],
    report_count: 3,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000008',
    full_name: 'Yuna Park',
    points: 220,
    badges: [],
    report_count: 2,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000009',
    full_name: 'Carlos Mendez',
    points: 110,
    badges: [],
    report_count: 1,
  },
  {
    id: 'a1b2c3d4-0001-0001-0001-000000000010',
    full_name: 'Elena Volkov',
    points: 50,
    badges: [],
    report_count: 1,
  },
];

// ── MOCK REPORTS ──────────────────────────────────────────────────────────────
const mockReports = [
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000001',
    drug_name: 'Warfarin',
    batch_number: 'WF-23401A',
    symptoms: 'Heavy bruising after minor impact; gum bleeding when brushing teeth',
    severity: 'High',
    date_of_onset: '2026-02-15',
    ai_score: 94,
    ai_feedback: ['Classic symptoms of Warfarin over-anticoagulation.', 'Check INR immediately.', 'Interaction with recent Aspirin ingestion detected.'],
    status: 'Verified',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000001',
    drug_name: 'Lisinopril',
    batch_number: 'LS-90122',
    symptoms: 'Persistent dry cough for three weeks, worsening at night; throat irritation',
    severity: 'Medium',
    date_of_onset: '2026-01-28',
    ai_score: 91,
    ai_feedback: ['ACE inhibitor-induced cough - a well-documented class effect.', 'Cough resolves within 1-4 weeks of cessation.', 'Consider switching to an ARB.'],
    status: 'Verified',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000002',
    drug_name: 'Metformin',
    batch_number: 'MF-48811B',
    symptoms: 'Severe nausea, vomiting, and diarrhea starting 2 days after dose increase to 2000mg',
    severity: 'Medium',
    date_of_onset: '2026-03-01',
    ai_score: 87,
    ai_feedback: ['GI side effects are the most common reaction to Metformin, especially at higher doses.', 'Extended-release formulation may reduce severity.'],
    status: 'Verified',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000002',
    drug_name: 'Ibuprofen',
    batch_number: null,
    symptoms: 'Upper GI pain and dark stools after taking OTC dose for 5 consecutive days',
    severity: 'High',
    date_of_onset: '2026-02-20',
    ai_score: 89,
    ai_feedback: ['Potential NSAID-induced GI bleed. Urgent medical evaluation required.', 'Dark stools indicate possible upper GI bleeding.'],
    status: 'Investigating',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000003',
    drug_name: 'Amoxicillin',
    batch_number: 'AX-66501',
    symptoms: 'Widespread maculopapular rash 3 days after starting course for tonsillitis',
    severity: 'Medium',
    date_of_onset: '2026-03-05',
    ai_score: 85,
    ai_feedback: ['Drug hypersensitivity reaction pattern detected.', 'Stop medication and consult prescriber immediately.'],
    status: 'Verified',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000004',
    drug_name: 'Atorvastatin',
    batch_number: 'AT-30091',
    symptoms: 'Significant muscle pain and weakness in both legs after 8 weeks on 40mg dose',
    severity: 'High',
    date_of_onset: '2026-02-10',
    ai_score: 92,
    ai_feedback: ['Possible statin-induced myopathy. Check CK levels urgently.', 'Risk is dose-dependent and increased by concomitant use of CYP3A4 inhibitors.'],
    status: 'Investigating',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000005',
    drug_name: 'Sertraline',
    batch_number: 'SR-12222',
    symptoms: 'Excessive sweating, tremors, and confusion 3 days after dose was increased to 150mg',
    severity: 'High',
    date_of_onset: '2026-03-08',
    ai_score: 88,
    ai_feedback: ['Possible Serotonin Syndrome. This is a medical emergency.', 'Symptoms of diaphoresis, tremor and confusion form the classic triad.'],
    status: 'Pending',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000006',
    drug_name: 'Omeprazole',
    batch_number: 'OM-99811',
    symptoms: 'Severe headache occurring daily after 4 weeks of use; no prior history of headaches',
    severity: 'Low',
    date_of_onset: '2026-03-01',
    ai_score: 68,
    ai_feedback: ['Headache is a less common side effect of proton pump inhibitors.', 'Low causal certainty - advise patient diary.'],
    status: 'Pending',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000007',
    drug_name: 'Cetirizine',
    batch_number: null,
    symptoms: 'Extreme daytime drowsiness interfering with work; reaction started within an hour of first dose',
    severity: 'Low',
    date_of_onset: '2026-03-10',
    ai_score: 72,
    ai_feedback: ['Sedation is a known side effect of first-generation antihistamines.', 'May be dose-dependent. Consider taking dose at night.'],
    status: 'Pending',
  },
  {
    user_id: 'a1b2c3d4-0001-0001-0001-000000000008',
    drug_name: 'Levothyroxine',
    batch_number: 'LV-55512',
    symptoms: 'Heart palpitations and increased anxiety after dose was changed from 50mcg to 75mcg',
    severity: 'Medium',
    date_of_onset: '2026-03-12',
    ai_score: 81,
    ai_feedback: ['Symptoms consistent with relative hyperthyroidism from dose increase.', 'TSH recheck recommended in 6-8 weeks.'],
    status: 'Pending',
  },
];

async function seed() {
  console.log('🌱 Seeding VigiVerse demo data...\n');

  // 1. Upsert profiles
  console.log('📋 Upserting mock profiles...');
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(
      mockProfiles.map(p => ({
        id: p.id,
        full_name: p.full_name,
        points: p.points,
        badges: p.badges,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: 'id' }
    );

  if (profileError) {
    console.error('❌ Error inserting profiles:', profileError.message);
  } else {
    console.log(`✅ Inserted ${mockProfiles.length} mock profiles.`);
  }

  // 2. Insert reports (use insert — avoid duplicates by checking first)
  console.log('\n📊 Inserting mock ADR reports...');
  
  // Delete old seed reports first to avoid duplicates on re-run
  await supabase
    .from('reports')
    .delete()
    .in('user_id', mockProfiles.map(p => p.id));

  const { error: reportsError } = await supabase
    .from('reports')
    .insert(
      mockReports.map(r => ({
        ...r,
        batch_number: r.batch_number ?? undefined,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // random within last 30 days
      }))
    );

  if (reportsError) {
    console.error('❌ Error inserting reports:', reportsError.message);
  } else {
    console.log(`✅ Inserted ${mockReports.length} mock ADR reports.`);
  }

  console.log('\n🎉 Database seeding complete! Your app is now demo-ready.');
}

seed().catch(console.error);

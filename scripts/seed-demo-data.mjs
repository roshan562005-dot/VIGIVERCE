// VigiVerse Demo Data Seed Script (plain JS/ESM for Node.js)
// Run with: node scripts/seed-demo-data.mjs

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wkdrenitnppsedwqotat.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZHRlbml0bnBwc2Vkd3FvdGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY4ODAsImV4cCI6MjA4ODg5Mjg4MH0.hzxvvOwx9pMGQjjrjpyw9QgxOR3xbU-7zr6531rPAPg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const mockProfiles = [
  { id: 'a1b2c3d4-0001-0001-0001-000000000001', full_name: 'Dr. Amara Osei',       points: 2450, badges: ['💎 Platinum','🥇 Gold','🥈 Silver','⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000002', full_name: 'Priya Ramachandran',    points: 1820, badges: ['🥇 Gold','🥈 Silver','⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000003', full_name: 'Kenji Nakamura',        points: 1350, badges: ['🥈 Silver','⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000004', full_name: 'Sofia Esposito',        points: 980,  badges: ['⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000005', full_name: 'Marcus Webb',           points: 760,  badges: ['⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000006', full_name: 'Aisha Khalid',          points: 520,  badges: ['⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000007', full_name: 'Liam Fitzgerald',       points: 350,  badges: [] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000008', full_name: 'Yuna Park',             points: 220,  badges: [] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000009', full_name: 'Carlos Mendez',         points: 110,  badges: [] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000010', full_name: 'Elena Volkov',          points: 50,   badges: [] },
];

const randomDate = () => new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();

const mockReports = [
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000001', drug_name: 'Warfarin',       batch_number: 'WF-23401A', symptoms: 'Heavy bruising after minor impact; gum bleeding when brushing teeth',           severity: 'High',   date_of_onset: '2026-02-15', ai_score: 94, ai_feedback: ['Classic Warfarin over-anticoagulation. Check INR immediately.','Interaction with Aspirin detected.'], status: 'Verified' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000001', drug_name: 'Lisinopril',     batch_number: 'LS-90122',  symptoms: 'Persistent dry cough for 3 weeks, worsening at night',                          severity: 'Medium', date_of_onset: '2026-01-28', ai_score: 91, ai_feedback: ['ACE inhibitor-induced cough — well documented.','Consider switching to an ARB.'], status: 'Verified' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000002', drug_name: 'Metformin',      batch_number: 'MF-48811B', symptoms: 'Severe nausea, vomiting, and diarrhea after dose increase to 2000mg',           severity: 'Medium', date_of_onset: '2026-03-01', ai_score: 87, ai_feedback: ['GI effects common with Metformin at higher doses.','Extended-release may reduce severity.'], status: 'Verified' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000002', drug_name: 'Ibuprofen',      batch_number: null,        symptoms: 'Upper GI pain and dark stools after 5 days of use',                             severity: 'High',   date_of_onset: '2026-02-20', ai_score: 89, ai_feedback: ['Potential NSAID-induced GI bleed. Urgent evaluation required.'], status: 'Investigating' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000003', drug_name: 'Amoxicillin',    batch_number: 'AX-66501',  symptoms: 'Widespread maculopapular rash 3 days after starting antibiotic course',          severity: 'Medium', date_of_onset: '2026-03-05', ai_score: 85, ai_feedback: ['Drug hypersensitivity reaction. Stop medication immediately.'], status: 'Verified' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000004', drug_name: 'Atorvastatin',   batch_number: 'AT-30091',  symptoms: 'Significant muscle pain and weakness in both legs after 8 weeks on 40mg',        severity: 'High',   date_of_onset: '2026-02-10', ai_score: 92, ai_feedback: ['Possible statin-induced myopathy. Check CK levels urgently.'], status: 'Investigating' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000005', drug_name: 'Sertraline',     batch_number: 'SR-12222',  symptoms: 'Excessive sweating, tremors, and confusion 3 days after dose increase',          severity: 'High',   date_of_onset: '2026-03-08', ai_score: 88, ai_feedback: ['Possible Serotonin Syndrome. This is a medical emergency.'], status: 'Pending' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000006', drug_name: 'Omeprazole',     batch_number: 'OM-99811',  symptoms: 'Severe headache occurring daily after 4 weeks of use',                          severity: 'Low',    date_of_onset: '2026-03-01', ai_score: 68, ai_feedback: ['Less common PPI side effect. Low causal certainty.'], status: 'Pending' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000007', drug_name: 'Cetirizine',     batch_number: null,        symptoms: 'Extreme daytime drowsiness interfering with work; started within 1 hour',       severity: 'Low',    date_of_onset: '2026-03-10', ai_score: 72, ai_feedback: ['Sedation is a known side effect. Consider taking dose at night.'], status: 'Pending' },
  { user_id: 'a1b2c3d4-0001-0001-0001-000000000008', drug_name: 'Levothyroxine',  batch_number: 'LV-55512',  symptoms: 'Heart palpitations and increased anxiety after dose change from 50mcg to 75mcg', severity: 'Medium', date_of_onset: '2026-03-12', ai_score: 81, ai_feedback: ['Relative hyperthyroidism from dose increase. TSH recheck recommended.'], status: 'Pending' },
];

async function seed() {
  console.log('🌱 Seeding VigiVerse demo data...\n');

  console.log('📋 Upserting mock profiles...');
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert(
      mockProfiles.map(p => ({ ...p, updated_at: new Date().toISOString() })),
      { onConflict: 'id' }
    );
  if (profileError) console.error('❌ Profile error:', profileError.message);
  else console.log(`✅ ${mockProfiles.length} profiles upserted.`);

  console.log('\n📊 Cleaning old seed reports...');
  await supabase.from('reports').delete().in('user_id', mockProfiles.map(p => p.id));

  console.log('📊 Inserting new mock ADR reports...');
  const { error: reportsError } = await supabase
    .from('reports')
    .insert(mockReports.map(r => ({ ...r, created_at: randomDate() })));
  if (reportsError) console.error('❌ Reports error:', reportsError.message);
  else console.log(`✅ ${mockReports.length} ADR reports inserted.`);

  console.log('\n🎉 Database seeding complete! Your app is now demo-ready.');
}

seed().catch(console.error);

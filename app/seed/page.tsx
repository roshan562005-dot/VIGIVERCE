"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, XCircle, Database } from "lucide-react";
import { supabase } from "@/lib/supabase";

const mockProfiles = [
  { id: 'a1b2c3d4-0001-0001-0001-000000000001', full_name: 'Dr. Amara Osei',       points: 2450, badges: ['💎 Platinum','🥇 Gold','🥈 Silver','⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000002', full_name: 'Priya Ramachandran',   points: 1820, badges: ['🥇 Gold','🥈 Silver','⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000003', full_name: 'Kenji Nakamura',       points: 1350, badges: ['🥈 Silver','⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000004', full_name: 'Sofia Esposito',       points: 980,  badges: ['⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000005', full_name: 'Marcus Webb',          points: 760,  badges: ['⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000006', full_name: 'Aisha Khalid',         points: 520,  badges: ['⭐ Rising Star'] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000007', full_name: 'Liam Fitzgerald',      points: 350,  badges: [] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000008', full_name: 'Yuna Park',            points: 220,  badges: [] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000009', full_name: 'Carlos Mendez',        points: 110,  badges: [] },
  { id: 'a1b2c3d4-0001-0001-0001-000000000010', full_name: 'Elena Volkov',         points: 50,   badges: [] },
];

// Reports will be inserted under the CURRENT authenticated user's ID so RLS is satisfied.
// Their drug names and AI scores are still totally realistic/demo-worthy.
const mockReportTemplates = [
  { drug_name: 'Warfarin',       batch_number: 'WF-23401A', symptoms: 'Heavy bruising after minor impact; gum bleeding when brushing teeth',           severity: 'High',   date_of_onset: '2026-02-15', ai_score: 94, ai_feedback: ['Classic Warfarin over-anticoagulation. Check INR immediately.','Interaction with Aspirin detected.'], status: 'Verified'       },
  { drug_name: 'Lisinopril',     batch_number: 'LS-90122',  symptoms: 'Persistent dry cough for 3 weeks, worsening at night',                          severity: 'Medium', date_of_onset: '2026-01-28', ai_score: 91, ai_feedback: ['ACE inhibitor-induced cough — well documented.','Consider switching to an ARB.'], status: 'Verified'       },
  { drug_name: 'Metformin',      batch_number: 'MF-48811B', symptoms: 'Severe nausea, vomiting and diarrhea after dose increase to 2000mg',            severity: 'Medium', date_of_onset: '2026-03-01', ai_score: 87, ai_feedback: ['GI effects common with Metformin at higher doses.'], status: 'Verified'       },
  { drug_name: 'Ibuprofen',      batch_number: undefined,   symptoms: 'Upper GI pain and dark stools after 5 days of use',                             severity: 'High',   date_of_onset: '2026-02-20', ai_score: 89, ai_feedback: ['Potential NSAID-induced GI bleed. Urgent evaluation required.'], status: 'Investigating' },
  { drug_name: 'Amoxicillin',    batch_number: 'AX-66501',  symptoms: 'Widespread maculopapular rash 3 days after starting antibiotic course',          severity: 'Medium', date_of_onset: '2026-03-05', ai_score: 85, ai_feedback: ['Drug hypersensitivity reaction. Stop medication immediately.'], status: 'Verified'       },
  { drug_name: 'Atorvastatin',   batch_number: 'AT-30091',  symptoms: 'Significant muscle pain and weakness in both legs after 8 weeks on 40mg',        severity: 'High',   date_of_onset: '2026-02-10', ai_score: 92, ai_feedback: ['Possible statin-induced myopathy. Check CK levels urgently.'], status: 'Investigating' },
  { drug_name: 'Sertraline',     batch_number: 'SR-12222',  symptoms: 'Excessive sweating, tremors, and confusion 3 days after dose increase',          severity: 'High',   date_of_onset: '2026-03-08', ai_score: 88, ai_feedback: ['Possible Serotonin Syndrome. This is a medical emergency.'], status: 'Pending'        },
  { drug_name: 'Omeprazole',     batch_number: 'OM-99811',  symptoms: 'Severe headache occurring daily after 4 weeks of use',                           severity: 'Low',    date_of_onset: '2026-03-01', ai_score: 68, ai_feedback: ['Less common PPI side effect.'], status: 'Pending'        },
  { drug_name: 'Cetirizine',     batch_number: undefined,   symptoms: 'Extreme daytime drowsiness; started within 1 hour of first dose',               severity: 'Low',    date_of_onset: '2026-03-10', ai_score: 72, ai_feedback: ['Sedation is a known side effect. Consider taking at night.'], status: 'Pending'        },
  { drug_name: 'Levothyroxine',  batch_number: 'LV-55512',  symptoms: 'Heart palpitations and increased anxiety after dose change to 75mcg',           severity: 'Medium', date_of_onset: '2026-03-12', ai_score: 81, ai_feedback: ['Relative hyperthyroidism from dose increase. TSH recheck recommended.'], status: 'Pending' },
];

export default function SeedPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState<{ msg: string; ok: boolean }[]>([]);
  const [done, setDone] = useState(false);

  const addLog = (msg: string, ok = true) => setLog(prev => [...prev, { msg, ok }]);

  const runSeed = async () => {
    setIsRunning(true);
    setLog([]);
    setDone(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      addLog('Not authenticated. Please log in first.', false);
      setIsRunning(false);
      return;
    }

    // 1. Upsert mock profiles (no RLS issue — just a profile row, no auth constraint)
    addLog('Upserting 10 mock leaderboard profiles...');
    const { error: profileErr } = await supabase
      .from('profiles')
      .upsert(
        mockProfiles.map(p => ({ ...p, updated_at: new Date().toISOString() })),
        { onConflict: 'id' }
      );
    if (profileErr) addLog(`Profile error: ${profileErr.message}`, false);
    else addLog('✅ 10 leaderboard profiles loaded.');

    // 2. Delete any old seed reports by this user to avoid duplicates
    addLog('Clearing existing demo reports...');
    await supabase.from('reports').delete().eq('user_id', user.id);

    // 3. Insert reports under real user's ID (satisfies RLS)
    addLog('Inserting 10 realistic ADR reports...');
    const randomDate = () => new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();

    const { error: reportErr } = await supabase
      .from('reports')
      .insert(
        mockReportTemplates.map(r => ({
          user_id: user.id,
          drug_name: r.drug_name,
          batch_number: r.batch_number ?? null,
          symptoms: r.symptoms,
          severity: r.severity,
          date_of_onset: r.date_of_onset,
          ai_score: r.ai_score,
          ai_feedback: r.ai_feedback,
          status: r.status,
          created_at: randomDate(),
        }))
      );

    if (reportErr) addLog(`Report error: ${reportErr.message}`, false);
    else addLog('✅ 10 ADR reports inserted.');

    addLog('🎉 Database is now demo-ready!');
    setDone(true);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <Card className="w-full max-w-xl border-2 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Database className="h-7 w-7" />
            VigiVerse Demo Data Seeder
          </CardTitle>
          <p className="text-blue-100 text-sm">Populates the database with realistic users and ADR reports for your presentation.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {!isRunning && !done && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">This will:</p>
              <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                <li>Insert <strong>10 mock leaderboard profiles</strong> (Dr. Amara Osei, Kenji Nakamura, etc.)</li>
                <li>Insert <strong>10 realistic ADR reports</strong> (Warfarin, Sertraline, Metformin, etc.)</li>
              </ul>
              <Button
                onClick={runSeed}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mt-4 text-white"
                size="lg"
              >
                <Database className="mr-2 h-5 w-5" />
                Seed Demo Data Now
              </Button>
            </div>
          )}

          {isRunning && (
            <div className="flex items-center gap-3 text-blue-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-medium">Seeding…</span>
            </div>
          )}

          {log.length > 0 && (
            <div className="space-y-1 mt-4 font-mono text-sm bg-muted/50 rounded-xl p-4 border">
              {log.map((l, i) => (
                <div key={i} className={`flex items-center gap-2 ${l.ok ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                  {l.ok ? <CheckCircle className="h-4 w-4 flex-shrink-0" /> : <XCircle className="h-4 w-4 flex-shrink-0" />}
                  <span>{l.msg}</span>
                </div>
              ))}
            </div>
          )}

          {done && (
            <div className="space-y-3 mt-4">
              <Button asChild variant="outline" className="w-full" size="lg">
                <a href="/dashboard/leaderboard">→ View Leaderboard</a>
              </Button>
              <Button asChild className="w-full" size="lg">
                <a href="/dashboard/admin">→ View Admin Dashboard</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

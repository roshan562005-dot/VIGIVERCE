export default function HealthCheck() {
    return (
        <div className="flex h-screen items-center justify-center font-mono">
            <div className="p-8 border-2 border-green-500 rounded-xl bg-green-50 text-green-700">
                <h1 className="text-2xl font-bold mb-2">DEPLOYMENT SUCCESSFUL</h1>
                <p>Version: SEC_GATE_V2_PROD</p>
                <p>Status: Gate Active</p>
                <p>Time: {new Date().toISOString()}</p>
            </div>
        </div>
    );
}

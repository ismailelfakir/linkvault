import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-sm">LV</span>
        </div>
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
        <p className="text-gray-600 dark:text-gray-400">Loading LinkVault...</p>
      </div>
    </div>
  );
}
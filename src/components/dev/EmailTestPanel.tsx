'use client';

import { useState } from 'react';
import { EmailTestUtils } from '@/utils/emailTest';

/**
 * Development-only component for testing EmailJS integration
 * Only renders in development mode
 */
interface EmailTestPanelProps {
  onClose?: () => void;
}

export function EmailTestPanel({ onClose }: EmailTestPanelProps = {}) {
  const [testResults, setTestResults] = useState<{
    type: string;
    result: unknown;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Only render in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const runConfigTest = async () => {
    setIsLoading(true);
    try {
      const result = await EmailTestUtils.testEmailConfiguration();
      setTestResults({ type: 'config', result });
    } catch (error) {
      setTestResults({
        type: 'config',
        result: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const runEmailTest = async () => {
    setIsLoading(true);
    try {
      const result = await EmailTestUtils.sendTestEmail();
      setTestResults({ type: 'email', result });
    } catch (error) {
      setTestResults({
        type: 'email',
        result: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getConfigStatus = () => {
    const status = EmailTestUtils.getConfigurationStatus();
    setTestResults({ type: 'status', result: status });
  };

  const clearResults = () => {
    setTestResults(null);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          EmailJS Test Panel
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            DEV
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              title="Close panel (Ctrl+Shift+E)"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={getConfigStatus}
          disabled={isLoading}
          className="w-full text-xs bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Check Config
        </button>

        <button
          onClick={runConfigTest}
          disabled={isLoading}
          className="w-full text-xs bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Connection
        </button>

        <button
          onClick={runEmailTest}
          disabled={isLoading}
          className="w-full text-xs bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Send Test Email
        </button>

        {testResults && (
          <button
            onClick={clearResults}
            className="w-full text-xs bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
          >
            Clear Results
          </button>
        )}
      </div>

      {isLoading && (
        <div className="mt-3 text-xs text-gray-600 flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Testing...
        </div>
      )}

      {testResults && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs">
          <div className="font-medium text-gray-900 mb-1">
            {testResults.type === 'config' && 'Configuration Test'}
            {testResults.type === 'email' && 'Email Test'}
            {testResults.type === 'status' && 'Configuration Status'}
          </div>
          <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-auto max-h-32">
            {JSON.stringify(testResults.result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

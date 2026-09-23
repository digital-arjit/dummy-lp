/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  ExternalLink,
  Check,
  Plus,
  Link as LinkIcon,
  LogOut,
  Loader2,
  ChevronDown,
  X,
} from 'lucide-react';
import { googleSignIn, googleSignOut, getAccessToken, initAuth } from '../../services/googleAuth';
import {
  createInquiriesSpreadsheet,
  getSpreadsheetDetails,
  extractSpreadsheetId,
} from '../../services/googleSheets';

interface GoogleSheetSyncBarProps {
  onSpreadsheetConnected: (sheet: { id: string; title: string; url: string } | null) => void;
  connectedSheet: { id: string; title: string; url: string } | null;
}

const STORAGE_KEY_SHEET_ID = 'ff_connected_sheet_id';
const STORAGE_KEY_SHEET_TITLE = 'ff_connected_sheet_title';

export const GoogleSheetSyncBar: React.FC<GoogleSheetSyncBarProps> = ({
  onSpreadsheetConnected,
  connectedSheet,
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [customSheetInput, setCustomSheetInput] = useState('');
  const [configError, setConfigError] = useState<string | null>(null);

  // Check saved sheet configuration from local storage on mount
  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_KEY_SHEET_ID);
    const savedTitle = localStorage.getItem(STORAGE_KEY_SHEET_TITLE);
    if (savedId) {
      onSpreadsheetConnected({
        id: savedId,
        title: savedTitle || 'Wedding Inquiries Spreadsheet',
        url: `https://docs.google.com/spreadsheets/d/${savedId}/edit`,
      });
    }

    const unsubscribe = initAuth(
      (user) => setCurrentUser(user),
      () => setCurrentUser(null)
    );
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setConfigError(null);
    try {
      const res = await googleSignIn();
      setCurrentUser(res.user);
      setShowConfigModal(true);
    } catch (err: any) {
      console.error('Sign in error', err);
      setConfigError(err?.message || 'Google sign-in was cancelled or failed.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleCreateNewSheet = async () => {
    setIsCreatingSheet(true);
    setConfigError(null);
    try {
      let token = await getAccessToken();
      if (!token) {
        const res = await googleSignIn();
        token = res.accessToken;
        setCurrentUser(res.user);
      }

      const newSheet = await createInquiriesSpreadsheet(token);
      localStorage.setItem(STORAGE_KEY_SHEET_ID, newSheet.id);
      localStorage.setItem(STORAGE_KEY_SHEET_TITLE, newSheet.title);
      onSpreadsheetConnected(newSheet);
      setShowConfigModal(false);
    } catch (err: any) {
      console.error('Error creating sheet', err);
      setConfigError(err?.message || 'Could not create spreadsheet in Google Drive.');
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleLinkExistingSheet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSheetInput.trim()) return;

    setConfigError(null);
    setIsCreatingSheet(true);
    try {
      let token = await getAccessToken();
      if (!token) {
        const res = await googleSignIn();
        token = res.accessToken;
        setCurrentUser(res.user);
      }

      const cleanId = extractSpreadsheetId(customSheetInput);
      const details = await getSpreadsheetDetails(token, cleanId);

      const sheetObj = {
        id: cleanId,
        title: details.title,
        url: `https://docs.google.com/spreadsheets/d/${cleanId}/edit`,
      };

      localStorage.setItem(STORAGE_KEY_SHEET_ID, cleanId);
      localStorage.setItem(STORAGE_KEY_SHEET_TITLE, details.title);
      onSpreadsheetConnected(sheetObj);
      setShowConfigModal(false);
      setCustomSheetInput('');
    } catch (err: any) {
      setConfigError(err?.message || 'Invalid Spreadsheet URL or access permission denied.');
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleDisconnect = async () => {
    localStorage.removeItem(STORAGE_KEY_SHEET_ID);
    localStorage.removeItem(STORAGE_KEY_SHEET_TITLE);
    onSpreadsheetConnected(null);
    setShowConfigModal(false);
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setCurrentUser(null);
    handleDisconnect();
  };

  return (
    <div className="mb-8">
      {/* Status Bar */}
      <div className="bg-[#1D1A17] border border-[#D9B477]/30 rounded-[3px] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-8 h-8 rounded-full bg-[#D9B477]/15 border border-[#D9B477]/40 flex items-center justify-center text-[#D9B477] flex-shrink-0">
            <FileSpreadsheet className="w-4 h-4" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-sans uppercase tracking-[0.16em] text-[10px] text-[#D9B477] font-semibold">
                Google Sheets Integration
              </span>
              {connectedSheet && (
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-600/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync Active
                </span>
              )}
            </div>

            {connectedSheet ? (
              <p className="text-[#F7F3EC] font-sans truncate max-w-[280px] sm:max-w-md">
                Connected: <span className="font-medium text-[#D9B477]">{connectedSheet.title}</span>
              </p>
            ) : (
              <p className="text-[#8D857A] font-sans">
                Automatically append new inquiries to your Google Spreadsheet.
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
          {connectedSheet ? (
            <>
              <a
                id="view-live-google-sheet-btn"
                href={connectedSheet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#211E1A] hover:bg-[#2B2723] text-[#F7F3EC] border border-[#D9B477]/30 rounded-[2px] font-sans text-xs transition-colors"
              >
                <span>View Sheet</span>
                <ExternalLink className="w-3 h-3 text-[#D9B477]" />
              </a>

              <button
                type="button"
                onClick={() => setShowConfigModal(true)}
                className="px-2.5 py-1.5 text-[#8D857A] hover:text-[#D9B477] transition-colors"
                title="Manage Connection"
              >
                Manage
              </button>
            </>
          ) : (
            <button
              id="connect-google-sheet-btn"
              type="button"
              onClick={handleSignIn}
              disabled={isAuthenticating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#D9B477] text-[#211E1A] hover:bg-[#C5A062] font-sans text-xs tracking-wider uppercase font-semibold rounded-[2px] transition-all disabled:opacity-60"
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  <span>Connect Google Sheet</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#1D1A17] border border-[#D9B477]/40 rounded-[4px] p-6 sm:p-8 max-w-lg w-full text-[#F7F3EC] shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="absolute top-4 right-4 text-[#8D857A] hover:text-[#F7F3EC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#D9B477]/15 border border-[#D9B477] flex items-center justify-center text-[#D9B477]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-2xl text-[#F7F3EC] font-light">
                  Google Sheet Synchronization
                </h3>
                {currentUser && (
                  <p className="text-xs text-[#8D857A] font-sans">
                    Authenticated as <span className="text-[#D9B477]">{currentUser.email}</span>
                  </p>
                )}
              </div>
            </div>

            {configError && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 text-red-300 text-xs rounded">
                {configError}
              </div>
            )}

            {connectedSheet ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#211E1A] rounded border border-[#D9B477]/20">
                  <p className="text-xs uppercase tracking-wider text-[#D9B477] font-semibold mb-1">
                    Currently Linked Spreadsheet
                  </p>
                  <p className="font-medium text-sm text-[#F7F3EC]">{connectedSheet.title}</p>
                  <a
                    href={connectedSheet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D9B477] hover:underline mt-2"
                  >
                    <span>Open in Google Sheets</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    className="text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Disconnect Sheet
                  </button>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#211E1A] hover:bg-black/50 border border-white/10 text-xs rounded text-[#8D857A] hover:text-[#F7F3EC]"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Option 1: Automatic Creation */}
                <div className="p-4 bg-[#211E1A] rounded border border-[#D9B477]/20">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D9B477] mb-1">
                    Option 1: Create New Sheet
                  </h4>
                  <p className="text-xs text-[#8D857A] mb-3 leading-relaxed">
                    Instantly generates a new spreadsheet named &ldquo;Forever Frames — Wedding Inquiries&rdquo;
                    formatted with columns for Name, Phone, Date, Location, Budget, and Notes.
                  </p>
                  <button
                    type="button"
                    onClick={handleCreateNewSheet}
                    disabled={isCreatingSheet}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#D9B477] text-[#211E1A] hover:bg-[#C5A062] font-sans text-xs tracking-wider uppercase font-semibold rounded-[2px] transition-all disabled:opacity-60"
                  >
                    {isCreatingSheet ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    <span>Create & Link Spreadsheet</span>
                  </button>
                </div>

                {/* Option 2: Link Existing */}
                <div className="p-4 bg-[#211E1A] rounded border border-[#D9B477]/20">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D9B477] mb-1">
                    Option 2: Link Existing Google Sheet
                  </h4>
                  <p className="text-xs text-[#8D857A] mb-3 leading-relaxed">
                    Paste the URL or Spreadsheet ID of your existing Google Sheet to append inquiries there.
                  </p>

                  <form onSubmit={handleLinkExistingSheet} className="space-y-3">
                    <input
                      type="text"
                      value={customSheetInput}
                      onChange={(e) => setCustomSheetInput(e.target.value)}
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                      className="w-full p-2.5 bg-[#1D1A17] border border-[#D9B477]/25 text-xs text-[#F7F3EC] rounded-[2px] focus:outline-none focus:border-[#D9B477]"
                    />
                    <button
                      type="submit"
                      disabled={isCreatingSheet || !customSheetInput.trim()}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 border border-[#D9B477] text-[#D9B477] hover:bg-[#D9B477] hover:text-[#211E1A] font-sans text-xs tracking-wider uppercase font-semibold rounded-[2px] transition-all disabled:opacity-50"
                    >
                      {isCreatingSheet ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <LinkIcon className="w-3.5 h-3.5" />
                      )}
                      <span>Connect Existing Sheet</span>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

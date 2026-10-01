import { useState } from 'react';
import { getRestartDialog, getSecondConfirmDialog } from './restartDialogs';
import { casparlumi } from './illustrations';

export function RestartDialog({ 
  currentRound, 
  isDayComplete,
  onCancel, 
  onConfirm
}) {
  const [stage, setStage] = useState('first');
  
  const firstDialog = getRestartDialog(currentRound, isDayComplete);
  
  // Kein Dialog nötig - Tag noch nicht begonnen
  if (!firstDialog) {
    return null;
  }

  const dialog = stage === 'first' ? firstDialog : getSecondConfirmDialog();

  const handleSecondaryClick = () => {
    if (stage === 'first' && firstDialog.showSecondStep) {
      setStage('final');
    } else if (stage === 'final') {
      onConfirm();
    }
  };

  const handlePrimaryClick = () => {
    if (stage === 'first' && isDayComplete) {
      // "Geschichte noch einmal lesen" - Dialog schließen
      onCancel();
    } else {
      // "Dort weitermachen" oder "Doch lieber weitermachen" - Dialog schließen
      onCancel();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-50"
      onClick={onCancel}
      onKeyDown={(e) => {
        if (e.key === 'Escape') onCancel();
      }}
      role="presentation"
    >
      {/* Dialogkarte */}
      <div 
        className="max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-nq-cream rounded-3xl shadow-2xl border-4 border-nq-gold p-8">
          {/* Illustration - Caspar und Lumi */}
          <div className="mb-8 flex justify-center">
            <div className="w-40 h-40 bg-white rounded-2xl border-2 border-nq-sage flex items-center justify-center overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: casparlumi }} className="w-full" />
            </div>
          </div>

          {/* Dialog-Container */}
          <div className="space-y-6 mb-8">
            {/* Caspar spricht */}
            <div className="bg-white rounded-2xl p-6 border-2 border-nq-sage">
              <p className="text-sm font-semibold text-nq-forest mb-3">🌿 Caspar sagt:</p>
              <div className="space-y-2">
                {dialog.caspar.map((line, i) => (
                  <p 
                    key={i}
                    className="text-base leading-relaxed text-nq-text"
                    style={{
                      animation: `slideUp 0.6s ease-out ${i * 0.2}s both`,
                    }}
                  >
                    "{line}"
                  </p>
                ))}
                {dialog.caspanFollowUp && (
                  <p 
                    className="text-base leading-relaxed text-nq-text font-semibold mt-4"
                    style={{
                      animation: `slideUp 0.6s ease-out ${dialog.caspar.length * 0.2}s both`,
                    }}
                  >
                    "{dialog.caspanFollowUp}"
                  </p>
                )}
              </div>
            </div>

            {/* Lumi spricht */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-nq-gold">
              <p className="text-sm font-semibold text-nq-gold mb-3">✨ Lumi sagt:</p>
              <div className="space-y-2">
                {dialog.lumi.map((line, i) => (
                  <p 
                    key={i}
                    className="text-base leading-relaxed text-nq-text italic"
                    style={{
                      animation: `slideUp 0.6s ease-out ${(dialog.caspar.length + (dialog.caspanFollowUp ? 1 : 0) + i) * 0.2}s both`,
                    }}
                  >
                    "{line}"
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePrimaryClick}
              className="w-full bg-nq-forest hover:bg-nq-sage text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105"
            >
              {dialog.primaryButton}
            </button>
            <button
              onClick={handleSecondaryClick}
              className="w-full bg-nq-line hover:bg-nq-wood text-nq-text font-semibold py-3 px-6 rounded-2xl text-base transition-all duration-300"
            >
              {dialog.secondaryButton}
            </button>
          </div>

          {stage === 'final' && (
            <p className="text-xs text-nq-wood text-center mt-4">
              (Drücke Esc zum Abbrechen)
            </p>
          )}

          <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

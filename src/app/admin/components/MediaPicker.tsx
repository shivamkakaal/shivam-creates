'use client';

import { useState } from 'react';
import { Image as ImageIcon, X } from 'lucide-react';
import MediaLibrary from './MediaLibrary';

type MediaPickerProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export default function MediaPicker({ value, onChange, label }: MediaPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-text-secondary mb-2">{label}</label>}
      <div className="space-y-4">
        {/* Large Preview / Placeholder Box */}
        <div 
          onClick={() => setIsOpen(true)}
          className={`relative w-full aspect-video sm:aspect-[21/9] rounded-xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all group ${
            value ? 'border-transparent' : 'border-white/20 bg-white/[0.02] hover:bg-white/[0.04] hover:border-amber/40'
          }`}
        >
          {value ? (
            <>
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-white text-sm font-medium flex items-center gap-2">
                   <ImageIcon className="w-4 h-4" /> Change Image
                 </span>
              </div>
              <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange(''); }}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-500/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:text-amber text-text-muted">
                 <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-text-secondary group-hover:text-amber transition-colors">Click to select an image</p>
              <p className="text-xs text-text-muted mt-1">Choose from your Media Library</p>
            </div>
          )}
        </div>

        {/* Fallback Input */}
        <div className="flex gap-4 items-start">
          <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image URL here..."
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-foreground text-sm focus:outline-none focus:border-amber/40 transition-all"
          />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-5xl animate-in fade-in zoom-in duration-300">
            <MediaLibrary 
              onSelect={(url) => {
                onChange(url);
                setIsOpen(false);
              }}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

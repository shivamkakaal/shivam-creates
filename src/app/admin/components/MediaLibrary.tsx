'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { 
  Upload, 
  X, 
  Search, 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  Check, 
  Loader2,
  FolderOpen
} from 'lucide-react';
import Image from 'next/image';

type MediaAsset = {
  id: string;
  filename: string;
  public_url: string;
  storage_path: string;
  file_type: string;
  file_size_bytes: number;
  created_at: string;
};

export default function MediaLibrary({ onSelect, onCancel }: { onSelect?: (url: string) => void, onCancel?: () => void }) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    fetchAssets();
  }, []);

  async function fetchAssets() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('media_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
      toast.error('Failed to load media library');
    } finally {
      setIsLoading(false);
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are supported currently');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // 1. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // 3. Save to media_assets table
      const { data: asset, error: dbError } = await supabase
        .from('media_assets')
        .insert([{
          filename: file.name,
          storage_path: filePath,
          public_url: publicUrl,
          file_type: file.type,
          file_size_bytes: file.size,
          mime_type: file.type
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      setAssets([asset, ...assets]);
      toast.success('File uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      // 1. Delete from Storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([asset.storage_path]);

      if (storageError) throw storageError;

      // 2. Delete from Database
      const { error: dbError } = await supabase
        .from('media_assets')
        .delete()
        .eq('id', asset.id);

      if (dbError) throw dbError;

      setAssets(assets.filter(a => a.id !== asset.id));
      if (selectedAsset?.id === asset.id) setSelectedAsset(null);
      toast.success('File deleted');
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredAssets = assets.filter(a => 
    a.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[70vh] bg-[#0a0f1e] rounded-2xl overflow-hidden border border-white/5">
      {/* Toolbar */}
      <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-[250px]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search media..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm outline-none focus:border-amber/40"
            />
          </div>
          <label className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber text-black text-sm font-semibold cursor-pointer hover:bg-amber/90 transition-colors">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={isUploading} />
          </label>
        </div>
        {onCancel && (
          <button onClick={onCancel} className="p-2 text-text-muted hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {isLoading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-text-muted">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Loading your assets...</p>
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-text-muted opacity-50">
              <FolderOpen className="w-12 h-12 mb-4" />
              <p>No media files found</p>
            </div>
          ) : (
            filteredAssets.map((asset) => (
              <div 
                key={asset.id} 
                className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedAsset?.id === asset.id ? 'border-amber shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'border-white/5 hover:border-white/20'
                }`}
                onClick={() => setSelectedAsset(asset)}
              >
                <Image 
                  src={asset.public_url} 
                  alt={asset.filename}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-[10px] text-white truncate w-full font-medium">{asset.filename}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar / Details */}
        {selectedAsset && (
          <div className="w-72 border-l border-white/5 bg-[#050816] p-6 flex flex-col gap-6 overflow-y-auto hidden lg:flex">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
              <Image src={selectedAsset.public_url} alt="Preview" fill className="object-cover" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">File Name</label>
                <p className="text-sm text-foreground truncate">{selectedAsset.filename}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">File Type</label>
                <p className="text-sm text-foreground">{selectedAsset.file_type}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">File Size</label>
                <p className="text-sm text-foreground">{(selectedAsset.file_size_bytes / 1024).toFixed(2)} KB</p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Uploaded At</label>
                <p className="text-sm text-foreground">{new Date(selectedAsset.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
              {onSelect && (
                <button 
                  onClick={() => onSelect(selectedAsset.public_url)}
                  className="w-full btn-primary !py-2.5"
                >
                  <Check className="w-4 h-4" /> Select Asset
                </button>
              )}
              <button 
                onClick={() => copyToClipboard(selectedAsset.public_url, selectedAsset.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 text-sm hover:bg-white/10 transition-colors"
              >
                {copiedId === selectedAsset.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>Copy URL</span>
              </button>
              <button 
                onClick={() => handleDelete(selectedAsset)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-colors mt-2"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

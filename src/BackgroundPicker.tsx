import { useState, type ChangeEvent } from 'react';
import { ArrowUpRight, Check, ImagePlus, X } from 'lucide-react';

export const DEFAULT_BACKGROUND = '/images/himalaya-hero.jpg';
export const BACKGROUND_STORAGE_KEY = 'yatra-background-photo';

const backgrounds = [
  { name: 'Mountain sunrise', src: DEFAULT_BACKGROUND },
  { name: 'Himalayan valley', src: '/images/background-valley.jpg' },
  { name: 'Alpine lake', src: '/images/background-lake.jpg' },
];

type BackgroundPickerProps = {
  current: string;
  onChange: (photo: string) => boolean;
  onClose: () => void;
};

export default function BackgroundPicker({ current, onChange, onClose }: BackgroundPickerProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const choosePhoto = (photo: string) => {
    const saved = onChange(photo);
    setMessage(saved ? 'Background updated and saved in this browser.' : 'Background updated for this visit, but could not be saved in this browser.');
  };

  const uploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setMessage('Please choose a JPG, PNG or WebP image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setMessage('Please choose an image smaller than 10 MB.');
      return;
    }

    setIsLoading(true);
    setMessage('Preparing your photo...');
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      try {
        // Resize the upload so it remains practical to keep in browser storage.
        const scale = Math.min(1, 1920 / image.naturalWidth, 1200 / image.naturalHeight);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Unable to prepare image');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        choosePhoto(canvas.toDataURL('image/jpeg', 0.82));
      } catch {
        setMessage('This image could not be opened. Please try another photo.');
      } finally {
        URL.revokeObjectURL(objectUrl);
        setIsLoading(false);
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setIsLoading(false);
      setMessage('This image could not be opened. Please try another photo.');
    };
    image.src = objectUrl;
  };

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal photo-modal" role="dialog" aria-modal="true" aria-labelledby="photo-title">
        <button className="modal-close" onClick={onClose} aria-label="Close background picker"><X size={20} /></button>
        <span className="eyebrow"><span />MAKE IT YOURS</span>
        <h2 id="photo-title">Change the <em>view.</em></h2>
        <p>Choose a mountain view or add a favourite photo of your own.</p>
        <div className="background-options" aria-label="Background photos">
          {backgrounds.map((photo) => <button key={photo.name} className={`background-option ${current === photo.src ? 'is-selected' : ''}`} onClick={() => choosePhoto(photo.src)} aria-pressed={current === photo.src}>
            <span className="background-option-image"><img src={photo.src} alt="" />{current === photo.src && <span className="background-selected"><Check size={15} /></span>}</span>
            <span>{photo.name}</span>
          </button>)}
        </div>
        <label className="photo-upload">
          <ImagePlus size={21} />
          <span><strong>Upload your own photo</strong><small>JPG, PNG or WebP, up to 10 MB</small></span>
          <ArrowUpRight size={18} />
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadPhoto} disabled={isLoading} />
        </label>
        {message && <p className="photo-message" role="status">{message}</p>}
        <div className="photo-modal-footer">
          <p>Your background choice is saved only in this browser.</p>
          <button className="button button-dark" onClick={onClose}>Done <ArrowUpRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}
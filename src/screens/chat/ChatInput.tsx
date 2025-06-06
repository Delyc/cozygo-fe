import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { ImagePlus, Send } from 'lucide-react';

interface ChatInputProps {
    onSend: (content: string, images: string[]) => void;
    isUploading: boolean;
    onFilesSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
    imageUrls: string[];
    inputValue: string;
    onInputChange: (val: string) => void;
}

export default function ChatInput({
    onSend,
    isUploading,
    onFilesSelected,
    imageUrls,
    inputValue,
    onInputChange,
}: ChatInputProps) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSend(inputValue.trim(), imageUrls);
    };

    return (
        <div className="p-4 w-4/5 mx-auto mb-10">
            <form onSubmit={handleSubmit} className="flex gap-2  relative bg-white border border-neutral-100 rounded-full">
                <div className="relative w-full flex ">
                <div className='flex gap- absolute left-5 justif items-center'>
                <div className=''>
                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={onFilesSelected}
                        accept="image/*"
                        className="   opacity-0 w-8 h-8 cursor-pointer"
                    />
                    <ImagePlus className='text-black/30 w-6 h-6 -mt-5'/>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        className="text-2xl  mt-3"
                        aria-label="Toggle Emoji Picker"
                    >
                        😊
                    </button>
                    
                    </div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        placeholder="Type your message..."
                        className=" px-24 w-5/6 text-gray-500   py-3 outline-none"
                    />

                    

                    {isUploading && <p className="mt-2 text-sm text-gray-600">Uploading images...</p>}

                    {/* <div className="image-previews flex gap-2 mt-2">
            {imageUrls.map((url, idx) => (
              <Image
              width={16}
              height={16}
                key={idx}
                src={url}
                alt={`image-${idx}`}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div> */}

                    {showEmojiPicker && (
                        <div className="absolute bottom-14 left-0 z-50">
                            <EmojiPicker
                                onEmojiClick={(emojiData) => onInputChange(inputValue + emojiData.emoji)}
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-900 text-white px-4 py-2 rounded-full flex items-center gap-2"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}

import React, { useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, RemoveFormatting, Heading1, Heading2, AlignLeft, AlignCenter, AlignRight, AlignJustify, Strikethrough, Quote, Minus } from 'lucide-react';

interface BrutalistEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
    maxWords?: number;
}

const BrutalistEditor: React.FC<BrutalistEditorProps> = ({ value, onChange, placeholder = "Start typing...", minHeight = "250px", maxWords }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    // Initial content setup
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            // Only update if the content actually changed externally to prevent cursor jumping
            if (value === "" || value !== editorRef.current.innerHTML) {
                editorRef.current.innerHTML = value;
            }
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleCommand = (command: string, arg?: string) => {
        document.execCommand(command, false, arg);
        editorRef.current?.focus();
        handleInput(); // Trigger onChange after command
    };

    return (
        <div className="flex flex-col w-full h-full min-h-[300px] bg-white border-[3px] border-black group focus-within:ring-2 focus-within:ring-[#39FF14] transition-all">

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 border-b-[3px] border-black flex-shrink-0">

                {/* Headings */}
                <button type="button" onClick={() => handleCommand('formatBlock', 'H1')} className="p-1.5 hover:bg-[#39FF14] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Heading 1"><Heading1 size={18} /></button>
                <button type="button" onClick={() => handleCommand('formatBlock', 'H2')} className="p-1.5 hover:bg-[#39FF14] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Heading 2"><Heading2 size={18} /></button>
                <div className="w-px h-6 bg-gray-400 mx-1"></div>

                {/* Typography */}
                <button type="button" onClick={() => handleCommand('bold')} className="p-1.5 hover:bg-[#39FF14] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Bold"><Bold size={18} /></button>
                <button type="button" onClick={() => handleCommand('italic')} className="p-1.5 hover:bg-[#39FF14] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Italic"><Italic size={18} /></button>
                <button type="button" onClick={() => handleCommand('underline')} className="p-1.5 hover:bg-[#39FF14] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Underline"><Underline size={18} /></button>
                <button type="button" onClick={() => handleCommand('strikeThrough')} className="p-1.5 hover:bg-[#39FF14] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Strikethrough"><Strikethrough size={18} /></button>

                <div className="w-px h-6 bg-gray-400 mx-1"></div>

                {/* Alignment */}
                <button type="button" onClick={() => handleCommand('justifyLeft')} className="p-1.5 hover:bg-[#00A3FF] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Align Left"><AlignLeft size={18} /></button>
                <button type="button" onClick={() => handleCommand('justifyCenter')} className="p-1.5 hover:bg-[#00A3FF] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Align Center"><AlignCenter size={18} /></button>
                <button type="button" onClick={() => handleCommand('justifyRight')} className="p-1.5 hover:bg-[#00A3FF] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Align Right"><AlignRight size={18} /></button>
                <button type="button" onClick={() => handleCommand('justifyFull')} className="p-1.5 hover:bg-[#00A3FF] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Justify"><AlignJustify size={18} /></button>

                <div className="w-px h-6 bg-gray-400 mx-1"></div>

                {/* Lists */}
                <button type="button" onClick={() => handleCommand('insertUnorderedList')} className="p-1.5 hover:bg-[#FFC700] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Bullet List"><List size={18} /></button>
                <button type="button" onClick={() => handleCommand('insertOrderedList')} className="p-1.5 hover:bg-[#FFC700] hover:text-black border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Numbered List"><ListOrdered size={18} /></button>

                <div className="w-px h-6 bg-gray-400 mx-1"></div>

                {/* Elements */}
                <button type="button" onClick={() => handleCommand('formatBlock', 'BLOCKQUOTE')} className="p-1.5 hover:bg-[#FF4F00] hover:text-white border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Blockquote"><Quote size={18} /></button>
                <button type="button" onClick={() => handleCommand('insertHorizontalRule')} className="p-1.5 hover:bg-[#FF4F00] hover:text-white border-2 border-transparent hover:border-black transition-colors rounded-sm" title="Horizontal Line"><Minus size={18} /></button>

                <div className="flex-grow"></div>

                {/* Clear Formatting */}
                <button type="button" onClick={() => handleCommand('removeFormat')} className="p-1.5 hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black transition-colors rounded-sm ml-auto text-gray-500" title="Clear Formatting"><RemoveFormatting size={18} /></button>
            </div>

            {/* Editable Area */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onBlur={handleInput}
                className="p-4 focus:outline-none font-serif text-base md:text-lg leading-relaxed prose md:prose-lg max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 overflow-y-auto flex-1 min-h-0 break-words"
                data-placeholder={placeholder}
            />

            {/* Word Count Footer */}
            <div className="bg-gray-100 border-t-[3px] border-black p-2 flex justify-end items-center text-xs font-black uppercase text-gray-500 tracking-widest gap-2">
                <span className="bg-black text-[#FFC700] px-2 py-1 shadow-[2px_2px_0_0_#000]">
                    {value ? value.replace(/<[^>]*>?/gm, '').length : 0} CHARACTERS
                </span>
                <span className={`px-2 py-1 shadow-[2px_2px_0_0_#000] border-2 border-transparent ${maxWords && (value ? value.replace(/<[^>]*>?/gm, ' ').split(/\s+/).filter(word => word.length > 0).length : 0) > maxWords
                    ? 'bg-red-500 text-white border-black animate-pulse'
                    : 'bg-black text-[#39FF14]'
                    }`}>
                    {value ? value.replace(/<[^>]*>?/gm, ' ').split(/\s+/).filter(word => word.length > 0).length : 0} {maxWords ? `/ ${maxWords} MAX WORDS` : 'WORDS'}
                </span>
            </div>

            <style>{`
                /* Styling for the contentEditable lists to ensure they render inside the div */
                div[contenteditable] h1 {
                    font-size: 2.25rem;
                    line-height: 2.5rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                    letter-spacing: -0.05em;
                }
                div[contenteditable] h2 {
                    font-size: 1.5rem;
                    line-height: 2rem;
                    font-weight: 700;
                    margin-top: 1.25rem;
                    margin-bottom: 0.75rem;
                }
                div[contenteditable] blockquote {
                    border-left: 4px solid black;
                    padding-left: 1rem;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    font-style: italic;
                    margin-top: 1.5rem;
                    margin-bottom: 1.5rem;
                    background-color: #f3f4f6;
                    color: #374151;
                    font-weight: 500;
                }
                div[contenteditable] hr {
                    border-top: 4px dashed black;
                    margin-top: 2rem;
                    margin-bottom: 2rem;
                    border-bottom: none;
                    border-left: none;
                    border-right: none;
                }
                div[contenteditable] s {
                    text-decoration-thickness: 2px;
                    text-decoration-color: #ef4444;
                }
                div[contenteditable] ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                div[contenteditable] ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default BrutalistEditor;

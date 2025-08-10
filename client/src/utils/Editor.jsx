import './Editor.css'
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Ban, Bold, ChevronDown, CodeXml, Heading, Heading1, Heading2, Heading3, Heading4, Highlighter, Italic, List, ListOrdered, ListTodo, LucideSubscript, LucideSuperscript, Redo2, SquareCode, Strikethrough, SubscriptIcon, SuperscriptIcon, Underline, Undo2 } from "lucide-react";
import Tooltip from './Tooltip';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-subtle.css';
import { useEffect, useRef, useState } from 'react';
import { TaskItem, TaskList } from '@tiptap/extension-list';

const CustomHighlight = Highlight.extend({
  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: element => element.getAttribute('data-color'),
        renderHTML: attributes => {
          if (!attributes.color) return {};
          const hex = attributes.color.replace('#', '');
          return {
            'data-color': attributes.color,
            class: `highlight-${hex}`, // apply a class instead of inline style
          };
        },
      },
    };
  },
}).configure({ multicolor: true });

const extensions = [TextStyleKit,
    StarterKit,
    Subscript, Superscript,
    CustomHighlight,
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    TaskList,
    TaskItem.configure({
        HTMLAttributes: {
            class: "task-list-item"
        },
        nested: true,
    }),
];

const MenuBar = ({ editor }) => {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold'),
                canBold: ctx.editor.can().chain().focus().toggleBold().run(),

                isItalic: ctx.editor.isActive('italic'),
                canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),

                isStrike: ctx.editor.isActive('strike'),
                canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),

                isCode: ctx.editor.isActive('code'),
                canCode: ctx.editor.can().chain().focus().toggleCode().run(),

                isUnderline: ctx.editor.isActive('underline'),
                canUnderline: ctx.editor.can().chain().focus().toggleUnderline().run(),

                isHeading1: ctx.editor.isActive('heading', { level: 1 }),
                isHeading2: ctx.editor.isActive('heading', { level: 2 }),
                isHeading3: ctx.editor.isActive('heading', { level: 3 }),
                isHeading4: ctx.editor.isActive('heading', { level: 4 }),

                // isHighlightGreen:
                isHighlightGreen: ctx.editor.isActive('highlight', { color: '#dcfce7' }),
                isHighlightBlue: ctx.editor.isActive('highlight', { color: '#e0f2fe' }),
                isHighlightRed: ctx.editor.isActive('highlight', { color: '#ffe4e6' }),
                isHighlightPurple: ctx.editor.isActive('highlight', { color: '#f3e8ff' }),
                isHighlightyellow: ctx.editor.isActive('highlight', { color: '#fef9c3' }),

                isBulletList: ctx.editor.isActive('bulletList'),
                isOrderedList: ctx.editor.isActive('orderedList'),
                isTaskList: ctx.editor.isActive('taskList'),
                isCodeBlock: ctx.editor.isActive('codeBlock'),
                isBlockquote: ctx.editor.isActive('blockquote'),

                isSuperscript: ctx.editor.isActive('superscript'),
                canSuperScript: ctx.editor.can().chain().focus().toggleSuperscript().run(),
                isSubscript: ctx.editor.isActive('subscript'),
                canSubScript: ctx.editor.can().chain().focus().toggleSubscript().run(),

                isTextAlignLeft: ctx.editor.isActive({ textAlign: 'left' }),
                isTextAlignRight: ctx.editor.isActive({ textAlign: 'right' }),
                isTextAlignCenter: ctx.editor.isActive({ textAlign: 'center' }),
                isTextAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }),

                canUndo: ctx.editor.can().chain().focus().undo().run(),
                canRedo: ctx.editor.can().chain().focus().redo().run(),
            }
        },
    })

    const [headingDropdown, setHeadingDropdown] = useState(false);
    const headingBtnRef = useRef(null);
    const [listDropdown, setListDropdown] = useState(false);
    const ListBtnRef = useRef(null);
    const [highlightDropdown, setHighlightDropdown] = useState(false);
    const highlightBtnRef = useRef(null);

    return (
        <div className="control-group sticky top-0 border-y dark:border-gray-700 py-2 overflow-x-auto scrollbar-hide">
            <div className="button-group flex gap-[2px] items-center justify-start ">
                <Tooltip label="Undo" shortcut='Ctrl+Z'>
                    <button type="button"
                        className='btn'
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={!editorState.canUndo}
                    >
                        <Undo2 size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Redo' shortcut='Ctrl+Shift+Z'>
                    <button type="button"
                        className={`${editorState.canRedo ? "btn" : "is-dis"}`}
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={!editorState.canRedo}
                    >
                        <Redo2 size={16} />
                    </button>
                </Tooltip>

                <div className="border-r dark:border-gray-700 h-6"></div>

                <Tooltip label='Heading'>
                    <Tippy
                        visible={headingDropdown}
                        onClickOutside={() => setHeadingDropdown(false)}
                        interactive={true}
                        placement='bottom'
                        appendTo={() => document.body}
                        render={() => (
                            <div className="bg-white dark:bg-gray-800 p-1 border flex flex-col text-sm leading-0 font-semibold gap-0.5 rounded-xl">
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHeading({ level: 1 }).run();
                                        setHeadingDropdown(false);
                                    }}
                                    className={`flex items-center gap-1 btn ${editorState.isHeading1 ? 'is-active' : ""} `}
                                >
                                    <Heading1 size={16} />
                                    Heading 1
                                </button>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                                        setHeadingDropdown(false);
                                    }}
                                    className={`flex items-center gap-1 btn ${editorState.isHeading2 ? 'is-active' : ""} `}
                                >
                                    <Heading2 size={16} />
                                    Heading 2
                                </button>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHeading({ level: 3 }).run();
                                        setHeadingDropdown(false);
                                    }}
                                    className={`flex items-center gap-1 btn ${editorState.isHeading3 ? 'is-active' : ""} `}
                                >
                                    <Heading3 size={16} />
                                    Heading 3
                                </button>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHeading({ level: 4 }).run();
                                        setHeadingDropdown(false);
                                    }}
                                    className={`flex items-center gap-1 btn ${editorState.isHeading4 ? 'is-active' : ""} `}
                                >
                                    <Heading4 size={16} />
                                    Heading 4
                                </button>
                            </div>
                        )}
                    >
                        <span ref={headingBtnRef}>
                            <button
                                type='button'
                                onClick={() => setHeadingDropdown(prev => !prev)}
                                className={`flex items-center btn ${(editorState.isHeading1 || editorState.isHeading2 || editorState.isHeading3 || editorState.isHeading4) ? 'is-active' : ""}`}
                            >
                                {!editorState.isHeading1 && !editorState.isHeading2 && !editorState.isHeading3 && !editorState.isHeading4 && <Heading size={16} />}
                                {editorState.isHeading1 && <Heading1 size={16} />}
                                {editorState.isHeading2 && <Heading2 size={16} />}
                                {editorState.isHeading3 && <Heading3 size={16} />}
                                {editorState.isHeading4 && <Heading4 size={16} />}
                                <ChevronDown size={10} />
                            </button>
                        </span>
                    </Tippy>
                </Tooltip>

                <Tooltip label='List'>
                    <Tippy
                        visible={listDropdown}
                        onClickOutside={() => setListDropdown(false)}
                        interactive={true}
                        placement='bottom'
                        appendTo={() => document.body}
                        render={() => (
                            <div className="bg-white dark:bg-gray-800 p-1 border flex flex-col text-sm leading-0 font-semibold gap-0.5 rounded-xl">
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleBulletList().run();
                                        setListDropdown(false);
                                    }}
                                    className={`flex items-center gap-1 btn ${editorState.isBulletList ? 'is-active' : ""} `}
                                >
                                    <List size={16} />
                                    Bullet List
                                </button>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleOrderedList().run();
                                        setListDropdown(false);
                                    }}
                                    className={`flex items-center gap-1 btn ${editorState.isOrderedList ? 'is-active' : ""} `}
                                >
                                    <ListOrdered size={16} />
                                    Ordered List
                                </button>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleTaskList().run();
                                        setListDropdown(false);
                                    }}
                                    className={`flex items-center gap-1 btn ${editorState.isTaskList ? 'is-active' : ""} `}
                                >
                                    <ListTodo size={16} />
                                    Task List
                                </button>
                            </div>
                        )}
                    >
                        <span ref={ListBtnRef}>
                            <button
                                type='button'
                                onClick={() => setListDropdown(prev => !prev)}
                                className={`flex items-center btn ${(editorState.isBulletList || editorState.isOrderedList || editorState.isTaskList) ? "is-active" : ''}`}
                            >
                                {!editorState.isOrderedList && !editorState.isTaskList && <List size={16} />}
                                {editorState.isOrderedList && <ListOrdered size={16} />}
                                {editorState.isTaskList && <ListTodo size={16} />}
                                <ChevronDown size={10} />
                            </button>
                        </span>

                    </Tippy>
                </Tooltip>

                <Tooltip label='Block Quote' shortcut='Ctrl+Shift+B'>
                    <button type="button"
                        className={`flex btn ${editorState.isBlockquote ? 'is-active' : ''}`}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 6C8 5.44772 8.44772 5 9 5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H9C8.44772 7 8 6.55228 8 6Z" fill="currentColor"></path>
                            <path d="M4 3C4.55228 3 5 3.44772 5 4L5 20C5 20.5523 4.55229 21 4 21C3.44772 21 3 20.5523 3 20L3 4C3 3.44772 3.44772 3 4 3Z" fill="currentColor"></path>
                            <path d="M8 12C8 11.4477 8.44772 11 9 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H9C8.44772 13 8 12.5523 8 12Z" fill="currentColor"></path>
                            <path d="M8 18C8 17.4477 8.44772 17 9 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H9C8.44772 19 8 18.5523 8 18Z" fill="currentColor"></path>
                        </svg>
                    </button>
                </Tooltip>

                <Tooltip label='Code Block' shortcut='Ctrl+Alt+C'>
                    <button type="button"
                        className={`btn ${editorState.isCodeBlock ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    >
                        <SquareCode size={16} />
                    </button>
                </Tooltip>

                <div className="border-r dark:border-gray-700 h-6"></div>

                {/* <Tooltip label='Bold' shortcut='ctrl+B'></Tooltip> */}
                <Tooltip label='Bold' shortcut='Ctrl+B'>
                    <button type="button"
                        className={`${editorState.canBold ? "btn" : "is-dis"} ${editorState.isBold ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editorState.canBold}
                    >
                        <Bold size={16} strokeWidth={3} />
                    </button>
                </Tooltip>

                <Tooltip label='Italic' shortcut='Ctrl+I'>
                    <button type="button"
                        className={`${editorState.canItalic ? "btn" : "is-dis"} ${editorState.isItalic ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editorState.canItalic}
                    >
                        <Italic size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Strike' shortcut='Ctrl+Shift+S'>
                    <button type="button"
                        className={`${editorState.canStrike ? "btn" : "is-dis"} ${editorState.isStrike ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={!editorState.canStrike}
                    >
                        <Strikethrough size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Code' shortcut='Ctrl+E'>
                    <button type="button"
                        className={`${editorState.canCode ? "btn" : "is-dis"} ${editorState.isCode ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        disabled={!editorState.canCode}
                    >
                        <CodeXml size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Underline' shortcut='Ctrl+U'>
                    <button type="button"
                        className={`${editorState.canUnderline ? "btn" : "is-dis"} ${editorState.isUnderline ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        disabled={!editorState.canUnderline}
                    >
                        <Underline size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Highlight'>
                    <Tippy
                        visible={highlightDropdown}
                        onClickOutside={() => setHighlightDropdown(false)}
                        interactive={true}
                        placement='bottom'
                        appendTo={() => document.body}
                        render={() => (
                            <div className="bg-white dark:bg-gray-800 p-1 flex items-center text-sm leading-0 font-semibold gap-0.5 rounded-xl">
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHighlight({ color: '#dcfce7' }).run();
                                        setHighlightDropdown(false);
                                    }}
                                    className={`flex items-center justify-center gap-1 btn ${editorState.isHighlightGreen ? 'is-active' : ""} `}
                                >
                                    <span className='h-5 w-5 rounded-full bg-[#dcfce7] border'></span>
                                </button>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHighlight({ color: '#e0f2fe' }).run();
                                        setHighlightDropdown(false);
                                    }}
                                    className={`flex items-center justify-center gap-1 btn ${editorState.isHighlightBlue ? 'is-active' : ""} `}
                                >
                                    <span className='h-5 w-5 rounded-full bg-[#e0f2fe] border '></span>
                                </button>

                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHighlight({ color: '#ffe4e6' }).run();
                                        setHighlightDropdown(false);
                                    }}
                                    className={`flex items-center justify-center gap-1 btn ${editorState.isHighlightRed ? 'is-active' : ""} `}
                                >
                                    <span className='h-5 w-5 rounded-full bg-[#ffe4e6] border '></span>
                                </button>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHighlight({ color: '#f3e8ff' }).run();
                                        setHighlightDropdown(false);
                                    }}
                                    className={`flex items-center justify-center gap-1 btn ${editorState.isHighlightPurple ? 'is-active' : ""} `}
                                >
                                    <span className='h-5 w-5 rounded-full bg-[#f3e8ff] border '></span>
                                </button>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().toggleHighlight({ color: '#fef9c3' }).run();
                                        setHighlightDropdown(false);
                                    }}
                                    className={`flex items-center justify-center gap-1 btn ${editorState.isHighlightyellow ? 'is-active' : ""} `}
                                >
                                    <span className='h-5 w-5 rounded-full bg-[#fef9c3] border '></span>
                                </button>
                                <div className="border-r dark:border-gray-700 h-6"></div>
                                <button
                                    onClick={() => {
                                        editor.chain().focus().unsetHighlight().run();
                                        setHighlightDropdown(false);
                                    }}
                                    className={`flex items-center justify-center gap-1 btn `}
                                >
                                    <Ban size={20} />
                                </button>

                            </div>
                        )}
                    >
                        <span ref={highlightBtnRef}>
                            <button
                                type='button'
                                onClick={() => setHighlightDropdown(prev => !prev)}
                                className={`flex items-center btn ${(editorState.isHighlightGreen || editorState.isHighlightBlue || editorState.isHighlightRed || editorState.isHighlightyellow || editorState.isHighlightyellow) ? "is-active" : ''}`}
                            >
                                <Highlighter size={16} />
                                <ChevronDown size={10} />
                            </button>
                        </span>

                    </Tippy>
                </Tooltip>

                <div className="border-r dark:border-gray-700 h-6"></div>

                <Tooltip label='Superscript' shortcut='Ctrl+.'>
                    <button type="button"
                        className={`${editorState.canSuperScript ? "btn" : "is-dis"} ${editorState.isSuperscript ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                        disabled={!editorState.canSuperScript}
                    >
                        <LucideSuperscript size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Subscript' shortcut='Ctrl+,'>
                    <button type="button"
                        className={`${editorState.canSubScript ? "btn" : "is-dis"} ${editorState.isSubscript ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                        disabled={!editorState.canSubScript}
                    >
                        <LucideSubscript size={16} />
                    </button>
                </Tooltip>

                <div className="border-r dark:border-gray-700 h-6"></div>

                <Tooltip label='Align Left' shortcut='Ctrl+Shift+L'>
                    <button type="button"
                        className={`btn ${editorState.isTextAlignLeft ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleTextAlign('left').run()}
                    >
                        <AlignLeft size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Align Center' shortcut='Ctrl+Shift+E'>
                    <button type="button"
                        className={`btn ${editorState.isTextAlignCenter ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleTextAlign('center').run()}
                    >
                        <AlignCenter size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Align Right' shortcut='Ctrl+Shift+R'>
                    <button type="button"
                        className={`btn ${editorState.isTextAlignRight ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleTextAlign('right').run()}
                    >
                        <AlignRight size={16} />
                    </button>
                </Tooltip>

                <Tooltip label='Align Justify' shortcut='Ctrl+Shift+J'>
                    <button type="button"
                        className={`btn ${editorState.isTextAlignJustify ? 'is-active' : ''} `}
                        onClick={() => editor.chain().focus().toggleTextAlign('justify').run()}
                    >
                        <AlignJustify size={16} />
                    </button>
                </Tooltip>
            </div>
        </div>
    )
}

export default ({ content, onChange,editorRef }) => {
    const editor = useEditor({
        extensions,
        content,
        editorProps: {
            attributes: {
                class: 'min-h-60 max-h-90 sm:min-h-80 sm:max-h-120  outline-none max-w-none px-2 py-8 border-b text-lg overflow-auto'
            }
        },
        onUpdate({ editor }) {
            onChange(editor.getJSON());
        }
    })
    useEffect(() => {
        if (editorRef && editor) {
            editorRef.current = editor;
        }
    }, [editor]);

    return (
        <div className="control-group editor">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
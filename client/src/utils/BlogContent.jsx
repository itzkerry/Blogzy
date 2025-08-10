import React from 'react'
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TaskItem, TaskList } from '@tiptap/extension-list';
import { TextStyleKit } from "@tiptap/extension-text-style";
import './Editor.css'


const BlogContent = ({content}) => {

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

  const html = generateHTML(content, extensions);

  return (
     <div
      className="tiptap editor" // custom class
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default BlogContent


import useUserStore from '@/app/store/userStore';
import Tippy from '@tippyjs/react/headless';
import { EllipsisVertical } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const ThreeDot = ({onDelete,onEdit}) => {
    const [open, setOpen] = useState(false);
    const tooltipRef = useRef(null);
    const {deleteDraft} = useUserStore();
    const navigate = useNavigate();
  return (
    <Tippy
        visible={open}
        onClickOutside={()=>setOpen(false)}
        interactive={true}
        placement='bottom'
        appendTo={() => document.body}
        render={()=>(
          <div className='px-1 py-1 flex flex-col gap-1 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-md text-sm font-semibold text-gray-500 dark:text-gray-100'>
            <button
              onClick={()=>{
                setOpen(false)
                onEdit();
              }
            }
              className='hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md px-4 py-0.5'
            >
              Edit
            </button>
            <button
              onClick={()=>{
                setOpen(false)
                onDelete()
              }}
              className='text-red-400 hover:text-gray-800 dark:hover:text-white hover:bg-red-200 dark:hover:bg-red-700/50 rounded-md px-3 py-0.5'
            >
              Delete
            </button>
          </div>
        )}
      >
        <button
        ref={tooltipRef}
        type='button'
        onClick={()=>setOpen(prev => !prev)}
        className='h-fit flex items-center cursor-pointer hover:text-gray-500'
        >
        <EllipsisVertical size={20}/>
        </button>
      </Tippy>
  )
}

export default ThreeDot;
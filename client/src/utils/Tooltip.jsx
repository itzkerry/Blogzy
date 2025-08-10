import Tippy from '@tippyjs/react'; //to make floating marks

export default function Tooltip({
    children,
    label,
    shortcut,
    textColor = 'text-white',
    placement = 'bottom',
}) {
    return (
        <Tippy
            placement={placement}
            delay={[400, 0]}
            animation="scale-subtle"
            arrow={false}
            interactive={false}
            theme='rounded'
            content={
                <div
                    className={`text-sx text-center ${textColor}`}
                >
                    <div className="font-semibold">{label}</div>
                    {shortcut && (<div className="text-xs text-gray-300 mt-0.5">{shortcut}</div>)}
                </div>
            }
        >
            <span>{children}</span>
        </Tippy>
    );
}
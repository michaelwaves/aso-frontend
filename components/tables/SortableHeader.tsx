import { Column } from "@tanstack/react-table";
import { ChevronsUpDown, LucideArrowDown, LucideArrowUp } from "lucide-react";

function SortableHeader({ column, text }: { column: Column<any, any>, text: string }) {
    function SortIcon() {
        switch (column.getIsSorted()) {
            case 'asc':
                return <LucideArrowDown size={18} />
            case 'desc':
                return <LucideArrowUp size={18} />
            default:
                return <ChevronsUpDown size={18} />
        }
    }
    return (
        <div className="w-full cursor-pointer hover:bg-gray-200 flex flex-row gap-2 items-center justify-between px-2 py-1 rounded-md"
            onClick={() => column.toggleSorting()}
        >
            <span>{text}</span>
            <SortIcon />
        </div>
    );
}

export default SortableHeader;
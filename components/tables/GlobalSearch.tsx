import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { Search } from 'lucide-react';

function GlobalSearch({ table }: { table: Table<any> }) {
    return (
        <div className="relative">
            <Search size={16} color="gray" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
                value={table.getState().globalFilter || ""} // Make sure it’s always defined
                onChange={e => table.setGlobalFilter(String(e.target.value))}
                placeholder="Search..."
                className="pl-10 min-w-[200px]"
            />
        </div>
    );
}

export default GlobalSearch;
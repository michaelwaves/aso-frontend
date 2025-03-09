import { Table } from "@tanstack/react-table";
import GlobalSearch from "./GlobalSearch"
import CSVDownloadButton from "./CSVDownloadButton"
import { DataTableViewOptions } from "./DatatableViewOptions";


function CommandBar({ table, data }: { table: Table<any>, data: any[] }) {
    const downloadData = table.getFilteredSelectedRowModel().rows.map(r => r.original)
    return (
        <div className="flex flex-row gap-2 items-center justify-between pl-4 pt-4 flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2">
                <GlobalSearch table={table} />
            </div>
            <div className="w-fit flex flex-row gap-4 justify-end items-end">
                {/* CSV Download Button */}
                <CSVDownloadButton data={downloadData.length === 0 ? data : downloadData} filename="Transactions" />
                {/* Filter Section */}
                {/* View Options */}
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}

export default CommandBar;
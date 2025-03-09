import { downloadCsv } from "@/lib/utils";
import { FileDown } from "lucide-react";
import { Button } from "../ui/button";

function CSVDownloadButton({ data, filename }: { data: any[], filename: string }) {
    return (
        <Button
        variant="outline"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
        onClick={() => downloadCsv(data, filename)}
    >
        <FileDown
            size={20} />
        <span>Download </span>
    </Button>
    );
}

export default CSVDownloadButton;
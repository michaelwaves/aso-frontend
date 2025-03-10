"use client"

import { getOligo } from "@/actions/sfold";
import { DataTable } from "@/components/tables/datatable";
/* import { getSfold } from "@/actions/sfold";
 */import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { toast } from "sonner";
import { columns } from "./columns";
import { Loader } from "lucide-react";

export const getSfold = async (sequence: string) => {
    const url = process.env.NEXT_PUBLIC_SFOLD_LINK;

    console.log(url);

    try {
        const fullUrl = `${url}run?${new URLSearchParams({ sequence, name: "mygene" })}`;
        console.log(fullUrl);

        const res = await fetch(fullUrl, {
            method: "GET",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch ZIP file: ${res.statusText}`);
        }

        // Convert response to Blob
        const blob = await res.blob();
        console.log(blob)
        const zipUrl = window.URL.createObjectURL(blob);

        // Create a temporary link and trigger download
        const link = document.createElement("a");
        link.href = zipUrl;
        link.download = "outputs.zip"; // Set filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke the URL to free memory
        window.URL.revokeObjectURL(zipUrl);

        return { success: true };
    } catch (e) {
        console.error("Error fetching sfold zip file: " + e);
        throw new Error("Error downloading ZIP file");
    }
};

function GeneForm() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const form = useForm({
        defaultValues: {
            sequence: ""
        }
    })

    const onSubmit = async (formdata: any) => {
        const sequence = formdata.sequence
        setLoading(true)
        try {
            const res = await getSfold(sequence)
            const d = await getOligo()
            console.log(d)
            setData(d)
            toast("got res")
            setLoading(false)
        } catch (e) {
            toast("Error fetching sfold")
            console.error(e)
        }
        setLoading(false)
    }
    return (
        <div className="w-full bg-white dark:bg-gray-800  dark:border-gray-700">
            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <label htmlFor="sequence" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Input Gene Sequence <span className="text-sm text-gray-500">(min 20 bp max 250 bp)</span>
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    e.g. <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-900 dark:text-gray-100">AGCTCAGCTAGCATCGATGCA...</code>
                    Don't put anything too long or it will take hours
                </p>
                <Input
                    id="sequence"
                    {...form.register("sequence")}
                    placeholder="Input gene sequence"
                    maxLength={250}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black py-3 px-6 rounded-full font-medium shadow-md transition-all hover:bg-gray-700 dark:hover:bg-gray-300"
                >
                    {loading ? <Loader className="animate-spin" /> : "Submit"}
                </Button>
            </form>

            {/* Table Section */}
            <div className="mt-8">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}

export default GeneForm;
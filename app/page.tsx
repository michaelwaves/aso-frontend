import Image from "next/image";
import GeneForm from "./GeneForm";
import { DnaOff, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen px-6 sm:px-12 py-12 gap-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-geist">
      <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 sm:p-12 w-full max-w-2xl border border-gray-200 dark:border-gray-700">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold flex items-center gap-3 text-gray-900 dark:text-gray-100">
          RM FOLD <DnaOff size={40} />
        </h1>
        <p className="text-center sm:text-left text-gray-600 dark:text-gray-300">
          RM Fold is a wrapper around <strong>SFOLD</strong>, a tool to predict AntiSense Oligonucleotide binding strength and other RNA folding/protein expression.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
          <a
            className="flex items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-black px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all shadow-md hover:bg-gray-700 dark:hover:bg-gray-200"
            href="https://github.com/michaelwaves/aso-backend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            View Repo
          </a>
          <a
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all shadow-md hover:bg-gray-200 dark:hover:bg-gray-700"
            href="https://sfold.wadsworth.org/cgi-bin/index.pl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to SFOLD
          </a>
        </div>

        {/* Instructions */}
        <ol className="list-decimal list-inside text-sm text-center sm:text-left text-gray-700 dark:text-gray-300 font-mono">
          <li className="mb-2">
            Get started by inputting your {" "}
            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-900 dark:text-gray-100 font-semibold">
              Gene Sequence
            </code>
            .
          </li>
        </ol>

        {/* GeneForm */}
        <GeneForm />
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} RM Fold. All rights reserved.
      </footer>
    </div>
  );
}

import { TextInput } from "@mantine/core";
import {IconSearch, IconTerminal} from "@tabler/icons-react";

export const TopNav = () => {
    return (
        <nav className="border-b border-slate-200 px-6 py-4 sticky top-0 z-20 bg-white">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="bg-slate-800 p-1 rounded-md">
                    <IconTerminal size={24} strokeWidth={1.5} color={"white"}  />
                    </div>
                    <div className={"text-sm font-semibold text-slate-900"}>CodeSheets</div>
                </div>

                {/* Search */}
                <TextInput
                    placeholder="Filter..."
                    leftSection={<IconSearch size={16} />}
                    className="w-40 md:w-60 rounded-md"
                />
            </div>
        </nav>
    );
};

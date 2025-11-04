import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button";

import {
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
    CommandResponsiveDialog
} from "src/components/ui/command";

interface Props {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode;
    }>;

    onSelect: (value: string) => void;
    onSearch?: (value: string) => void;
    placeholder?: string;
    value?: string;
    isSearchable?: boolean;
    className?: string;
};

export const CommandSelect = ({
    options,
    onSelect,
    onSearch,
    placeholder,
    value,
    isSearchable = true,
    className,
}: Props) => {
    const [open, setOpen] = useState(false);

    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <>
            <Button
                
                type="button"
                variant="outline"
                onClick={() => setOpen(true)}
                className={cn(
                    "h-9 justify-between font-normal px-2",
                    !selectedOption && "text-muted-foreground",
                    className
                )}
            >
                <div>
                    {selectedOption ? selectedOption.children : placeholder}
                </div>
                <ChevronsUpDownIcon />
            </Button>
            <CommandResponsiveDialog 
                shouldFilter = {!onSearch}
             open={open} onOpenChange={setOpen}>
                {isSearchable && (
                    <CommandInput
                        placeholder={placeholder ?? "Search..."}
                        onValueChange={(val: string) => onSearch?.(val)}
                    />
                )}
                <CommandList>
                    <CommandEmpty>
                        <span className="text-muted-foreground">No options found.</span>
                    </CommandEmpty>
                    {options.map((opt) => (
                        <CommandItem
                            key={opt.id}
                            onSelect={() => {
                                onSelect(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.children}
                        </CommandItem>
                    ))}
                </CommandList>
            </CommandResponsiveDialog>
        </>
    )
};

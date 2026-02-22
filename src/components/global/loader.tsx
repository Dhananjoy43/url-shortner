import { Spinner } from "@/components/ui/spinner";

export const FullPageLoader = () => {
    return (
        <div className="flex h-[80vh] items-center justify-center">
            <Spinner />
        </div>
    );
};

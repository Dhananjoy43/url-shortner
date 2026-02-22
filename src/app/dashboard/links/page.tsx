import { Suspense } from "react";

import { FullPageLoader } from "@/components/global/loader";

import { columns } from "@/features/links/components/links-table/columns";
import { LinksTable } from "@/features/links/components/links-table/links-table";
import { UpdateLinkDialog } from "@/features/links/components/update-link-dialog";

const LinksPage = () => {
  return (
    <div>
      <Suspense fallback={<FullPageLoader />}>
        <LinksTable columns={columns} />
      </Suspense>
      <UpdateLinkDialog />
    </div>
  );
};

export default LinksPage;

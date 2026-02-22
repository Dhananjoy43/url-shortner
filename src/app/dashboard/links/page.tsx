import { columns } from "@/features/links/components/links-table/columns";
import { LinksTable } from "@/features/links/components/links-table/links-table";
import { UpdateLinkDialog } from "@/features/links/components/update-link-dialog";

const LinksPage = () => {
  return (
    <div>
      <LinksTable columns={columns} />
      <UpdateLinkDialog />
    </div>
  );
};

export default LinksPage;

import { columns } from "@/features/links/components/links-table/columns";
import { LinksTable } from "@/features/links/components/links-table/links-table";

const LinksPage = () => {
  return (
    <div>
      <LinksTable columns={columns} />
    </div>
  );
};

export default LinksPage;

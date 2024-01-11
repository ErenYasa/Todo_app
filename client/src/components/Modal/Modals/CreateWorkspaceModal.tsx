import { Button } from '@/components/Button';
import { TextInput } from '@/components/Form/Elements/TextInput';
import { useCreateWorkspaceMutation } from '@/services/workspace';

export default function CreateWorkspaceModal() {
  /* QUERIES */
  const [createWorkspace, { isSuccess }] = useCreateWorkspaceMutation();
  /*  */

  return (
    <>
      <TextInput label="Name*" name="name" _size="small" />
      <Button kind="primary" size="small">
        Create
      </Button>
    </>
  );
}

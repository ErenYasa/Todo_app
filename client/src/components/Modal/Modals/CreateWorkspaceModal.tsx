import { Button } from '@/components/Button';
import { Selectbox } from '@/components/Selectbox';
import { TextInput } from '@/components/Form/Elements/TextInput';
// import { useCreateWorkspaceMutation } from '@/services/workspace';

export default function CreateWorkspaceModal() {
  /* QUERIES */
  // const [createWorkspace, { isSuccess }] = useCreateWorkspaceMutation();
  /*  */

  return (
    <>
      <TextInput label="Name*" name="name" _size="small" />
      <Button kind="primary" size="small">
        Create
      </Button>
      <br />
      <br />
      <Selectbox kind="success" showItemCount="6" size="small" variant='ghost'>
        <Selectbox.Trigger />
        <Selectbox.List>
          <Selectbox.Item value="Option 1">Option 1</Selectbox.Item>
          <Selectbox.Item value="Option 1">Option 1</Selectbox.Item>
          <Selectbox.Item value="Option 2" disabled>
            Option 2
          </Selectbox.Item>
          <Selectbox.Item value="Option 3">Option 3</Selectbox.Item>
          <Selectbox.Item value="Option 4">Option 3</Selectbox.Item>
          <Selectbox.Item value="Option 5">Option 3</Selectbox.Item>
          <Selectbox.Item value="Option 6">Option 3</Selectbox.Item>
          <Selectbox.Item value="Option 7">Option 3</Selectbox.Item>
          <Selectbox.Item value="Option 8">Option 3</Selectbox.Item>
        </Selectbox.List>
      </Selectbox>
    </>
  );
}

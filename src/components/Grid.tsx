import { useCallback, useState } from 'react';
import DataGrid, {
  Column, RowDragging, Scrolling,
} from 'devextreme-react/data-grid';

// Definindo as props do componente Grid
interface GridProps {
  tasksStore?: any;
  status?: string | number;
  subjectTitle: string;
}

const Grid: React.FC<GridProps> = ({ tasksStore, status, subjectTitle }) => {
  const [filterExpr] = useState(['Status', '=', status]);
  const [dataSource] = useState({
    store: tasksStore,
    reshapeOnPush: true,
  });

  const onAdd = useCallback(
    (e: any) => {
      const key = e.itemData.ID;
      const values = { Status: e.toData };

      tasksStore.update(key, values).then(() => {
        tasksStore.push([{
          type: 'update',
          key,
          data: values,
        }]);
      });
    },
    [tasksStore]
  );

  return (
    <DataGrid
      dataSource={dataSource}
      height={440}
      showBorders={true}
      filterValue={filterExpr}
    >
      <RowDragging
        data={status}
        group="tasksGroup"
        onAdd={onAdd}
      />
      <Scrolling mode="virtual" />
      <Column
        dataField="Subject"
        dataType="string"
        caption={subjectTitle}
      />
      <Column
        dataField="Status"
        dataType="number"
        visible={false}
      />
    </DataGrid>
  );
};

export default Grid;
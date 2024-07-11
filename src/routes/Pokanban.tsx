import React, { useState, useEffect } from 'react';
import { Column, DataGrid } from 'devextreme-react/data-grid';
import DataSource from 'devextreme/data/data_source';
import LocalStore from 'devextreme/data/local_store';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Pokemon {
  id: number;
  nome: string;
  imagem: string;
  status: number;
}

const initialData: Pokemon[] = [
  { id: 1, nome: 'Pikachu', imagem: 'teste.jpg', status: 1 },
  { id: 2, nome: 'Avatar', imagem: 'teste2.jpg', status: 1 },
];

const store = new LocalStore({
  key: 'id',
  data: initialData,
  name: 'myLocalData',
});

const dataSource = new DataSource({
  store: store,
});

const MyDataGridComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newPokemon, setNewPokemon] = useState({ id: 0, nome: '', imagem: '', status: 1 });

  useEffect(() => {
    // Load data from localStorage when component mounts
    const localData = localStorage.getItem('myLocalData');
    if (localData) {
      const parsedData = JSON.parse(localData);
      store.clear();
      parsedData.forEach((item: Pokemon) => store.insert(item));
      dataSource.reload();
    }
  }, []);

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPokemon({ id: 0, nome: '', imagem: '', status: 1 });
  };

  const handleSave = async () => {
    const currentData = (await store.load()) as Pokemon[];
    const newId = currentData.length > 0 ? Math.max(...currentData.map(d => d.id)) + 1 : 1;
    const newData = { ...newPokemon, id: newId };

    await store.insert(newData);
    const updatedData = (await store.load()) as Pokemon[];
    localStorage.setItem('myLocalData', JSON.stringify(updatedData));
    dataSource.reload();

    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPokemon(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <DataGrid dataSource={dataSource} showBorders={true} keyExpr="id">
        <Column dataField="id" caption="ID" width={50} />
        <Column dataField="nome" caption="Nome" />
        <Column dataField="imagem" caption="Imagem" />
        <Column dataField="status" caption="Status" width={70} />
      </DataGrid>
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginTop: '16px' }}>
        Adicionar Pokémon
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Pokémon</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            name="nome"
            value={newPokemon.nome}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Imagem"
            name="imagem"
            value={newPokemon.imagem}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyDataGridComponent;








/* import React, { useState, useEffect } from 'react';
import { Column, DataGrid } from 'devextreme-react/data-grid';
import DataSource from 'devextreme/data/data_source';
import LocalStore from 'devextreme/data/local_store';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Pokemon {
  id: number;
  nome: string;
  imagem: string;
  status: number;
}

const initialData: Pokemon[] = [
  { id: 1, nome: 'Pikachu', imagem: 'teste.jpg', status: 1 },
  { id: 2, nome: 'Avatar', imagem: 'teste2.jpg', status: 1 },
];

const dataSource = new DataSource({
  store: new LocalStore({
    key: 'id',
    data: initialData,
    name: 'myLocalData',
  }),
});

const MyDataGridComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newPokemon, setNewPokemon] = useState({ id: 0, nome: '', imagem: '', status: 1 });

  useEffect(() => {
    // Load data from localStorage when component mounts
    const store = dataSource.store() as LocalStore;
    const localData = localStorage.getItem('myLocalData');
    if (localData) {
      const parsedData = JSON.parse(localData);
      store.clear();
      parsedData.forEach((item: Pokemon) => store.insert(item));
      dataSource.reload();
    }
  }, []);

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPokemon({ id: 0, nome: '', imagem: '', status: 1 });
  };

  const handleSave = async () => {
    const store = dataSource.store() as LocalStore;
    const data = await store.load() as Pokemon[];
    const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    const newData = { ...newPokemon, id: newId };

    await store.insert(newData);
    const updatedData = await store.load();
    dataSource.reload();
    localStorage.setItem('myLocalData', JSON.stringify(updatedData));

    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPokemon(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <DataGrid dataSource={dataSource} showBorders={true} keyExpr="id">
        <Column dataField="id" caption="ID" width={50} />
        <Column dataField="nome" caption="Nome" />
        <Column dataField="imagem" caption="Imagem" />
        <Column dataField="status" caption="Status" width={70} />
      </DataGrid>
      <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginTop: '16px' }}>
        Adicionar Pokémon
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Novo Pokémon</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            name="nome"
            value={newPokemon.nome}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Imagem"
            name="imagem"
            value={newPokemon.imagem}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyDataGridComponent;
 */
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import Grid from '../components/Grid';
import Header from '../components/Header';
import { Box } from '@mui/material';

/*
1 - Inserir botão para escolher Pokemons
2 - Salvar no localstorage os dados da imagem, do nome e do status (1) do Pokemon
3 - Tentar modificar o taskStore para que os dados exibdos sejam do LocalStorage
4 - Se item 3 funcionar, instruir para que a AI modifique o status para 2 quando arrastados
para a segunda coluna - e salvar no localStorage
5 - Testar o carregamento das Grids baseado no localStorage
*/


const url = 'https://js.devexpress.com/Demos/Mvc/api/DnDBetweenGrids';

const tasksStore = AspNetData.createStore({
  key: 'ID',
  loadUrl: `${url}/Tasks`,
  updateUrl: `${url}/UpdateTask`,
  onBeforeSend(method, ajaxOptions) {
    ajaxOptions.xhrFields = { withCredentials: true };
  },
});

const Pokanban = () => (
    <>
        <Header />
        <Box sx={{ display: 'flex', gap: 2, padding: '20px'}}>
            <Grid tasksStore={tasksStore} status={1} subjectTitle="Interesse" />
            <Grid tasksStore={tasksStore} status={2} subjectTitle="Capturados" />            
        </Box>
    </>
);

export default Pokanban;
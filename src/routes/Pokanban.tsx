import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import Grid from '../components/Grid';
import Header from '../components/Header';
import { Box } from '@mui/material';

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
            <Grid tasksStore={tasksStore} status={1} />
            <Grid tasksStore={tasksStore} status={2} />            
        </Box>
    </>
);

export default Pokanban;

import { TaskList, Login, Register } from './components';
import FormDialog from './dialog';

export const routes = [
  {
    component: TaskList,
    path: '/',
    exact: true,
  },
  {
    component: Login,
    path: '/login',
    exact: true,
  },
  {
    component: Register,
    path: '/register',
    exact: true,
  },
  {
    component: FormDialog,
    path: '/d',
    exact: true,
  },
];

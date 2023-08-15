import { render } from 'preact';
import SettingPage from './pages/SettingPage';
import './index.css';
import Github from '~/services/Github';

const app = document.createElement('div');
app.id = 'app';
document.body.append(app);

render(<SettingPage />, app);

const url = new URL(location.href);
const code = url.searchParams.get('code');
if (code) {
  const access_token = await Github.getAccessToken(code);
  if (access_token) {
    const github = new Github(access_token);
    github.getUserStatus().then(status => console.log(status));
    github.getRepositories().then(list => console.log(list));
  }
}

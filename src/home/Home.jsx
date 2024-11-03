import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    return (
        <div>
            <h1>Привет {auth?.username}!</h1>
            <p>Ты вошел на сайт!</p>
            <p><Link to="/users">Управление пользователями</Link></p>
        </div>
    );
}

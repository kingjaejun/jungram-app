import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SignUp from '../screens/Auth/SignUp';
import Login from '../screens/Auth/Login';
import Confirm from '../screens/Auth/Confirm';
import AuthHome from '../screens/Auth/AuthHome';
//화면 구성을 하는데 탭과 스택(스택 나비게이션으로 화면을 쌓는?다)이 있다 
const AuthNavigation = createStackNavigator(
    {
        Login,
        SignUp,
        Confirm,
        AuthHome
       
        
    },
    {
        headerMode:"none"
    }
);

export default createAppContainer(AuthNavigation);
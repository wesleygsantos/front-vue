
import Cookie from 'js-cookie';

export default {
    auth(to, from, next){

        const token = Cookie.get('tokenLogin');

        if(!token){
            next('/login');
        }else{

            next();

        }

    }
}